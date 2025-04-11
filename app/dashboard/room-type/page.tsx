import AddRoomForm from "@/components/form/AddRoomForm";
import AddRoomTypeForm from "@/components/form/AddRoomTypeForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { columns } from "@/components/tables/roomTypeTable/Columns";
import { DataTable } from "@/components/tables/roomTypeTable/Data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getRoomTypes } from "@/lib/fetch";
import { RoomType } from "@prisma/client";
import { Metadata } from "next";
import React from "react";
import { IoAdd } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Stay Ease | Room Management",
};

export default async function BlankPage() {
  const { roomTypes }: any = await getRoomTypes();

  return (
    <div>
      <PageBreadcrumb pageTitle="Room Type" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="w-full  text-center">
          <div className="flex flex-row justify-between">
            <div></div>
            <div className="">
              <Dialog>
                <DialogTrigger>
                  <div className="bg-third text-white flex flex-row gap-2 items-center justify-center py-2 px-3 rounded">
                    <IoAdd />
                    Add Roomtype
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Add Roomtype Form</DialogTitle>
                    <AddRoomTypeForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={roomTypes} />
          </div>
        </div>
      </div>
    </div>
  );
}
