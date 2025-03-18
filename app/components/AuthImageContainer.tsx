import Image from "next/image";
import React from "react";

function AuthImageContainer({ type }: { type: string }) {
  return (
    <div>
      <Image
        src={
          type === "login"
            ? "./login-illustration.svg"
            : "./signup-illustration.svg"
        }
        alt="Illustrasion"
        width={650}
        height={100}
      />
    </div>
  );
}

export default AuthImageContainer;
