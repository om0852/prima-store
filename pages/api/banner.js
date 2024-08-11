import { connectToDB } from "@/lib/connect";
import Banner from "@/models/Banner";

export default async function handler(req, res) {
  const { method } = req;
  await connectToDB();
  if (method == "POST") {
    const { id } = req.body;
    await Banner.updateOne({ _id: "66b88a3700d871f81d6882ca" }, { id });
    res.json("done");
  }
  if (method == "GET") {
    res.json(await Banner.findOne());
  }
}
