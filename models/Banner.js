import { model, models, Schema } from "mongoose";

const ModelSchema=new Schema({
    id:String
})
const Banner =models.banner || model("banner",ModelSchema);
export default Banner