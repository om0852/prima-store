import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DeleteProductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;

    axios
      .get("/api/products?id=" + id)
      .then((res) => setProductInfo(res.data))
      .catch((error) => console.log(error));
  });
  function getBack() {
    router.push("/products");
  }
  async function deleteProduct(){
  await axios.delete("/api/products?id="+id).then(res=>router.push("/products"));
  }
  return (
    <Layout>
      <h1 className="text-center"> Do You really want to delete "{productInfo?.title}"</h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">Yes</button>
        <button className="btn-default" onClick={getBack}>No</button>
      </div>
    </Layout>
  );
};

export default DeleteProductPage;
