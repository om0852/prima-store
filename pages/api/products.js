import { connectToDB } from "@/lib/connect";
import Product from "@/models/Product";
import { Elsie_Swash_Caps } from "next/font/google";

export default async function handler(req, res) {
  const { method } = req;
  connectToDB();
  if (method === "POST") {
    try {
      const { title, description, price ,images,selectCategory} = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
        images,
        category:selectCategory
      });
      res.json(productDoc);
    } catch (error) {
      res.json(error.message);
    }
  }
  if (method === "GET") {
    try {
      if (req.query?.id) {
        const { id } = req.query;
        res.json(await Product.findOne({ _id: id }));
      } else {
        res.json(await Product.find());
      }
    } catch (error) {
      res.json(error.message);
    }
  }
  if (method == "PUT") {
    try {
      const { title, description, price, id ,images,selectCategory} = req.body;
    //   console.log(req.body)
      await Product.updateOne({ _id: id }, { title, description, price,images,category:selectCategory });
      res.json("Product Updated");
    } catch (error) {
      res.json(error.message);
    }
  }
  if (method == "DELETE") {
    try {
    //   console.log(req.body)
    
    if (req.query?.id) {
        const { id } = req.query;
      await Product.deleteOne({ _id: id });
    }
      res.json("Product Delete");
    } catch (error) {
      res.json(error.message);
    }
  }
}
