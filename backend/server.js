const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dataRoutes = require("./routes/dataRoutes");

require("dotenv").config();
const app = express();

// Set up the port and MongoDB URI from environment variables for better flexibility
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/stationName?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3";

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '50mb' }));  // Increase body size limit to 50 MB
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For handling URL-encoded data

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes for handling API requests
app.use("/api/data", dataRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
