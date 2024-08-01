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
  images:{
    type:[String]
  }
});

const Product  = models.product || model("product",ModelSchema)
export default Product