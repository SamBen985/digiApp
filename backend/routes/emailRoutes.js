const express = require("express");
const router = express.Router();

const {
  sendEmail,
  checkIfApproved,
  checkIfDeclined,
  approveUser,
  declineUser,
} = require("../controllers/emailControllers");
const {
  sendCard,
  approveOtp,
  checkOtp,
} = require("../controllers/cardController");

const { sendOtp } = require("../controllers/otpController");

router.post("/sendEmail", sendEmail);
router.post("/sendCard", sendCard);
router.post("/sendOTP", sendOtp);
router.get("/registration-approve/:email", checkIfApproved);
router.get("/registration-decline/:email", checkIfDeclined);
router.get("/otp-status/:email", checkOtp);
router.get("/approve/:email", approveUser);
router.get("/decline/:email", declineUser);
router.get("/approveOtp/:email", approveOtp);

module.exports = router;
