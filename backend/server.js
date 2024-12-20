require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./controllers/userController");
const memeRoutes = require("./controllers/memeController");

const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/memes", memeRoutes);

// Serve static files for production (after build)
if (process.env.NODE_ENV === "production") {
  console.log("Serving static files from production folder...");
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    console.log("Serving index.html for route:", req.originalUrl);
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
