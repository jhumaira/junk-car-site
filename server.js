// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // to use .env variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const {
    name = 'N/A',
    phone = 'N/A',
    year = 'N/A',
    make = 'N/A',
    model = 'N/A',
    title = 'N/A',
    vin = 'N/A',
    lien = 'N/A',
    offer = 'Unknown'
  } = req.body;

  console.log('Form submission received:', req.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // App password
    }
  });

  const mailOptions = {
    from: `"Junk Car Offer" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: 'New Junk Car Submission',
    text: `
You have a new lead:

Name: ${name}
Phone: ${phone}
Car Year: ${year}
Make: ${make}
Model: ${model}
Has Title: ${title}
VIN (if no title): ${vin}
Lien on Car: ${lien}
Estimated Offer: $${offer}
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('❌ Email failed:', err);
      res.status(500).send('Server error: Email could not be sent.');
    } else {
      console.log('✅ Email sent:', info.response);
      res.status(200).send('Form submitted successfully!');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
