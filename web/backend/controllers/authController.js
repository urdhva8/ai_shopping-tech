const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");

// Generate OTP (6-digit)
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
async function sendOTP(email, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your OTP is ${otp}. Valid for 10 minutes.`,
  });
}

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    await sendOTP(email, otp);

    const user = await User.create({
      username,
      email,
      password: hashed,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });

    res.json({ message: "OTP sent to email", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.otp = null;
    await user.save();

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login success", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
