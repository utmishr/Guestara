// middleware/subcategoryMiddleware.js
const Subcategory = require("../models/subcategory");
const Category = require("../models/category");

// const fetchSubcategoryById = async (req, res, next) => {
//   try {
//     const subcategory = await Subcategory.findById(req.params.id);
//     if (!subcategory) {
//       return res.status(404).json({ error: "Subcategory not found" });
//     }
//     req.subcategory = subcategory;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const fetchSubcategoryById = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId || req.body.subcategoryId;
    if (!subcategoryId) {
      return res.status(400).json({ error: "Subcategory ID is required" });
    }

    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    req.subcategory = subcategory;
    next();
  } catch (error) {
    next(error);
  }
};

const fetchSubcategoriesByCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    req.category = category;
    const subcategories = await Subcategory.find({
      categoryId: req.params.categoryId,
    });
    req.subcategories = subcategories;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { fetchSubcategoryById, fetchSubcategoriesByCategory };
