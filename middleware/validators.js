// middleware/validators.js
const { body, param, validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");
const mongoose = require("mongoose");

const validators = {
  validateCategory: [
    body("name")
      .notEmpty()
      .withMessage("Category name is required")
      .isString()
      .withMessage("Category name must be a string")
      .trim()
      .customSanitizer((value) => sanitizeHtml(value)),
    body("image")
      .optional()
      .isURL()
      .withMessage("Image must be a valid URL")
      .customSanitizer((value) => sanitizeHtml(value)),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .trim()
      .customSanitizer((value) => sanitizeHtml(value)),
    body("taxApplicability")
      .optional()
      .isBoolean()
      .withMessage("Tax applicability must be a boolean"),
    body("tax").optional().isNumeric().withMessage("Tax must be a number"),
    body("taxType")
      .optional()
      .isString()
      .withMessage("Tax type must be a string")
      .trim()
      .customSanitizer((value) => sanitizeHtml(value)),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  validateSubcategory: [
    body("name")
      .notEmpty()
      .withMessage("Subcategory name is required")
      .isString()
      .withMessage("Subcategory name must be a string")
      .trim()
      .customSanitizer((value) => sanitizeHtml(value)),
    body("image")
      .optional()
      .isURL()
      .withMessage("Image must be a valid URL")
      .customSanitizer((value) => sanitizeHtml(value)),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .trim()
      .customSanitizer((value) => sanitizeHtml(value)),
    body("taxApplicability")
      .optional()
      .isBoolean()
      .withMessage("Tax applicability must be a boolean"),
    body("tax").optional().isNumeric().withMessage("Tax must be a number"),
    body("categoryId")
      .notEmpty()
      .withMessage("Category ID is required")
      .isMongoId()
      .withMessage("Invalid category ID"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  validateItem: [
    body("name")
      .notEmpty()
      .withMessage("Item name is required")
      .isString()
      .withMessage("Item name must be a string")
      .trim()
      .customSanitizer((value) => sanitizeHtml(value)),
    body("image")
      .optional()
      .isURL()
      .withMessage("Image must be a valid URL")
      .customSanitizer((value) => sanitizeHtml(value)),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .trim()
      .customSanitizer((value) => sanitizeHtml(value)),
    body("taxApplicability")
      .optional()
      .isBoolean()
      .withMessage("Tax applicability must be a boolean"),
    body("tax").optional().isNumeric().withMessage("Tax must be a number"),
    body("baseAmount")
      .notEmpty()
      .withMessage("Base amount is required")
      .isNumeric()
      .withMessage("Base amount must be a number"),
    body("discount")
      .optional()
      .isNumeric()
      .withMessage("Discount must be a number"),
    body("subcategoryId")
      .optional()
      .isMongoId()
      .withMessage("Invalid subcategory ID"),
    body("categoryId")
      .optional()
      .isMongoId()
      .withMessage("Invalid category ID"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  validateId: [
    param("id")
      .optional() // Make the ID parameter optional
      .customSanitizer((value) => {
        // Convert the ID to a MongoDB ObjectId
        return new mongoose.Types.ObjectId(value);
      })
      .custom((value) => {
        // Check if the parameter is a valid ObjectId
        if (value && !mongoose.Types.ObjectId.isValid(value)) {
          return Promise.reject("Invalid ID");
        }
        return Promise.resolve();
      }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

module.exports = validators;
