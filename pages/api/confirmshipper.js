import Order from "@/models/Order";
import nodemailer from "nodemailer";

const EmailSender = async (email, message, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "smartcoder0852@gmail.com",
        pass: "iuyk wfjm wswv ejyq",
      },
    });

    // Function to generate OTP

    const mail = await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: body,
      html: message,
    });
    return true;
    // Set expiration time to 5 minutes from now
  } catch (error) {
    return false;
  }
};
export default async function handler(req, res) {
  try {
    const { data, id } = req.body;
    let orderData = await Order.findOne({ _id: id });
    orderData.line_items.map((obj) => obj.OrderState.push(data));
    // console.log(orderData.line_items);
    if (orderData.orderState.length ==1) {
      orderData.orderState.push({
        state: data.state ? "Confirm" : "Rejected",
        date: new Date(),
      });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: id },
      { line_items: orderData.line_items, orderState: orderData.orderState },
      { new: true }
    );
    // console.log('Order updated:', updatedOrder);
    EmailSender(
      orderData.email,
      `<h1>Your Order is Shipped by seller go and check the status of your order <a href="${process.env.ADMIN_URL}/myorders">Check</a></h1>`,
      "Your order is shipped"
    );

    res.json("updated");
  } catch (error) {
    console.error("Error updating order:", error);
    res.json(error.message);
  } finally {
  }
}
