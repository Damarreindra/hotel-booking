import Image from "next/image";
import React from "react";
import RegisterForm from "../../components/form/RegisterForm";
import AuthForm from "../../components/form/AuthForm";
import AuthImageContainer from "../../components/AuthImageContainer";
import AuthHeader from "../../components/AuthHeader";
function page() {
  return (
    <div className="bg-third w-full h-screen flex items-center justify-center px-52">
      <div className="bg-white rounded-xl flex-1 h-[800px] flex flex-row">
        <div className="w-1/3 flex flex-col items-center py-12">
          <AuthHeader pageType="login" />
          <AuthForm formType="login" />
        </div>
        <div className="bg-gray-100 w-2/3 rounded-r-xl flex justify-center items-center">
          <AuthImageContainer type="login" />
        </div>
      </div>
    </div>
  );
}

export default page;
