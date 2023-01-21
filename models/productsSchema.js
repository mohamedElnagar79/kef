const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = mongoose.Schema({
  _id: { type: Number },
  name: {
    type: String,
    required: true,
    maxlength: 40,
    unique: true,
    trim: true,
  },
  productInfoId: [{ type: Number, ref: "productInfos", default: [] }],
  category: {
    type: String,
    default: "Other",
    enum: [
      "Hoodies",
      "T-shirts",
      "Pants",
      "Chemise",
      "Tote bags",
      "Jackets",
      "Other",
    ],
  },
  gender: {
    type: String,
    enum: ["women", "unisex"],
    default: "unisex",
  },
  newCollection: { type: Boolean, default: false },
  sale: { type: Boolean, default: false },
  salePrice: { type: Number, default: 0 },
  price: { type: Number, required: true },
});
// mapping
productSchema.plugin(AutoIncrement, { id: "productCounter" });
module.exports = mongoose.model("products", productSchema);
