import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.png";
function Navbar() {
  return (
    <nav className="w-full py-8 bg-gray-50 flex flex-row items-center justify-between ">
      <Image src={Logo} alt="Stay Ease Logo" width={120} />
      <div className="text-fourth w-1/2 font-semibold font-inter flex flex-row justify-between">
        <div className="hover:border-b-2 hover:text-third border-third">
          <h1>About</h1>
        </div>
        <div className="hover:border-b-2 hover:text-third border-third">
          <h1>Pricing</h1>
        </div>
        <div className="hover:border-b-2 hover:text-third border-third">
          <h1>About</h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
