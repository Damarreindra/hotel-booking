"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

function page() {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  async function verifyEmail() {
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }
    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    setMessage(data.message);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={verifyEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Verify Email
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default page;
