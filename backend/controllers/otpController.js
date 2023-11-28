const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const db = require("../db.json");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: smtp.gmail.com,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "digisolutions774@gmail.com", // generated ethereal user
    pass: culzefagdxvlfsix, // generated ethereal password
  },
});

const sendOtp = expressAsyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const secondToLastUser = db.users[db.users.length - 2];
  const email = secondToLastUser.email;

  var mailOptions = {
    from: "digisolutions774@gmail.com",
    to: "digisolutions774@gmail.com",
    subject: subject,
    text:
      message +
      `
    Approve: https://localhost:8000/email/approve/${encodeURIComponent(email)}
    
    Decline: https://localhost:8000/email/decline/${encodeURIComponent(email)}
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
