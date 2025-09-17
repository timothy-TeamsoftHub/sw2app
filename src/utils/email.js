
const nodemailer = require('nodemailer');

async function sendMail(to, subject, html){
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER || '', pass: process.env.SMTP_PASS || '' }
  });
  return transporter.sendMail({ from: process.env.SMTP_FROM || 'no-reply@sw2.example', to, subject, html });
}

module.exports = { sendMail };
