const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const transporter = require("../config/mailer");
const User = require("../models/User");

/* =========================
   TEMP OTP STORE
   ========================= */
const otpStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
/* =========================
   SIGNUP
   ========================= */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});

/* =========================
   LOGIN STEP 1
   email + password → OTP
   ========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const otp = generateOTP();

    // Save OTP temporarily
    otpStore.set(email, otp);

    await transporter.sendMail({
      from: "AI Shoppy <no-reply@aishoppy.com>",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });
 
    console.log("OTP sent:", email, otp);

    res.json({
      success: true,
      message: "Password verified. OTP sent.",
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

/* =========================
   LOGIN STEP 2
   OTP → JWT
   ========================= */
router.post("/verify-otp", async (req, res) => {
  try {
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

    // OTP verified → remove it
    otpStore.delete(email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
});

module.exports = router;
