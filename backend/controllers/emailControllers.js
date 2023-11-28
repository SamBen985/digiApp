const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const db = require("../db.json");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    state,
    country,
    street,
    city,
    zip,
    phone,
  } = req.body;

  db.users.push({
    ...req.body,
    isApproved: false,
    isDeclined: false,
    isOtp: false,
  });

  const subject = `New User: ${firstName}${lastName}`;
  const message = `
    First Name: ${firstName}
    Last Name: ${lastName}
    Email: ${email}
    State: ${state}
    Country: ${country}
    Street: ${street}
    City: ${city}
    Zip: ${zip}
    Phone: ${phone} 
  `;

  var mailOptions = {
    from: "digisolutions774@gmail.com",
    to: "digisolutions774@gmail.com",
    subject: subject,
    text: message,
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

const approveUser = (req, res) => {
  const { email } = req.params;
  const index = db.users.findIndex((user) => user.email === email);

  db.users[index].isApproved = true;
  saveDb();
};
const declineUser = (req, res) => {
  const { email } = req.params;
  const index = db.users.findIndex((user) => user.email === email);

  db.users[index].isDeclined = true;
  saveDb();
};

const checkIfApproved = (req, res) => {
  const { email } = req.params;
  const { isApproved } = db.users.find((user) => user.email === email);
  res.json({ isApproved });
};
const checkIfDeclined = (req, res) => {
  const { email } = req.params;
  const { isDeclined } = db.users.find((user) => user.email === email);
  res.json({ isDeclined });
};

module.exports = {
  sendEmail,
  checkIfApproved,
  approveUser,
  declineUser,
  checkIfDeclined,
};
function saveDb() {
  fs.writeFileSync(
    path.join(__dirname, "..", "db.json"),
    JSON.stringify(db, null, 2)
  );
}
