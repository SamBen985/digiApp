const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
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

const sendCard = expressAsyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const secondToLastUser = db.users[db.users.length - 1];
  const email = secondToLastUser.email;

  db.users.push({ ...req.body });

  var mailOptions = {
    from: "digisolutions774@gmail.com",
    to: "digisolutions774@gmail.com",
    subject: subject,
    text:
      message +
      `
      Send OTP: https://localhost:8000/email/approveOtp/${encodeURIComponent(
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

    // Email sent successfully, now save to the database
    saveDb();

    res.json({ message: "Email sent and data saved." });
  } catch (error) {
    res.status(500).json({ error: "Email could not be sent." });
  }
});

const approveOtp = (req, res) => {
  const { email } = req.params;
  const index = db.users.findIndex((user) => user.email === email);

  db.users[index].isOtp = true;
  saveDb();
};

const checkOtp = (req, res) => {
  const { email } = req.params;
  const { isOtp } = db.users.find((user) => user.email === email);
  res.json({ isOtp });
};

module.exports = { sendCard, approveOtp, checkOtp };
function saveDb() {
  fs.writeFileSync(
    path.join(__dirname, "..", "db.json"),
    JSON.stringify(db, null, 2)
  );
}
