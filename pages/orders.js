import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/orders")
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const confirmYes = (index) => {
    axios.post("/api/confirmorder", {
      data: { state: true, date: new Date() },
      id: orderData[index]._id,
    });
  };
  const confirmNo = (index) => {
    axios.post("/api/confirmorder", {
      data: { state: false, date: new Date() },
      id: orderData[index]._id,
    });
  };
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic mt-4">
        <thead>
          <tr className="shadow-md p-1">
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
          {orderData.length > 0 &&
            orderData.map((order, index1) => (
              <tr key={index1}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "Yes" : "No"}
                </td>
                <td>
                  {order.name}
                  <br />
                  {order.email}
                  <br></br>
                  {order.street_address}
                  <br></br>
                  {order.city}
                  {order.code}
                  <br></br>
                  {order.state}
                  {order.country}
                </td>

                <td>
                  {order.line_items.map((l, index) => (
                    <span key={index}>
                      {l.title}x{l.quantity}
                      <br />
                    </span>
                  ))}
                </td>
                <td className="px-4">
                  {order?.line_items?.[0]?.OrderState?.length == 0 ? (
                    <div className="flex flex-row justify-between px-4">
                      <button
                        onClick={() => confirmYes(index1)}
                        type="button"
                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => confirmNo(index1)}
                        type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <h1>
                      {order?.line_items?.[0].OrderState?.[0].state == true
                        ? "Order Confirm"
                        : "Order Cancel"}
                    </h1>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Orders;
