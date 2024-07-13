const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Your SMTP host
    port: 587, // Your SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'itsc.pankaj@gmail.com', // Your email address
      pass: 'dwueldixfmohcbqg' // Your password
    }
});

module.exports = transporter;