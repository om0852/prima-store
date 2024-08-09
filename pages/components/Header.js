import { signOut } from "next-auth/react";
import React from "react";

const Header = () => {
  return (
    <div className="w-full bg-gray-800 items-center text-white h-20 flex flex-row justify-between px-8">
      <h1 className="text-white flex">PrimaStore</h1>
      <ul className="flex flex-row justify-evenly gap-6 list-none">
        <li className="cursor-pointer" onClick={() => signOut({callbackUrl:"http://localhost:3000"})}>Logout</li>
      </ul>
    </div>
  );
};

export default Header;
