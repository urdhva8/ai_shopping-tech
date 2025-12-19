require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection (THIS IS REQUIRED)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
