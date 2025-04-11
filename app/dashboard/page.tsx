import StatisticsChart from "@/components/chart/StatisticsChart";
import DashboardBookingCard from "@/components/dashboard/DashboardBookingCard";
import DashboardBookingTable from "@/components/dashboard/DashboardBookingTable";
import DashboardCustomerCard from "@/components/dashboard/DashboardCustomerCard";
import DashboardRoomCard from "@/components/dashboard/DashboardRoomCard";
import DashboardRoomTypeCard from "@/components/dashboard/DashboardRoomTypeCard";
import { useQueryClient } from "@tanstack/react-query";
import { BoxIcon } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import { FaUserGroup } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Stayease Dashboard",
  description: "This is Stayease Dashboard",
};

function page() {
  return (
    <div className="xl:px-10 xl:py-12 ">
      <div className="grid grid-cols-3 gap-5 w-full h-auto">
        <DashboardCustomerCard />
        <DashboardBookingCard />
        <div className="row-span-4 flex flex-col gap-5">
          <DashboardRoomTypeCard />
          <DashboardRoomCard />
        </div>
        <div className=" row-span-3 col-span-2">
          <StatisticsChart />
        </div>
        <DashboardBookingTable />
      </div>
    </div>
  );
}

export default page;
