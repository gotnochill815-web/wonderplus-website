// pages/api/contact.js
import sendgrid from '@sendgrid/mail';
import { consumeToken } from '../../lib/rateLimiter';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Helper sanitizers
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
function nl2br(str = '') {
  return str.replace(/\n/g, '<br/>');
}

export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // Rate limiting by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const rate = consumeToken(ip, { capacity: 10, refillRate: 0.2, cost: 1 }); // tweakable
  if (!rate.ok) {
    return res.status(429).json({ error: 'Too many requests. Please wait and try again.' });
  }

  // Expect JSON body
  const body = req.body && typeof req.body === 'object' ? req.body : null;
  if (!body) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const { name, company = '', email, phone, message, _subject } = body;

  // Basic validation & length limits
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const nameS = String(name).trim().slice(0, 200);
  const companyS = String(company).trim().slice(0, 200);
  const emailS = String(email).trim().slice(0, 200);
  const phoneS = String(phone).trim().slice(0, 50);
  const messageS = String(message).trim().slice(0, 5000);
  const subjectS = _subject ? String(_subject).trim().slice(0, 200) : 'Wonder+ Pipes Website Enquiry';

  // Basic email pattern check (lightweight)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailS)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Prevent obvious spam (e.g., repeated URLs in message)
  const urlCount = (messageS.match(/https?:\/\//gi) || []).length;
  if (urlCount > 5) {
    return res.status(400).json({ error: 'Too many links in message' });
  }

  // Ensure SendGrid config present
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const toEmail = process.env.SENDGRID_TO_EMAIL;
  if (!process.env.SENDGRID_API_KEY || !fromEmail || !toEmail) {
    console.error('SendGrid env variables missing');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Build email
  const html = `
    <h2>${escapeHtml(subjectS)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(nameS)}</p>
    <p><strong>Company:</strong> ${escapeHtml(companyS)}</p>
    <p><strong>Email:</strong> ${escapeHtml(emailS)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phoneS)}</p>
    <h3>Message</h3>
    <p>${nl2br(escapeHtml(messageS))}</p>
    <hr/>
    <p style="font-size:12px;color:#666;">Sent from Wonder+ Pipes website (IP: ${escapeHtml(ip)})</p>
  `;

  const msg = {
    to: toEmail,
    from: { email: fromEmail, name: process.env.SENDGRID_FROM_NAME || 'Wonder+ Pipes Website' },
    subject: `[Site Enquiry] ${subjectS}`,
    text: `${subjectS}\n\nName: ${nameS}\nCompany: ${companyS}\nEmail: ${emailS}\nPhone: ${phoneS}\n\nMessage:\n${messageS}`,
    html
  };

  try {
    await sendgrid.send(msg);
    return res.status(200).json({ ok: true, tokensLeft: rate.tokensLeft });
  } catch (err) {
    console.error('SendGrid error:', err);
    // Don't expose internal error details to client
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
