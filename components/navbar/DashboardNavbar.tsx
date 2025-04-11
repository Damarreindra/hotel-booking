"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
function DashboardNavbar() {
  return (
    <nav className="w-full py-3 px-20 flex flex-row justify-between items-center border-b border-gray-200 bg-white">
      <SidebarTrigger className="p-3 rounded-xl" />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-row gap-2 items-center">
            <span>Hi Damarreindra</span> <ChevronDown size={15} />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
