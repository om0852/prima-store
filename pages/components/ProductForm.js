import React from "react";
import { useState } from "react";
import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProductForm = ({ title:existingTitle, description:existingDescription, price:existingPrice ,_id}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProduct, setGoToProducts] = useState(false);
  const router = useRouter();
  const saveProduct = async (e) => {
    e.preventDefault();
    if(_id){
        await axios.put(`/api/products`,{ title, description, price ,id:_id})
    }
    else{
        await axios.post(`/api/products`, { title, description, price });
    }
    setGoToProducts(true);
  };
  if (goToProduct) {
    return router.push("/products");
  }

  return (
      <form onSubmit={saveProduct}>
        <label>Product Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name"
        />
        <label>Product Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Product Price(in USD)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
  );
};

export default ProductForm;
