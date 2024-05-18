const Category = require("../models/category");

const fetchCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId || req.body.categoryId;
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    req.category = category;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { fetchCategoryById };
