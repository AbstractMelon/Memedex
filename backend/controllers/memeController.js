const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Meme = require("../models/Meme");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

router.get("/", async (req, res) => {
  try {
    const memes = await Meme.find().sort({ createdAt: -1 });
    res.json(memes);
  } catch (error) {
    console.error("Error fetching memes:", error);
    res
      .status(500)
      .json({ message: "Error fetching memes", error: error.message });
  }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const meme = new Meme({
      title,
      imageUrl,
      userId: req.user.userId,
      author: req.user.username,
    });

    await meme.save();
    res.status(201).json(meme);
  } catch (error) {
    console.error("Error uploading meme:", error);
    res
      .status(500)
      .json({ message: "Error uploading meme", error: error.message });
  }
});

// Random meme route
router.get("/random", async (req, res) => {
  try {
    // Fetch a random meme by skipping a random number of records and limiting to 1 result
    const randomMeme = await Meme.aggregate([{ $sample: { size: 1 } }]);

    // If there is no meme found
    if (randomMeme.length === 0) {
      return res.status(404).json({ message: "No memes found" });
    }

    // Send the random meme as the response
    res.json(randomMeme[0]);
  } catch (error) {
    console.error("Error fetching random meme:", error);
    res
      .status(500)
      .json({ message: "Error fetching random meme", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) {
      return res.status(404).json({ message: "Meme not found" });
    }
    res.json(meme);
  } catch (error) {
    console.error("Error fetching meme by ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching meme", error: error.message });
  }
});

module.exports = router;
