import mongoose, { model, models, Schema } from "mongoose";
const ModelSchema = new Schema({
  email: { type: String, required: true },
});
const Delivery = models.delivery || model("delivery", ModelSchema);
export default Delivery;
