const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const config = require(__base + 'system/config');

// No surprises here, email verification.
const transport = nodemailer.createTransport(smtpTransport({
  service: config.details.mail.host,
  auth: {
    user: config.details.mail.user,
    pass: config.details.mail.pass
  }
}));

const sendEMail = (address, subject, message) => {
  let mail = {
    from: config.details.mail.user,
    to: address,
    subject: subject,
    text: message
  }
  transport.sendMail(mail, (err, response) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`Email Sent to ${address}.`);
    }
    transport.close();
  });
}

module.exports = sendEMail;