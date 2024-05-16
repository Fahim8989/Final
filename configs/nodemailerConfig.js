// Add this at the top of your file
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tradingpricer@gmail.com',
    pass: 'icou wghl twav mguf',
  },
});

module.exports = transporter;