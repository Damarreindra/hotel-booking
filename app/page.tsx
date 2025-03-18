"use client";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import PopularRoom from "./components/PopularRoom";
import MainService from "./components/MainService";
import Footer from "./components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import RoomSearchForm from "./components/RoomSearchForm";

function page() {
  // const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <>
      <Hero />
      <RoomSearchForm />
      <PopularRoom />

      <MainService />
      <Footer />
    </>
  );
}

export default page;
