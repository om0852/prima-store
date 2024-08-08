import { connectToDB } from "@/lib/connect";
import Order from "@/models/Order";

export default async function handler(req, res) {
  const { search = "", select } = req.query;
  await connectToDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  const filteredOrders = orders.filter((order) =>
    order._id.toString().includes(search)
  );
  if (select == "All") {
    res.json(filteredOrders);
  } else {
   
    const newFilterData = filteredOrders.filter((order)=>order.orderState==select)

    // Send the response
    res.json(newFilterData);
  }
}
