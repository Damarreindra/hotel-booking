import React from "react";
import { DataTable } from "../tables/bookingTable/Data-table";
import { columns } from "../tables/bookingTable/Columns";
import { getBookings } from "@/lib/fetch";

async function DashboardBookingTable() {
  const { bookings }: any = await getBookings();
  return (
    <div className="border rounded-xl p-8 bg-white border-gray-200 row-span-3 col-span-3">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
        Recent Booking
      </h3>
      <DataTable columns={columns} data={bookings} />
    </div>
  );
}

export default DashboardBookingTable;
