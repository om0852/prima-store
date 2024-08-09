import { connectToDB } from "@/lib/connect";
import Admin from "@/models/Admin"

export default async function handler(req,res){
    const {email}=req.query
    await connectToDB();
    res.json(await Admin.findOne({email}));
}