import mongoose, { model, models, Schema } from "mongoose";
const ModelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
  },
  category: { type: mongoose.Types.ObjectId, ref: "categories" },
  properties:{type:Object}
});

const Product = models.product || model("product", ModelSchema);
export default Product;
