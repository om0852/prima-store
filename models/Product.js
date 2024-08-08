import mongoose, { model, models, Schema } from "mongoose";
const ModelSchema = new Schema(
  {
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
    properties: { type: Object },
    delivery_charges:{type:Number}
  },
  { timestamps: true }
);

const Product = models.product || model("product", ModelSchema);
export default Product;
