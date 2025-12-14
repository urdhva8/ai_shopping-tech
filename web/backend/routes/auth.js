const express = require("express");
const router = express.Router();
const transporter = require("../config/mailer");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const otp = generateOTP();

  try {
    await transporter.sendMail({
      from: "AI Shoppy <no-reply@aishoppy.com>",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    console.log("OTP sent:", otp);

    res.json({
      success: true,
      message: "OTP sent successfully",
      otp, // TEMPORARY (remove later)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

module.exports = router;
