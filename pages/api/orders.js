import { connectToDB } from "@/lib/connect";
import Order from "@/models/Order";

export default async function handler(req,res){
await connectToDB();
res.json(await Order.find().sort({createdAt:-1}))
}