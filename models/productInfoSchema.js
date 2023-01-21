const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productInfoSchema = mongoose.Schema({
  _id: { type: Number },
  productId: { type: Number, ref: "products", required: true },
  colors: { type: String, required: true },
  images: [
    { type: String, default: "https://www.w3schools.com/howto/img_avatar.png" },
  ],
  medium: { type: Number, default: 0 },
  large: { type: Number, default: 0 },
  xlarge: { type: Number, default: 0 },
});
// mapping
productInfoSchema.plugin(AutoIncrement, { id: "productInfoCounter" });
module.exports = mongoose.model("productInfos", productInfoSchema);
