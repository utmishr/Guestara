// routes/subcategory.js
const express = require("express");
const router = express.Router();
const Subcategory = require("../models/subcategory");
const validators = require("../middleware/validators");
const { fetchCategoryById } = require("../middleware/categoryMiddleware");
const {
  fetchSubcategoryById,
  fetchSubcategoriesByCategory,
} = require("../middleware/subcategoryMiddleware");

// Create a new subcategory
router.post(
  "/",
  validators.validateSubcategory,
  fetchCategoryById,
  async (req, res) => {
    try {
      const subcategory = new Subcategory({
        ...req.body,
        categoryId: req.category._id,
        taxApplicability:
          req.body.taxApplicability ?? req.category.taxApplicability,
        tax: req.body.tax ?? req.category.tax,
      });
      await subcategory.save();
      res.status(201).json(subcategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get all subcategories
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
    const subcategories = await Subcategory.paginate({}, options);
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a subcategory by ID
router.get("/:id", validators.validateId, fetchSubcategoryById, (req, res) => {
  res.status(200).json(req.subcategory);
});

// Get all subcategories under a category
router.get(
  "/category/:categoryId",
  validators.validateId,
  fetchCategoryById,
  fetchSubcategoriesByCategory,
  (req, res) => {
    res.status(200).json(req.subcategories);
  }
);

// Edit a subcategory
router.put(
  "/:id",
  validators.validateId,
  validators.validateSubcategory,
  fetchSubcategoryById,
  fetchCategoryById,
  async (req, res) => {
    try {
      const subcategory = await Subcategory.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          categoryId: req.category._id,
          taxApplicability:
            req.body.taxApplicability ?? req.category.taxApplicability,
          tax: req.body.tax ?? req.category.tax,
        },
        { new: true, runValidators: true }
      );
      if (!subcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
      res.status(200).json(subcategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
