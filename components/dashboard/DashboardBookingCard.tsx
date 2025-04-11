"use client";
import { bookingFetch } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { BoxIcon } from "lucide-react";
import React from "react";
import { FaUserGroup } from "react-icons/fa6";

function DashboardBookingCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: bookingFetch,
  });

  if (isLoading)
    return (
      <section className="border border-gray-200 rounded-xl  p-8 flex flex-col gap-5 bg-white max-h-[200px]  animate-pulse">
        <div className="p-8 rounded-xl bg-gray-100 w-fit"></div>

        <span className="p-3 rounded-xl bg-gray-300"></span>
        <span className="p-3 rounded-xl bg-gray-300"></span>
      </section>
    );
  if (error)
    return (
      <section className="border border-gray-200 rounded-xl  p-8 flex flex-col gap-5 bg-white max-h-[200px] ">
        <span className="p-3 rounded-xl bg-gray-300">Refresh the page</span>
      </section>
    );
  return (
    <section className="border border-gray-200 rounded-xl  p-8 flex flex-col gap-5 bg-white max-h-[200px] justify-center">
      <div className="p-3 rounded-xl bg-gray-100 w-fit">
        <BoxIcon className="text-fourth" size={25} />
      </div>

      <span className="text-gray-400">Bookings</span>
      <span className="text-fourth text-3xl font-bold">
        {data.bookings.length}
      </span>
    </section>
  );
}

export default DashboardBookingCard;
