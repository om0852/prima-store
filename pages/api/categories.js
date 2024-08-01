import { connectToDB } from "@/lib/connect";
import Categories from "@/models/Category";

export default async function handler(req, res) {
  const { method } = req;
  await connectToDB();
  if (method == "GET") {
    try {
      const data = await Categories.find().populate("parent");
      return res.json(data);
    } catch (error) {
      return res.json(error.message);
    }
  }
  if (method == "POST") {
    try {
      const { name, parentcategory } = req.body;
      await Categories.create({ name, parent: parentcategory });
      return res.json("Category Created");
    } catch (error) {
      return res.json(error.message);
    }
  }
  if (method == "PUT") {
    try {
      const { name, id ,parentcategory} = req.body;
      await Categories.updateOne({ _id: id }, { name,parent:parentcategory });
      return res.json("updated");
    } catch (error) {
      return res.json(error.message);
    }
  }
  if (method == "DELETE") {
    try {
      const { id } = req.query;
      await Categories.findByIdAndDelete({ _id: id });
      return res.json("Delete Category");
    } catch (error) {
      console.log(error)
      return res.json(error.message);
    }
  }
}
