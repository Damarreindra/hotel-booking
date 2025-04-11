import AddRoomForm from "@/components/form/AddRoomForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { Metadata } from "next";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoAdd, IoAddCircle } from "react-icons/io5";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Booking } from "@prisma/client";
import { DataTable } from "@/components/tables/bookingTable/Data-table";
import { columns } from "@/components/tables/bookingTable/Columns";
import { getBookings } from "@/lib/fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Stay Ease | Booking Management",
};

export default async function BlankPage() {
  const { bookings }: any = await getBookings();

  return (
    <div>
      <PageBreadcrumb pageTitle="Booking Management" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full">
          <div className="container mx-auto">
            <DataTable columns={columns} data={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}
