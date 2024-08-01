import mongoose, { model, models, Schema } from "mongoose";
const ModelSchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId,ref:"categories" }
});
const Categories = models.categories || model("categories", ModelSchema);
export default Categories;
