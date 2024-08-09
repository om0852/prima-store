import { connectToDB } from "@/lib/connect";
import Admin from "@/models/Admin";

export default async function handler(req,res){
    console.log("run")
    await connectToDB();
    const data  = await Admin.find();
    let email=[];
    data.map((data)=>{
        email.push(data.email)
    })
    console.log(data)
    res.json(email)
}