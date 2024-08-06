import { Schema, model, models } from "mongoose";


const ModelSchema = new Schema({
    line_items:{
        type:Object
    },
    name:String,
    city:String,
    email:String,
    code:String,
    street_address:String,
    country:String,
    state:String,
    paid:{type:Boolean,default:false},
    order_id:String

},{timestamps:true})

const Order = models.order || model("order",ModelSchema)
export default Order