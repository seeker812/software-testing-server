const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection

const DB_URI =
  "mongodb+srv://sumit812singh:Dell%40123@cluster1.oee8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

async function connect() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

connect();
// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create User Model
const User = mongoose.model("User", userSchema);

// API: /register
app.post("/register", async (req, res) => {
  const { user: username, pwd: password } = req.body;

  // Basic Validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username Taken" }); // Conflict
    }

    // Save new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Registration Failed" }); // Internal Server Error
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
