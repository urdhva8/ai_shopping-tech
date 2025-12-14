const express = require("express");
const router = express.Router();
const transporter = require("../config/mailer");

// TEMP storage (later we’ll move to MongoDB)
const otpStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* ---------------- SEND OTP ---------------- */
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const otp = generateOTP();

  try {
    await transporter.sendMail({
      from: "AI Shoppy <no-reply@aishoppy.com>",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    // Save OTP temporarily
    otpStore.set(email, otp);

    console.log("OTP sent:", email, otp);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});

/* ---------------- VERIFY OTP ---------------- */
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
  }

  const storedOtp = otpStore.get(email);

  if (!storedOtp || storedOtp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  // OTP verified — remove it
  otpStore.delete(email);

  res.json({
    success: true,
    message: "OTP verified successfully",
  });
});

module.exports = router;
