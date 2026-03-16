const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Contact Form Route ──
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,   // your Gmail
        pass: process.env.EMAIL_PASS,   // Gmail App Password
      },
    });

    // Mail to Deepa
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: 'deepapriyaravichandran24@gmail.com',
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#0d0c12;color:#d4cfc4;border:1px solid rgba(201,169,110,0.2);border-radius:8px;">
          <h2 style="font-family:Georgia,serif;color:#c9a96e;margin-bottom:4px;">New Portfolio Message</h2>
          <p style="font-size:13px;color:#7a7570;margin-bottom:28px;">Someone reached out through your portfolio</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#7a7570;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:80px;">Name</td><td style="padding:10px 0;color:#f0ebe0;font-size:15px;">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#7a7570;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:10px 0;color:#c9a96e;font-size:15px;"><a href="mailto:${email}" style="color:#c9a96e;">${email}</a></td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:rgba(201,169,110,0.05);border:1px solid rgba(201,169,110,0.15);border-radius:4px;">
            <p style="color:#7a7570;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Message</p>
            <p style="color:#d4cfc4;font-size:15px;line-height:1.7;white-space:pre-line;">${message}</p>
          </div>
          <p style="margin-top:28px;color:#7a7570;font-size:12px;">Reply directly to <a href="mailto:${email}" style="color:#c9a96e;">${email}</a></p>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Deepa Priya" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Hey ${name}, got your message ✦`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#0d0c12;color:#d4cfc4;border:1px solid rgba(201,169,110,0.2);border-radius:8px;">
          <h2 style="font-family:Georgia,serif;color:#c9a96e;font-style:italic;margin-bottom:16px;">Hey ${name} ✦</h2>
          <p style="font-size:15px;color:#d4cfc4;line-height:1.8;margin-bottom:16px;">Thanks for reaching out! I've received your message and will get back to you as soon as I can.</p>
          <p style="font-size:15px;color:#7a7570;line-height:1.8;margin-bottom:28px;">In the meantime, feel free to check out my work or connect with me on LinkedIn.</p>
          <p style="font-size:14px;color:#c9a96e;font-family:Georgia,serif;font-style:italic;">— Deepa Priya</p>
          <p style="margin-top:28px;font-size:12px;color:#7a7570;">UI/UX · AR/VR · AI & ML · Chennai</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Mail error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✦ Portfolio server running on http://localhost:${PORT}`);
});
