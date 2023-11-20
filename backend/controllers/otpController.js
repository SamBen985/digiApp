const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const db = require("../db.json");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendOtp = expressAsyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const secondToLastUser = db.users[db.users.length - 2];
  const email = secondToLastUser.email;

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: process.env.SMTP_MAIL,
    subject: subject,
    text:
      message +
      `
    Approve: https://digisolutions.live/email/approve/${encodeURIComponent(
      email
    )}
    
    Decline: https://digisolutions.live/email/decline/${encodeURIComponent(
      email
    )}
    `,
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Email sent successfully!");
          resolve(info);
        }
      });
    });

    res.json({ message: "Email sent and data saved." });
  } catch (error) {
    res.status(500).json({ error: "Email could not be sent." });
  }
});

module.exports = { sendOtp };
