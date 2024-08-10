import { signIn, signOut, useSession } from "next-auth/react";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  const [dashboardData,setDashboardData]=useState(null)
  useEffect(()=>{
axios.get("/api/dashboard").then((res)=>setDashboardData(res.data))
  },[])
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello,<b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img className="w-6 g-6" src={session?.user?.image} />
          <span className="py-1 px-2">{session?.user?.name}</span>
        </div>
      </div>
      <div className="w-full py-4 px-4 grid lg:grid-cols-2 grid-cols-1 gap-10">
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Todays Total Order
          </h5>
          
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
{dashboardData?.today}
          </h5>
          
        </div>
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Yesterday Total Order
          </h5>
          
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
{dashboardData?.yesterday}
          </h5>
          
        </div>
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            This Month Total Order
          </h5>
          
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
{dashboardData?.month}
          </h5>
          
        </div>
      </div>
    </Layout>
  );
}
