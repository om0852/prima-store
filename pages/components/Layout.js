import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react'
import Nav from "./Nav";

const Layout = ({children}) => {
    const { data: session } = useSession();
    if (!session) {
      return (
        <div className="bg-blue-900 w-screen h-screen flex items-center">
          <div className="text-center w-full ">
            <button
              onClick={() => signIn("google")}
              className="bg-white p-2 rounded-lg px-4"
            >
              {" "}
              Login With Google
            </button>
          </div>
        </div>
      );
    }  
    

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav/>
      <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">{children}</div>
    </div>
  );
}

export default Layout