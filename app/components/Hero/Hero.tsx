import React from "react";
import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <div className="w-full">
      <div className="flex flex-row">
        <section className="px-16 bg-gray-50 flex flex-col gap-5 justify-center">
          <Navbar />
          <div className="flex flex-col gap-5 justify-center flex-1  -mt-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-6xl font-extrabold text-fourth">
                Find Perfect Hotels{" "}
              </h1>
              <h1 className="text-6xl font-extrabold text-third">
                anywhere you go.
              </h1>
            </div>
            <p className="text-fourth w-1/2 text-justify text-xl">
              We've been in the hotels business across the world for 5 years
              now. We assure you that you will always enjoy your stay with us.
            </p>
            <div className="flex flex-row gap-3">
              <Link href={"/register"}>
                <Button className="bg-third rounded px-8 py-6">Sign Up</Button>
              </Link>
              <Button className="bg-gray-300 text-primary rounded px-8 py-6">
                Search Room
              </Button>
            </div>
          </div>
        </section>
        <section
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&width=1440&height=1024&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "70vh",
          }}
        ></section>
      </div>
    </div>
  );
}

export default Hero;
