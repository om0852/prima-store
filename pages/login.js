import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const login = () => {
  const { data: session } = useSession();
  const router = useRouter();
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
          <button
            onClick={() => signOut()}
            className="bg-blue-400 p-2 rounded-lg px-4"
          >
            {" "}
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    // router.push("/")
  }
  return <div></div>;
};

export default login;
