import { connectToDB } from "@/lib/connect";
import Order from "@/models/Order";
//aseller
export default async function handler(req, res) {
  const { search = "", select } = req.query;
  await connectToDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  let filteredOrders = orders.filter((order) =>
    order._id.toString().includes(search)
  );
  filteredOrders = orders.filter((order) => {
    if (order.orderState.length > 1) {
      return order;
    }
  });
  if (select == "All") {
    res.json(filteredOrders);
  } else {
    let newFilterData
    if (select == "Confirm") {
       newFilterData = filteredOrders.filter((order) => {
        if (order?.orderState?.[2]?.state == "Confirm") {
          return order;
        }
      });
    }
    else{
      newFilterData = filteredOrders.filter((order) => {
        if (order?.orderState?.[2]?.state != "Confirm") {
          return order;
        }
      });
    }
    // Send the response
    res.json(newFilterData);
  }
}
