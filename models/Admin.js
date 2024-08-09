import mongoose, { model, models, Schema } from "mongoose";
const ModelSchema = new Schema({
  email: { type: String, required: true },
  type: { type: String, required: true },
});
const Admin = models.admin || model("admin", ModelSchema);
export default Admin;
