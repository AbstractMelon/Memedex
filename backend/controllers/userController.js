const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  try {
    console.log("Fetching user info for user ID:", req.user.userId);
    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log("User not found for ID:", req.user.userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user.username);
    res.json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("Registering user with username:", req.body.username);
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Username already exists:", username);
      return res.status(400).json({ message: "Username already registered" });
    }

    const user = new User({ username, password });
    await user.save();
    console.log("User registered successfully:", username);

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(201)
      .json({ token, user: { _id: user._id, username: user.username } });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("Login attempt for username:", req.body.username);
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found for login attempt:", username);
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      console.log("Invalid password for username:", username);
      return res.status(401).json({ message: "Authentication failed" });
    }

    console.log("Login successful for username:", username);

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, user: { _id: user._id, username: user.username } });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
