import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Nav from "./Nav";
import Logo from "./Logo";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  if (!session) {
    return (
      <div className="bg-customBg w-screen h-screen flex items-center">
        <div className="text-center w-full ">
          <button
            onClick={() => signIn("google")}
            className="bg-blue-400 p-2 rounded-lg px-4"
          >
            {" "}
            Login With Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-black min-h-screen h-screen">
      <div className="h-10  flex flex-row justify-center items-center md:hidden">
        <button
          onClick={() => {
            setShowNav(true);
          }}
          className=" block  md:hidden mx-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
        <Logo />
        </div>
      </div>
      <div className="flex h-screen" onClick={() => setShowNav(false)}>
        <Nav showNav={showNav} />
        <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
