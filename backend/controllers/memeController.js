const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Meme = require("../models/Meme");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(
      "Setting file destination to 'uploads/' for file:",
      file.originalname
    );
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    console.log("Setting file name to:", filename);
    cb(null, filename);
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
      console.log("File type is valid:", file.originalname);
      cb(null, true);
    } else {
      console.error("Invalid file type:", file.originalname);
      cb(new Error("Only image files are allowed!"));
    }
  },
});

router.get("/", async (req, res) => {
  try {
    console.log("Fetching all memes...");
    const memes = await Meme.find().sort({ createdAt: -1 });
    console.log("Fetched memes:", memes);
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
      console.log("No file uploaded in request.");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    console.log(
      "Uploading meme with title:",
      title,
      "and image URL:",
      imageUrl
    );

    const meme = new Meme({
      title,
      imageUrl,
      userId: req.user.userId,
      author: req.user.username,
    });

    await meme.save();
    console.log("Meme uploaded successfully:", meme);
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
    console.log("Fetching random meme...");
    const randomMeme = await Meme.aggregate([{ $sample: { size: 1 } }]);

    if (randomMeme.length === 0) {
      console.log("No memes found.");
      return res.status(404).json({ message: "No memes found" });
    }

    console.log("Fetched random meme:", randomMeme[0]);
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
    console.log("Fetching meme by ID:", req.params.id);
    const meme = await Meme.findById(req.params.id);
    if (!meme) {
      console.log("Meme not found for ID:", req.params.id);
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
