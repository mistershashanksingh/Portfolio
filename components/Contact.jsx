'use client';

import { useState } from 'react';
import Reveal from './Reveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    }
  };

  return (
    <section className="contact" id="contact">
      <Reveal origin="top">
        <h2 className="heading"><span>Contact</span> Me</h2>
      </Reveal>
      <Reveal origin="bottom">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <div className="input-field">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="focus"></span>
            </div>
            <div className="input-field">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="focus"></span>
            </div>
          </div>
          <div className="input-box">
            <div className="input-field">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <span className="focus"></span>
            </div>
            <div className="input-field">
              <input
                type="text"
                name="subject"
                placeholder="Email Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <span className="focus"></span>
            </div>
          </div>
          <div className="textarea-field">
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <span className="focus"></span>
          </div>

          {/* Form Status Messages */}
          {status === 'loading' && (
            <div style={{ color: 'var(--text-color)', fontSize: '1.6rem', marginTop: '2rem', textAlign: 'center' }}>
              <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '10px' }}></i> Sending your message...
            </div>
          )}

          {status === 'success' && (
            <div style={{ color: '#57668f', fontSize: '1.6rem', marginTop: '2rem', textAlign: 'center', fontWeight: 'bold' }}>
              <i className="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i> Thank you! Your message has been sent successfully.
            </div>
          )}

          {status === 'error' && (
            <div style={{ color: '#e71d36', fontSize: '1.6rem', marginTop: '2rem', textAlign: 'center', fontWeight: 'bold' }}>
              <i className="fa-solid fa-circle-xmark" style={{ marginRight: '10px' }}></i> {errorMessage}
            </div>
          )}

          <div className="btn-box btns">
            <button type="submit" className="btn" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
