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

    // 2. Local fallback storage: append message to a local file
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'messages.json');
    
    // Ensure the data directory exists
    await fs.mkdir(dataDir, { recursive: true });

    let existingMessages = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      existingMessages = JSON.parse(fileContent);
    } catch (err) {
      // File doesn't exist yet or is empty, start fresh
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString()
    };

    existingMessages.push(newMessage);
    await fs.writeFile(filePath, JSON.stringify(existingMessages, null, 2), 'utf-8');

    // 3. Try to send an email if SMTP credentials are configured in environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || emailUser;

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
    }

    return NextResponse.json({
      success: true,
      message: 'Message received and stored successfully!'
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while processing your message.' },
      { status: 500 }
    );
  }
}
