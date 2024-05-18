// app.js
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config");
const categoryRoutes = require("./routes/category");
const subcategoryRoutes = require("./routes/subcategory");
const itemRoutes = require("./routes/item");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
mongoose.connect(config.mongoURI).then(() => {
  console.log("Connected to MongoDB");
});

// Use routes
app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
app.use("/items", itemRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
