import { model, models, Schema } from "mongoose";
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
});

const Product  = models.product || model("product",ModelSchema)
export default Product