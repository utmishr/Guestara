// routes/item.js
const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const Subcategory = require("../models/subcategory");
const Category = require("../models/category");
const validators = require("../middleware/validators");
const { fetchSubcategoryById } = require("../middleware/subcategoryMiddleware");
const { fetchCategoryById } = require("../middleware/categoryMiddleware");

// Create a new item
router.post("/", validators.validateItem, async (req, res) => {
  try {
    let subcategory, category;
    console.log(req.body);
    if (req.body.subcategoryId) {
      subcategory = await Subcategory.findById(req.body.subcategoryId);
      if (!subcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
      category = await Category.findById(subcategory.categoryId);
    } else {
      return res
        .status(400)
        .json({ error: "Either subcategoryId or categoryId is required" });
    }

    const item = new Item({
      ...req.body,
      subcategoryId: subcategory ? subcategory._id : null,
      categoryId: category._id,
      taxApplicability:
        req.body.taxApplicability ??
        subcategory?.taxApplicability ??
        category.taxApplicability,
      tax: req.body.tax ?? subcategory?.tax ?? category.tax,
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all items
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
    const items = await Item.paginate({}, options);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get an item by ID
router.get("/:id", validators.validateId, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all items under a subcategory
router.get(
  "/subcategory/:subcategoryId",
  validators.validateId,
  fetchSubcategoryById,
  async (req, res) => {
    try {
      const items = await Item.find({ subcategoryId: req.subcategory._id });
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Search items by name
router.get("/search/:name", async (req, res) => {
  try {
    const items = await Item.find({ name: new RegExp(req.params.name, "i") });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit an item
router.put(
  "/:id",
  validators.validateId,
  validators.validateItem,
  async (req, res) => {
    try {
      let subcategory, category;
      if (req.body.subcategoryId) {
        subcategory = await Subcategory.findById(req.body.subcategoryId);
        if (!subcategory) {
          return res.status(404).json({ error: "Subcategory not found" });
        }
        category = await Category.findById(subcategory.categoryId);
      } else if (req.body.categoryId) {
        category = await Category.findById(req.body.categoryId);
        if (!category) {
          return res.status(404).json({ error: "Category not found" });
        }
      } else {
        return res
          .status(400)
          .json({ error: "Either subcategoryId or categoryId is required" });
      }

      const item = await Item.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          subcategoryId: subcategory ? subcategory._id : null,
          categoryId: category._id,
          taxApplicability:
            req.body.taxApplicability ??
            subcategory?.taxApplicability ??
            category.taxApplicability,
          tax: req.body.tax ?? subcategory?.tax ?? category.tax,
        },
        { new: true, runValidators: true }
      );
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
