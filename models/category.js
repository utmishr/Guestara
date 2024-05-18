// models/category.js
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  taxApplicability: Boolean,
  tax: Number,
  taxType: String,
});

CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Category", CategorySchema);
