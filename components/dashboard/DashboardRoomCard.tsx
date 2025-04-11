"use client";
import { getRooms } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { BoxIcon, HomeIcon } from "lucide-react";
import React from "react";
import { FaUserGroup } from "react-icons/fa6";

function DashboardRoomCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["room"],
    queryFn: getRooms,
  });

  if (isLoading)
    return (
      <section className="border border-gray-200 rounded-xl  p-8 flex flex-col gap-5 bg-white  animate-pulse">
        <div className="p-8 rounded-xl bg-gray-100 w-fit"></div>

        <span className="p-3 rounded-xl bg-gray-300"></span>
        <span className="p-3 rounded-xl bg-gray-300"></span>
      </section>
    );
  if (error)
    return (
      <section className="border border-gray-200 rounded-xl  p-8 flex flex-col gap-5 bg-white  ">
        <span className="p-3 rounded-xl bg-gray-300">Refresh the page</span>
      </section>
    );
  return (
    <section className="border border-gray-200 rounded-xl  p-8 flex flex-col gap-5 bg-white  justify-center">
      <div className="p-3 rounded-xl bg-gray-100 w-fit">
        <HomeIcon className="text-fourth" size={25} />
      </div>

      <span className="text-gray-400">Rooms</span>
      <span className="text-fourth text-3xl font-bold">
        {data?.rooms.length}
      </span>
    </section>
  );
}

export default DashboardRoomCard;
