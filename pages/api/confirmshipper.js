import Order from "@/models/Order";

export default async function handler(req, res) {
  try {
    const { data, id } = req.body;
    let orderData = await Order.findOne({ _id: id });
    orderData.line_items.map((obj) =>
        obj.OrderState.push(data)
    );
    // console.log(orderData.line_items);
    orderData.orderState.push({
      state: data.state ? "Confirm" : "Rejected",
      date: new Date()
  });    const updatedOrder = await Order.findByIdAndUpdate(
      {_id:id},
      { line_items: orderData.line_items,orderState:orderData.orderState},
      { new: true }
    );
    // console.log('Order updated:', updatedOrder);
    res.json("updated");
  } catch (error) {
    console.error("Error updating order:", error);
    res.json(error.message);

  } finally {
  }
}