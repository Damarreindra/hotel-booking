"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  Check,
  Cog,
  RefreshCcw,
  TrashIcon,
  UserRound,
} from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";
import UpdateRoomForm from "../UpdateRoomForm";

export type RoomType = {
  id: string;
  roomType: string;
  roomImg: string;
};

export type Room = {
  id: string;
  number: number;
  roomTypeId: string;
  price: number;
  status: string;
  roomType: RoomType;
};

const updateOpt = [
  { opt: "AVAILABLE" },
  { opt: "MAINTENANCE" },
  { opt: "BOOKED" },
];

async function deleteRoom(id: string) {
  const res = await fetch(`/api/room/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    return res.json().then((error) => {
      alert(error.message);
    });
  }
  window.location.reload();
}

async function updateRoomStatus(status: string, id: string) {
  const res = await fetch(`/api/room/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    return res.json().then((error) => alert(error.message));
  }
  alert(`Room status updated to ${status}`);
  window.location.reload();
}

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "number",
    header: "Room Number",
  },
  {
    accessorKey: "roomType",
    header: "Room Type",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-3 items-center">
          <span>{row.original.roomType.roomType}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const [selectedOpt, setSelectedOpt] = useState("");
      return (
        <div className="flex flex-row gap-3 items-center">
          <div
            className={`py-1 px-2 rounded-full border flex flex-row gap-2 items-center ${
              row.original.status === "AVAILABLE"
                ? "border-green-500 text-green-500"
                : row.original.status === "MAINTENANCE"
                ? "border-yellow-400 text-yellow-500"
                : "border-red-500 text-red-500"
            }`}
          >
            <span className="text-xs">
              {row.original.status === "AVAILABLE" ? (
                <Check size={15} />
              ) : row.original.status === "MAINTENANCE" ? (
                <Cog size={15} />
              ) : (
                <UserRound size={15} />
              )}
            </span>
            <span>{row.original.status}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <GoKebabHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuLabel>Update Room Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="hover:cursor-pointer px-2">
                <AlertDialog>
                  {updateOpt.map((opt, index) => (
                    <AlertDialogTrigger
                      key={index}
                      className="hover:cursor-pointer flex  items-center gap-2"
                      onClick={() => setSelectedOpt(opt.opt)}
                    >
                      <div
                        className={`py-1 px-2 rounded-full border flex flex-row gap-2 items-center mt-1 ${
                          opt.opt === "AVAILABLE"
                            ? "border-green-500 text-green-500"
                            : opt.opt === "MAINTENANCE"
                            ? "border-yellow-400 text-yellow-500"
                            : "border-red-500 text-red-500"
                        }`}
                      >
                        <span className="text-xs">
                          {opt.opt === "AVAILABLE" ? (
                            <Check size={15} />
                          ) : opt.opt === "MAINTENANCE" ? (
                            <Cog size={15} />
                          ) : (
                            <UserRound size={15} />
                          )}
                        </span>
                        <span>{opt.opt}</span>
                      </div>
                    </AlertDialogTrigger>
                  ))}

                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {selectedOpt === "MAINTENANCE"
                          ? "This will change the room status to maintenance."
                          : selectedOpt === "AVAILABLE"
                          ? "This will set the room as available."
                          : "This will set the room as booked."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 text-white"
                        onClick={() =>
                          updateRoomStatus(selectedOpt, row.original.id)
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.price;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
      return (
        <div className="flex flex-row gap-3 items-center">
          <span className=" font-medium">{formatted}</span>
        </div>
      );
    },
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
                    onClick={() => deleteRoom(row.original.id)}
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
                  <DialogTitle>Update Room Form</DialogTitle>
                  <UpdateRoomForm id={Number(row.original.id)} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
