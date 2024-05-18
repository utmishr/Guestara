// routes/category.js
const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const validators = require("../middleware/validators");
const { fetchCategoryById } = require("../middleware/categoryMiddleware");

// Create a new category
router.post("/", validators.validateCategory, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
    };
    const categories = await Category.paginate({}, options);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a category by ID
router.get("/:id", validators.validateId, fetchCategoryById, (req, res) => {
  res.status(200).json(req.category);
});

// Edit a category
router.put(
  "/:id",
  validators.validateId,
  validators.validateCategory,
  fetchCategoryById,
  async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
