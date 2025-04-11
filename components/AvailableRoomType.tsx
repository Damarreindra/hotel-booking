"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAvailableRoom } from "@/lib/fetch";
import { format, parse, startOfDay, isBefore, addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AvailableRoomTypeCard from "./AvailableRoomTypeCard";
import { Spinner } from "./ui/spinner";
function AvailableRoomType() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guestNumber, setGuestNumber] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let checkInStr = searchParams.get("checkIn");
    let checkOutStr = searchParams.get("checkOut");
    let guestNumberStr = searchParams.get("guestNumber");

    const today = startOfDay(new Date());
    const tomorrow = addDays(today, 1);
    if (!checkInStr || !checkOutStr || !guestNumberStr) {
      router.replace("/");
      return;
    }

    let parsedCheckIn = parse(checkInStr, "dd-MM-yyyy", new Date());
    let parsedCheckOut = parse(checkOutStr, "dd-MM-yyyy", new Date());
    let formattedToday = format(today, "dd-MM-yyyy");
    let formattedTomorrow = format(tomorrow, "dd-MM-yyyy");

    if (isBefore(parsedCheckIn, today)) {
      router.replace(`
        /search?checkIn=${formattedToday}&checkOut=${formattedTomorrow}&guestNumber=${guestNumber}
      `);
    }
    setCheckIn(format(parsedCheckIn, "dd-MM-yyyy"));
    setCheckOut(format(parsedCheckOut, "dd-MM-yyyy"));
    setGuestNumber(guestNumberStr);
    setIsReady(true);
  }, [searchParams, router]);

  useEffect(() => {
    if (isReady && (!checkIn || !checkOut || !guestNumber)) {
      router.replace("/");
    }
  }, [isReady, checkIn, checkOut, guestNumber, router]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["roomtype", checkIn, checkOut, guestNumber],
    queryFn: () =>
      getAvailableRoom({
        checkIn,
        checkOut,
        guestNumber: Number(guestNumber),
      }),
    enabled: isReady && !!checkIn && !!checkOut && !!guestNumber,
  });

  if (data?.roomTypes?.length <= 0) {
    return (
      <section className="flex flex-col gap-3 w-full mt-5 h-screen">
        <span className="mt-5">No Rooms Available Sorry</span>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-3 w-full mt-5 h-fit">
      {data ? (
        data.roomTypes.map((roomtype: any) => {
          return <AvailableRoomTypeCard key={roomtype.id} data={roomtype} />;
        })
      ) : (
        <Spinner />
      )}
    </section>
  );
}

export default AvailableRoomType;
