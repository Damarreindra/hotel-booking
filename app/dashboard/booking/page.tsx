import AddRoomForm from "@/components/AddRoomForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { columns, Room } from "@/components/roomTable/Columns";
import { DataTable } from "@/components/roomTable/Data-table";
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

export const metadata: Metadata = {
  title: "Stay Ease | Room Management",
};

async function getRooms(): Promise<Room[]> {
  const res = await fetch("http://localhost:3000/api/room");

  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }

  const data: Room[] = await res.json();
  return data;
}

export default async function BlankPage() {
  const { rooms }: any = await getRooms();

  return (
    <div>
      <PageBreadcrumb pageTitle="Room Management" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full">
          <div className="flex flex-row justify-between">
            <div>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>Link</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>Link</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
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

          <div className="container mx-auto py-10 mt-3">
            <DataTable columns={columns} data={rooms} />
          </div>
        </div>
      </div>
    </div>
  );
}
