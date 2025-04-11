"use client";
import React from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
function HomeNavbar() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <nav className="w-full py-4 px-12 bg-white flex flex-row items-center justify-between border-b border-gray-200">
        <Image src={Logo} alt="Stay Ease Logo" width={120} />

        <div className="flex flex-row gap-3 animate-pulse">
          <Button className="bg-gray-500 text-gray-500 font-medium">
            Sign In
          </Button>
          <Button className="bg-gray-500 text-gray-500 font-medium">
            Register
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full py-4 px-12 bg-white flex flex-row items-center justify-between border-b border-gray-200">
      <Image src={Logo} alt="Stay Ease Logo" width={120} />
      {session ? (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row gap-2 items-center">
              <span>Hi {session?.user.name}</span> <ChevronDown size={15} />{" "}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/booking"}>
                <DropdownMenuItem>My Bookings</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex flex-row gap-3 ">
          <Link href={"/login"}>
            <Button className="bg-fourth text-white font-medium">
              Sign In
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button className="bg-third text-white font-medium">
              Register
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default HomeNavbar;
