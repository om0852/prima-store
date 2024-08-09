import mongoose, { model, models, Schema } from "mongoose";
const ModelSchema = new Schema({
  email: { type: String, required: true },
});
const Shipper = models.shipper || model("shipper", ModelSchema);
export default Shipper;
