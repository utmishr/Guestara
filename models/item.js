// models/item.js
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  taxApplicability: Boolean,
  tax: Number,
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

ItemSchema.pre("save", function (next) {
  this.totalAmount = this.baseAmount - this.discount;
  next();
});

ItemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Item", ItemSchema);
