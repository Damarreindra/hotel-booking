"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "../../ui/button";
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
import UpdateRoomForm from "../../form/UpdateRoomForm";

type Booking = {
  id: number;
  userId: number;
  roomId: number;
  checkIn: string; // Use `Date` if parsed into a Date object
  checkOut: string; // Use `Date` if parsed into a Date object
  transactionToken: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED"; // Adjust based on possible statuses
  createdAt: string; // Use `Date` if needed
  user: {
    name: string;
  };
};

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

// async function updateRoomStatus(status: string, id: string) {
//   const res = await fetch(`/api/room/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ status }),
//   });

//   if (!res.ok) {
//     return res.json().then((error) => alert(error.message));
//   }
//   alert(`Room status updated to ${status}`);
//   window.location.reload();
// }

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorFn: (row) => row.user?.name,
    id: "userId",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-3 items-center">
          <span>{row.original.user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "checkIn",
    header: "Check In Date",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-3 items-center">
          <span>{format(row.original.checkIn, "dd-MM-yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "checkOut",
    header: "Check Out Date",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-3 items-center">
          <span>{format(row.original.checkOut, "dd-MM-yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={`flex flex-row gap-3 items-center  border w-fit p-1 font-medium rounded-xl
       ${
         row.original.status === "CONFIRMED"
           ? " border-green-500 text-green-500"
           : row.original.status === "PENDING"
           ? "border-yellow-400 text-yellow-500"
           : "border-red-500 text-red-500"
       }
        `}
        >
          <span>{row.original.status}</span>
        </div>
      );
    },
  },
];
