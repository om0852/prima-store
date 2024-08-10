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
    number:Number,
    orderState:{type:[Object],default:[]},
    paid:{type:Boolean,default:false},
    order_id:String,
    paymentType:String

},{timestamps:true})

const Order = models.order || model("order",ModelSchema)
export default Order