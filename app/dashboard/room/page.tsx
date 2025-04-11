import AddRoomForm from "@/components/form/AddRoomForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { columns, Room } from "@/components/tables/roomTable/Columns";
import { DataTable } from "@/components/tables/roomTable/Data-table";
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
import { getRooms } from "@/lib/fetch";

export const metadata: Metadata = {
  title: "Stay Ease | Room Management",
};

export default async function BlankPage() {
  const { rooms }: any = await getRooms();

  return (
    <div>
      <PageBreadcrumb pageTitle="Room Management" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full">
          <div className="flex flex-row justify-between">
            <div></div>
            <div className="">
              <Dialog>
                <DialogTrigger>
                  <div className="bg-third text-white flex flex-row gap-2 items-center justify-center py-2 px-3 rounded">
                    <IoAdd />
                    Add Room
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Add Room Form</DialogTitle>
                    <AddRoomForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="container mx-auto">
            <DataTable columns={columns} data={rooms} />
          </div>
        </div>
      </div>
    </div>
  );
}
