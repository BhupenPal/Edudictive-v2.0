const nodemailer = require("nodemailer")

module.exports = {
  SendMail: (ToEmail, MailSubject, News) => {
      let transporter = nodemailer.createTransport({
          host: 'smtpout.secureserver.net',
          port: 465,
          secure: true,
          auth: {
              user: 'contact@edudictive.in',
              pass: process.env.EMAILPASS
          },
          tls: {
              rejectUnauthorized: false
          }
      });

      transporter.sendMail({
          from: '"Edudictive" <contact@edudictive.in>',
          to: ToEmail,
          subject: MailSubject,
          html: 'Hello'
      }, (err, info) => {
          if (err) {
              News.push("Email can't be sent.")
              return
          }
      })
  }
}