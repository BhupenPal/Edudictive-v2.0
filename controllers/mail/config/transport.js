const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: "contact@edudictive.in",
    pass: process.env.CONTACTPASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
