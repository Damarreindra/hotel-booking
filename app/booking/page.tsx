"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserPayment } from "@/lib/fetch";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  CalendarDays,
  CalendarCheck,
  CreditCard,
  Loader,
  CircleCheck,
  CircleDashed,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { baseUrl } from "../utils/baseUrl";

export default function page() {
  const { data: session } = useSession();
  const userId = Number(session?.user.id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getUserPayment(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[180px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No bookings found for this user.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {data.payment.map((item: any) => (
        <Link key={item.id} href={`${baseUrl}/payment?orderId=${item.orderId}`}>
          <Card
            key={item.id}
            className="shadow-md hover:shadow-lg transition rounded-lg bg-white"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Booking #{item.bookingId}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {format(new Date(item.createdAt), "dd MMM yyyy, HH:mm")}
                  </p>
                </div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded-md ${
                    item.status === "PAID"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  } flex items-center gap-1`}
                >
                  {item.status === "PAID" ? (
                    <CircleCheck size={14} />
                  ) : (
                    <CircleDashed size={14} />
                  )}
                  {item.status}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays className="text-blue-500" size={16} />
                {format(new Date(item.booking.checkIn), "dd MMM yyyy")}
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="text-indigo-500" size={16} />
                {format(new Date(item.booking.checkOut), "dd MMM yyyy")}
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="text-emerald-500" size={16} />
                Rp {item.amount.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Loader
                  size={16}
                  className={`${
                    item.booking.status === "CONFIRMED"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                />
                <span className="capitalize">
                  {item.booking.status.toLowerCase()}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
