import { connectToDB } from "@/lib/connect";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { Elsie_Swash_Caps } from "next/font/google";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;
  connectToDB();
  const admin = await isAdminRequest(req, res);
  console.log(admin);
  if (method === "POST") {
    try {
      const {
        title,
        description,
        price,
        images,
        selectCategory,
        properties,
        delivery_charges,
      } = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
        delivery_charges,
        images,
        category: selectCategory,
        properties,
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
      const {
        title,
        description,
        price,
        id,
        delivery_charges,
        images,
        selectCategory = null,
        properties,
      } = req.body;
      console.log(req.body);
      if (selectCategory == "null") {
        await Product.updateOne(
          { _id: id },
          {
            title,
            description,
            price,
            images,
            category: null,
            properties,
            delivery_charges,
          }
        );
      }
      await Product.updateOne(
        { _id: id },
        {
          title,
          description,
          price,
          images,
          category: selectCategory,
          properties,
          delivery_charges,
        }
      );
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
