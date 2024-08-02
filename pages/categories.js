import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import Link from "next/link";

const Categories = () => {
  const [name, setName] = useState("");
  const [editState, setEditState] = useState(null);
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [parentcategory, setParentCategory] = useState("");
  const saveCategory = async (e) => {
    
    e.preventDefault();
    if (editState) {
      await axios.put("/api/categories", {
        name,
        parentcategory,
        id: editState._id,
        properties:properties
      });
      
    } else {
      await axios.post("/api/categories", { name, parentcategory, properties:properties });
    }
    setEditState(null);
    setCategories([]);
    setProperties([]);
    setName("");
    setParentCategory("null")
    getCategory();
  };
  const handleDelete = async (id) => {
    const result = confirm("Are you sure want to delete it");
    if (result) {
      await axios.delete("/api/categories?id=" + id);
      getCategory();
    }
  };
  const getCategory = async () => {
    const data = await axios.get("/api/categories");
    setCategories(data.data);
  };
  const editCategory = (data) => {
    setEditState(data);
    setName(data.name);
    setProperties(data.properties)
    setParentCategory(data.parent?._id || "null");
  };
  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };
  const handleSetProperties = (e, property, index) => {
    setProperties((prev) => {
      const clone = [...prev];
      clone[index].name = e;
      return clone;
    });
  };
  const handleSetValueProperties = (e, property, index) => {
    setProperties((prev) => {
      const clone = [...prev];
      clone[index].values = e.split(",");
      return clone;
    });
  };
  const removeProperty = (index) => {
    setProperties((prev) => {
      const newProp = [...prev];
      newProp.splice(index, 1);
      return newProp;
    });
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editState ? `Edit Category ${editState.name} ` : "New Catgeory Name"}:
      </label>
      <form onSubmit={saveCategory} className="">
        <div className="flex gap-1">
          <input
            type="text"
            className=" mr-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Category name"
          />
          <select
            value={parentcategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className=" mr-1"
          >
            <option value={""}>No Parent Categories</option>
            {!!categories.length > 0 &&
              categories.map((data, index) => (
                <option key={index} value={data._id}>
                  {data.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default  p-0 text-sm mb-2"
          >
            Add new Property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex h-10 gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  onChange={(e) =>
                    handleSetProperties(e.target.value, property, index)
                  }
                  placeholder="property name (Example : color)"
                />
                <input
                  type="text"
                  value={property.values}
                  onChange={(e) =>
                    handleSetValueProperties(e.target.value, property, index)
                  }
                  placeholder="Property Values (Seperated by comma)"
                />
                <button
                  className="btn-red"
                  type="button"
                  onClick={() => removeProperty(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <button className="btn-primary py-1" type="submit">
          {editState ? "Update" : "Save"}
        </button>
        {editState && (
          <button
            className="mx-1  btn-primary py-1 bg-red-500"
            style={{ background: "red" }}
            type="button"
            onClick={() => {
              setEditState(null);
              setName("");
              setParentCategory("null");
            }}
          >
            Cancel
          </button>
        )}
      </form>
      {!editState && (
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
                      className="btn-primary-gray mr-1"
                      onClick={() => {
                        editCategory(data);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn-red mr-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Categories;
