import { connectToDB } from "@/lib/connect";
import Categories from "@/models/Category";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;
  await connectToDB();
  const admin = await isAdminRequest(req, res);

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
      const { name, parentcategory, properties } = req.body;
      console.log(req.body)
      if (parentcategory == "" || parentcategory == "null") {
        await Categories.create({ name, properties });
      } else {
        await Categories.create({
          name: name,
          parent: parentcategory,
          properties,
        });
      }
      return res.json("Category Created");
    } catch (error) {
      return res.json(error.message);
    }
  }
  if (method == "PUT") {
    try {
      const { name, id, parentcategory, properties } = req.body;
      if (parentcategory != "null") {
        await Categories.updateOne(
          { _id: id },
          { name, parent: parentcategory, properties }
        );
      } else {
        await Categories.updateOne({ _id: id }, { name, properties });
      }
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
      console.log(error);
      return res.json(error.message);
    }
  }
}
