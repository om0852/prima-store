import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";
import Loader from "./components/Loader";

const Delivery = () => {
  const [orderData, setOrderData] = useState([]);
  const [selectOption, setSelectOption] = useState("All");
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);

  const fetchOrder = () => {
    setLoader(true);
    axios
      .get("/api/deliveryorder?search=" + search + "&select=" + selectOption)
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((err) => console.log(err));
    setLoader(false);
  };
  useEffect(() => {
    fetchOrder();
  }, [search, selectOption]);
  const confirmYes = (index) => {
    axios
      .post("/api/confirmdelivery", {
        data: { state: true, date: new Date() },
        id: orderData[index]._id,
      })
      .then((res) => fetchOrder());
    // fetchOrder();
  };
  const confirmDelivered = (index) => {
    axios
      .post("/api/confirmdelivery", {
        data: { state: true, date: new Date() },
        id: orderData[index]._id,
      })
      .then((res) => fetchOrder());
    fetchOrder();
  };
  return (
    <div>
      {loader && <Loader />}
      <Header />
      <div className="flex justify-between flex-row px-4 py-4">
        <h1>Orders</h1>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          className="w-[50vh]"
          placeholder="Search"
        />
        <select
          value={selectOption}
          className="w-[30vh]"
          onChange={(e) => setSelectOption(e.target.value)}
        >
          <option value={"All"}>All</option>
          <option value={"Confirm"}>Confirm</option>
          <option value={"Pending"}>Pending</option>
        </select>
      </div>
      <table className="basic mt-4">
        <thead>
          <tr className="shadow-md p-1">
            <th>ID</th>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.length > 0 &&
            orderData.map((order, index1) => (
              <tr key={index1}>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order._id}
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
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
                  {order?.orderState.length > 1 &&
                  order?.orderState?.[2]?.state != "Confirm" &&
                  order?.orderState?.[2]?.state != "Rejected" ? (
                    <div className="flex flex-row justify-between px-4">
                      <button
                        onClick={() => confirmYes(index1)}
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Pick The Order
                      </button>
                    </div>
                  ) : (
                    <>
                      {order?.orderState?.length > 1 &&
                      order.orderState[2].state == "Confirm" ? (
                        <div className=" grid place-items-center">
                          <p>
                            Order Pick On{" "}
                            {new Date(
                              order.orderState[2].date
                            ).toLocaleDateString()}{" "}
                            {new Date(
                              order.orderState[1].date
                            ).toLocaleTimeString()}
                          </p>
                          {order?.orderState?.length > 2 &&
                          (order?.orderState[3]?.state == "Confirm" ||
                            order?.orderState[3]?.state == "Rejected") ? (
                            <p>
                              {order?.orderState[3]?.state == "Confirm"
                                ? "Order Delivered"
                                : "Order Cancel"}{" "}
                            </p>
                          ) : (
                            <button
                              onClick={() => confirmDelivered(index1)}
                              type="button"
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Delivered
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="w-full text-center">Order Rejected</p>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Delivery;
