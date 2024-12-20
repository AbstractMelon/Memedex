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
  // Serve static files from the dist folder
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // For any routes that are not API routes, send the index.html from the dist folder
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
