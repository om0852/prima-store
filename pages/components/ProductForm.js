import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  _id,
  images: existingImage,
  category:existingCategory
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImage || []);
  const [selectCategory,setSelectCategory]=useState(existingCategory||"null")
  const [goToProduct, setGoToProducts] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [CatgeoryData, setCategoryData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategoryData(res.data))
      .catch((error) => console.log(error.message));
  }, []);
  const saveProduct = async (e) => {
    e.preventDefault();
    if (_id) {
      await axios.put(`/api/products`, {
        title,
        description,
        price,
        id: _id,
        images,
        selectCategory
      });
    } else {
      await axios.post(`/api/products`, { title, description, price, images,selectCategory });
    }
    setGoToProducts(true);
  };
  if (goToProduct) {
    return router.push("/products");
  }
  const uploadImage = async (e) => {
    const files = e.target.files;
    if (files?.length > 0) {
      setUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((prev) => {
        return [...prev, ...res.data];
      });
      console.log(res.data);
    }
    setUploading(false);
  };
  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const propertiesArr=[];
  if(CatgeoryData.length >0 && selectCategory){
   const selCatInfo =  CatgeoryData.find(({_id})=> _id===selectCategory);
   console.log(selCatInfo)
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

      <label>Product category</label>
      <select value={selectCategory} onChange={(e)=>setSelectCategory(e.target.value)}>
        <option value={"null"}>Ucategorized</option>
        {CatgeoryData.length>0 && CatgeoryData.map(category=>(
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
      {CatgeoryData.length>0 && selectCategory?.properties?.length &&(
        <div>

        </div>
      )}
      <label>Product Photos</label>

      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          className="flex flex-wrap"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="h-24 w-24">
                <img
                  className="rounded-lg"
                  style={{ height: "100%" }}
                  src={link}
                  alt=""
                />
              </div>
            ))}
        </ReactSortable>
        <input
          type="file"
          className="hidden"
          id="photo"
          onChange={uploadImage}
        />
        {uploading && (
          <div className="h-24 w-30 p-1  flex items-center">
            <Spinner />
          </div>
        )}
        <label
          htmlFor="photo"
          className="w-24 h-24  text-center flex gap-1 text-gray-500 rounded-lg bg-gray-300 flex-col items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>
          <div>Upload</div>
        </label>
        {/* {!images?.length && <div>No Photos in this product</div>}
        {images?.map((img) => (
          <img src={img} />
        ))} */}
      </div>
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
