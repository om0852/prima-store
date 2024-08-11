import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-2 ">
        <img src="/newlogo.png" width={70} />
    </Link>
  );
};

export default Logo;
