import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// We dynamically import nodemailer so the app doesn't crash on start if nodemailer is not installed/loaded yet.
let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  // Nodemailer might not be installed yet, we will handle it gracefully in the route.
}

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // 1. Basic Validation
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // 2. Best-effort local storage: append the message to a local file.
    //    This is non-fatal: on serverless/production hosts (Vercel, Netlify,
    //    Lambda) the app filesystem is read-only, so the write throws EROFS.
    //    We must NOT let that fail the request — email is the real delivery
    //    path, so any storage error is logged and swallowed.
    let stored = true;
    try {
      const dataDir = path.join(process.cwd(), 'data');
      const filePath = path.join(dataDir, 'messages.json');

      await fs.mkdir(dataDir, { recursive: true });

      let existingMessages = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        existingMessages = JSON.parse(fileContent);
      } catch (err) {
        // File doesn't exist yet or is empty, start fresh
      }

      existingMessages.push({
        id: Date.now().toString(),
        name,
        email,
        phone,
        subject,
        message,
        timestamp: new Date().toISOString()
      });

      await fs.writeFile(filePath, JSON.stringify(existingMessages, null, 2), 'utf-8');
    } catch (storageErr) {
      stored = false;
      console.warn('Local message storage skipped (read-only filesystem?):', storageErr.message);
    }

    // 3. Send an email if SMTP credentials are configured in environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || emailUser;
    let emailed = false;

    if (emailUser && emailPass) {
      if (!nodemailer) {
        // Try importing again in case it was installed after server start
        nodemailer = await import('nodemailer').then(m => m.default || m);
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail', // Standard Gmail SMTP. Can be customized via host/port env variables if desired.
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${emailUser}>`,
        replyTo: email,
        to: emailTo,
        subject: `[Portfolio Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
        html: `
          <h3>New Portfolio Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">${message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      emailed = true;
    }

    // If the message was neither emailed nor stored, it is lost — surface a real
    // error instead of falsely telling the visitor it was sent. This happens in
    // production when SMTP env vars are missing AND the filesystem is read-only.
    if (!emailed && !stored) {
      console.error('Contact message not delivered: no SMTP config and storage unavailable.');
      return NextResponse.json(
        { error: 'The message service is not configured. Please email me directly.' },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message received successfully!'
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while processing your message.' },
      { status: 500 }
    );
  }
}
