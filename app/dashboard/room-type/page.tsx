import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { columns } from "@/components/roomTypeTable/Columns";
import { DataTable } from "@/components/roomTypeTable/Data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RoomType } from "@prisma/client";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Stay Ease | Room Management",
};

async function getRooms(): Promise<RoomType[]> {
  const res = await fetch("http://localhost:3000/api/room-type");

  if (!res.ok) {
    throw new Error("Failed to fetch roomtypes");
  }

  const data: RoomType[] = await res.json();
  return data;
}

export default async function BlankPage() {
  const { roomTypes }: any = await getRooms();

  return (
    <div>
      <PageBreadcrumb pageTitle="Room Type" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full  text-center">
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={roomTypes} />
          </div>
        </div>
      </div>
    </div>
  );
}
