import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.png";

function AuthHeader({ pageType }: { pageType: "login" | "register" }) {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <h1 className="text-fourth text-3xl font-extrabold">
        {pageType === "login"
          ? "Sign In For"
          : pageType === "register"
          ? "Sign Up For"
          : ""}
      </h1>
      <Image src={Logo} alt="Stay Ease Logo" width={200} />
    </div>
  );
}

export default AuthHeader;
