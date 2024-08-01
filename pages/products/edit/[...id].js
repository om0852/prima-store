import Layout from "@/pages/components/Layout";
import ProductForm from "@/pages/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditProductPage = () => {
  const router = useRouter();
  const [productInfo,setProductInfo]=useState(null);
  const { id } = router.query;
  console.log(id);
  useEffect(() => {
    if (!id) {
      return ;
    }
    axios
      .get(`/api/products?id=${id}`)
      .then((res) => {
        setProductInfo(res.data)      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
<Layout>
<h1>Edit Product</h1>
{productInfo && ( <ProductForm {...productInfo}/>)
}</Layout>
  )
};

export default EditProductPage;
