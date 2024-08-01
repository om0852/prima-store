import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import Link from "next/link";

const categories = () => {
  const [name, setName] = useState("");
  const [editState, setEditState] = useState(null);
  const [categories, setCategories] = useState([]);
  const [parentcategory, setParentCategory] = useState("");
  const saveCategory = async (e) => {
    e.preventDefault();
    if(editState){
      await axios.put("/api/categories", { name, parentcategory,id:editState._id });
setEditState(null)
    }
    await axios.post("/api/categories", { name, parentcategory });
    setName("");
    getCategory();
  };
  const handleDelete = async(id)=>{

const result  = confirm("Are you sure want to delete it");
if(result){
  await axios.delete("/api/categories?id="+id);
  getCategory();
}

  }
  const getCategory = async () => {
    const data = await axios.get("/api/categories");
    setCategories(data.data);
  };
  const editCategory = (data) => {
    setEditState(data);
    setName(data.name);
    setParentCategory(data.parent?._id || "");
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <Layout>
      <h1>Categories</h1>
      <label>{editState ? `Edit Category ${editState.name} ` : "New Catgeory Name"}:</label>
      <form onSubmit={saveCategory} className="flex">
        <input
          type="text"
          className="mb-0 mr-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Category name"
        />
        <select
        value={parentcategory}
          onChange={(e) => setParentCategory(e.target.value)}
          className="mb-0 mr-1"
        >
          <option value={""}>No Parent Categories</option>
          {!!categories.length > 0 &&
            categories.map((data, index) => (
              <option value={data._id}>{data.name}</option>
            ))}
        </select>
        <button className="btn-primary py-1" type="submit">
          {editState?"Update":"Save"}
        </button>
      </form>
      <table className="basic my-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {!!categories.length > 0 &&
            categories.map((data, index) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data?.parent?.name}</td>
                <td>
                  <button
                    className="btn-primary mr-1"
                    onClick={() => {
                      editCategory(data);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={()=>handleDelete(data._id)} className="btn-primary mr-1">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default categories;
