const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  try {
    // Find the user based on the ID in the decoded token
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "username already registered" });
    }

    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(201)
      .json({ token, user: { _id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, user: { _id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
