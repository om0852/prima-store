import React, { forwardRef } from "react";

const Invoice = forwardRef(({
  _id,
  createdAt,
  name,
  street_address,
  city,
  state,
  country,
  code,
  number,
  line_items,
  paid,
  paymentType
}, ref) => {
  let qty = 0;
  let total = 0;

  return (
    <div className="static top-0 left-0 px-6 py-2" ref={ref}>
      <h1 className="text-xl font-medium mt-20">Sold By: Prima Store</h1>
      <p>
        <span className="text-xl font-medium">Ship-from Address:</span> Prima
        Store near Sanjivani College, Kopargoan
      </p>
      <div className="mt-10 bg-gray-900 h-[3px] w-full"></div>
      <h1 className="text-xl font-medium">Order Id: {_id}</h1>
      <p>
        <span className="text-xl font-medium">Order Date:</span>{" "}
        {new Date(createdAt).toLocaleString()}{" "}
      </p>
      <p>
        <span className="text-xl font-medium">Invoice Date:</span>{" "}
        {new Date(createdAt).toLocaleString()}{" "}
      </p>
      <p>
        <span className="text-xl font-medium">Billing Address:</span>
        <p className="capitalize">{name}</p>
        <p className="capitalize">{street_address}</p>
        <p className="capitalize">{city}</p>
        <p className="capitalize">
          {state}-{code}
        </p>
        <p className="capitalize">{country}</p>
        <p className="capitalize">Phone: {number}</p>
      </p>
      <div className="mt-10 bg-gray-900 h-[3px] w-full"></div>
      <table className="w-full mt-10">
        <thead>
          <tr className="border-y-2 border-gray-600 text-left">
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {line_items &&
            line_items.map((data, index) => {
              qty += data.quantity;
              total += data.quantity * data.price_data.unit_amount; // Corrected calculation
              return (
                <tr key={index}>
                  <td className="">{data.title}</td>
                  <td className="">{data.quantity}</td>
                  <td className="">₹{data.price_data.unit_amount}</td>
                </tr>
              );
            })}
          <tr>
            <td colSpan="3">Total Quantity: {qty}</td>
          </tr>
          <tr>
            <td colSpan="3">Total Price: ₹{total}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 mb-4"><span className="text-xl font-medium mt-20">Payment Status:</span>{paid?"Completed":"Pending"}</div>
      <div><span className="text-xl font-medium mt-20">Payment Type:</span>{paymentType}</div>
    </div>
  );
});
// Add a display name to the component
Invoice.displayName = "Invoice";
export default Invoice;
