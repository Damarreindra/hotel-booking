"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../../ui/button";

import { ArrowUpDown, RefreshCcw, TrashIcon } from "lucide-react";
import { GoKebabHorizontal } from "react-icons/go";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RoomType } from "@prisma/client";
import UpdateRoomTypeForm from "../../form/UpdateRoomTypeForm";

async function deleteRoomType(id: number) {
  const res = await fetch(`/api/room-type/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    return res.json().then((error) => {
      alert(error.message);
    });
  }
  window.location.reload();
}

export const columns: ColumnDef<RoomType>[] = [
  {
    accessorKey: "room_type",
    header: "Room Type",
    cell: ({ row }) => <span>{row.original.roomType}</span>,
  },
  {
    accessorKey: "room_img",
    header: "Room Image",
    cell: ({ row }) => (
      <Image
        src={row.original.roomImg}
        alt="room image"
        width={100}
        height={100}
      />
    ),
  },
  {
    id: "id",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <GoKebabHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="hover:cursor-pointer px-2">
            <AlertDialog>
              <AlertDialogTrigger className="hover:cursor-pointer flex items-center gap-2">
                <TrashIcon className="w-4 h-4" />
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this room.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 text-white"
                    onClick={() => deleteRoomType(row.original.id)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="hover:cursor-pointer">
            <Dialog>
              <DialogTrigger>
                <div className="flex flex-row gap-2 items-center justify-center py-2 px-3 rounded">
                  <RefreshCcw size={15} />
                  Update
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Update Roomtype Form</DialogTitle>
                  <UpdateRoomTypeForm id={row.original.id} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
