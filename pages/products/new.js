import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

const createProduct=async(e)=>{
  e.preventDefault()
  await axios.post(`/api/products`,{title,description,price})
}

  return (
    <Layout>
      <form onSubmit={createProduct}>

      <h1>New Product</h1>
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
      <button type="submit" className="btn-primary">Save</button>
        </form>
    </Layout>
  );
}
