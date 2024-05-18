// models/subcategory.js
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

SubcategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Subcategory", SubcategorySchema);
