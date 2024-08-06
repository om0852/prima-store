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

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic mt-4">
        <thead>
          <tr className="shadow-md p-1">
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orderData.length > 0 &&
            orderData.map((order) => (
              <tr>
                <td>{order.createdAt}</td>
                <td>
                  {order.name}<br/>
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

                <td>{
 order.line_items.map(l=>(
    <>
    {l.title}x{l.quantity}<br/>
    </>
 ))               
}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Orders;
