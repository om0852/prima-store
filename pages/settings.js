import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import Loader from "./components/Loader";
import toast from "react-hot-toast";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [bannerId,setBannerId]=useState("")
  const [type, setType] = useState("Admin");
  const [emailData, setEmailData] = useState([]);
  const [editAdminState, setAdminState] = useState(null);
  const [loader, setLoader] = useState(false);

  const getUsers = async () => {
    setLoader(true);
    await axios
      .get("/api/adduser")
      .then((res) => setEmailData(res.data))
      .catch((err) => console.log(err));
    setLoader(false);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const deleteAdmin = (id) => {
    setLoader(true);
    axios.delete("/api/adduser?id=" + id).then((res) => getUsers());
    toast.success("user delete successfully");
  };
  const updateAdmin = (data) => {
    setAdminState(data);
    setEmail(data.email);
    setType(data.type);
    toast.success("user update successfully");
  };
  const addAdmin = () => {
    setLoader(true);
    if (editAdminState == null) {
      axios.post("/api/adduser", { email, type }).then((res) => getUsers());
    } else {
      axios
        .put("/api/adduser?id=" + editAdminState._id, { email, type })
        .then((res) => getUsers());
    }
    getUsers();
    setAdminState(null);
    toast.success("user add successfully");
  };
  const changeBanner=()=>{
    axios.post("/api/banner",{id:bannerId});
    toast.success("banner added");
  }
  return (
    <Layout>
      {loader && <Loader />} 
      <h1>Change Banner</h1>
      <input
        type="text"
        value={bannerId}
        onChange={(e) => setBannerId(e.target.value)}
        placeholder="Enter Banner Id"
      />
           <button
        onClick={() => changeBanner()}
        type="button"
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        Change
      </button>
      <h1>Admins</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <select onChange={(e) => setType(e.target.value)} value={type}>
        <option value={"Admin"}>Admin</option>
        <option value={"Shipper"}>Shipper</option>
        <option value={"Delivery"}>Delivery</option>
      </select>
      <button
        onClick={() => addAdmin()}
        type="button"
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        {editAdminState == null ? "Add" : "Update"}{" "}
      </button>
      <table className="basic">
        <thead>
          <tr>
            <th>Email</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {emailData &&
            emailData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.email}</td>
                  <td>{data.type}</td>
                  <td className="flex flex-row items-center justify-around px-4">
                    <button
                      onClick={() => updateAdmin(data)}
                      type="button"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAdmin(data._id)}
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Settings;
