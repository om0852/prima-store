import { connectToDB } from "@/lib/connect";
import Admin from "@/models/Admin";

export default async function handler(req, res) {
  await connectToDB();
  const { method } = req;
  if (method == "GET") {
    try {
      res.json(await Admin.find());
    } catch (Err) {}
  }
  if (method == "POST") {
    const { email, type } = req.body;
    await Admin.create({ email, type });
    res.json("Added")
  }
  if (method == "DELETE") {
    const { id } = req.query;
    await Admin.deleteOne({ _id: id });
    res.json("deleted")

  }
  if (method == "PUT") {
    const { id } = req.query;
    const { email, type } = req.body;
    console.log(id,email,type)
    await Admin.updateOne({ _id: id }, { email, type });
    res.json("Updated")

  }
}
