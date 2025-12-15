// debug-start.js
require("dotenv").config();
const path = require("path");
console.log("=== DEBUG START ===");
console.log("cwd:", process.cwd());
console.log(".env values (masked):");
console.log("MONGO_URI:", (process.env.MONGO_URI || "").slice(0, 60) + (process.env.MONGO_URI && process.env.MONGO_URI.length>60 ? "..." : ""));
console.log("PORT:", process.env.PORT);
console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "<present>" : "<missing>");
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);

(async () => {
  try {
    // check files exist
    const fs = require("fs");
    const requiredFiles = [
      "server.js",
      "config/db.js",
      "config/mailer.js",
      "routes/auth.js",
      "controllers/authController.js",
    ];
    console.log("\nChecking required files:");
    requiredFiles.forEach(f => console.log(` - ${f}:`, fs.existsSync(path.join(process.cwd(), f)) ? "OK" : "MISSING"));

    // try to require the auth route to surface syntax errors
    try {
      console.log("\nRequiring routes/auth.js to check for immediate errors...");
      require("./routes/auth");
      console.log("routes/auth.js loaded OK");
    } catch (err) {
      console.error("Error while requiring ./routes/auth.js ->", err && err.stack ? err.stack : err);
    }

    // try DB connect
    console.log("\nAttempting to connect to MongoDB...");
    const mongoose = require("mongoose");
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("No MONGO_URI in env. Please check .env file.");
      return;
    }
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB connected successfully.");

    // keep process alive so you can see results
    console.log("\nDebug finished — process will stay alive. Press Ctrl+C to stop.");
    process.stdin.resume();

  } catch (err) {
    console.error("\nFatal debug error:", err && err.stack ? err.stack : err);
    process.exitCode = 1;
  }
})();
