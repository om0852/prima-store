import React, { useEffect, useRef, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import Invoice from "./components/Invoice";
import { useReactToPrint } from "react-to-print";
import Loader from "./components/Loader";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [selectOption, setSelectOption] = useState("All");
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  let printIndex;
  // Create an array of refs
  const invoiceRefs = useRef([]);

  const handlePrint = useReactToPrint({
    content: () => invoiceRefs.current[printIndex],
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
  });

  const fetchOrder = async () => {
    setLoader(true);
    axios
      .get("/api/orders?search=" + search + "&select=" + selectOption)
      .then((response) => {
        setOrderData(response.data);
        // Create refs for each order
        invoiceRefs.current = response.data.map(
          (_, i) => invoiceRefs.current[i] ?? React.createRef()
        );
      })
      .catch((err) => console.log(err));
    setLoader(false);
  };

  useEffect(() => {
    fetchOrder();
  }, [search, selectOption]);

  const confirmYes = (index) => {
    axios
      .post("/api/confirmorder", {
        data: { state: true, date: new Date() },
        id: orderData[index]._id,
      })
      .then((res) => {
        fetchOrder();
      });
  };

  const confirmNo = (index) => {
    axios.post("/api/confirmorder", {
      data: { state: false, date: new Date() },
      id: orderData[index]._id,
    });
    fetchOrder();
  };

  const handlePrintInvoice = (index) => {
    printIndex = index;
    handlePrint();
  };

  return (
    <Layout>
      {loader && <Loader />}
      <div className="flex justify-between flex-row px-4">
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
          <option value={"Rejected"}>Rejected</option>
          <option value={"Pending"}>Pending</option>
        </select>
      </div>
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
                  Payment Status:{order.paid ? "Paid" : "Unpaid"}
                  <br />
                  PaymentType:{order?.paymentType}
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
                  {order?.line_items?.[0]?.OrderState?.length === 0 ? (
                    <div className="flex flex-row justify-between px-4">
                      <button
                        onClick={() => confirmYes(index1)}
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => confirmNo(index1)}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <>
                      {order?.orderState?.[0]?.state == "Confirm" ? (
                        <div className=" grid place-items-center">
                          <p>Order Confirm</p>
                          <div className="fixed top-[-200vh] right-[-100vh]">
                            {" "}
                            <Invoice
                              {...order}
                              ref={(rel) => (invoiceRefs.current[index1] = rel)}
                            />
                          </div>

                          <button
                            type="button"
                            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            onClick={() => handlePrintInvoice(index1)}
                          >
                            Print Invoice
                          </button>
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
    </Layout>
  );
};

export default Orders;
