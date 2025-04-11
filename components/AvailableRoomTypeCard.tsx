"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Spinner } from "./ui/spinner";
import { Room } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "./ui/form";
import { IoWarning, IoWarningOutline, IoWater } from "react-icons/io5";
import { Wifi } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
function AvailableRoomTypeCard({
  data,
}: {
  data: {
    capacity: Number;
    facilities: any;
    rooms: any;
    roomImg: string;
    roomType: string;
  };
}) {
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const router = useRouter();
  const searchParams = useSearchParams();
  let checkInStr = searchParams.get("checkIn");
  let checkOutStr = searchParams.get("checkOut");
  let guestNumberStr = searchParams.get("guestNumber");
  const { data: session } = useSession();
  const handleCheckout = () => {
    if (!selectedRoom) {
      toast(
        <div className="bg-white w-full">
          "Please select a room before proceeding."
        </div>
      );
      return;
    } else {
      router.replace(
        `/checkout?roomId=${selectedRoom?.id}&checkIn=${checkInStr}&checkOut=${checkOutStr}&guestNumber=${guestNumberStr}`
      );
    }
  };
  return (
    <section className="w-full rounded-xl bg-gray-25 flex flex-col gap-5 p-5 border  border-gray-200 shadow-md ">
      <h1 className="text-2xl font-bold">{data.roomType} Room</h1>
      <div className="flex flex-row w-full gap-12 ">
        <div className=" flex flex-col  rounded-xl bg-white w-fit h-fit  shadow-md">
          <Image
            src={data.roomImg}
            className="rounded-xl shadow-md"
            alt="Room Image"
            height={180}
            width={250}
          />
        </div>
        <div className="flex-1 rounded-xl bg-white shadow-md p-3 ">
          <div className="flex flex-row justify-between gap-1 items-center">
            <div>
              <span className="text-lg font-medium">{data.roomType} Room</span>
              <span className=" text-gray-400 text-sm font-medium flex flex-row gap-1 items-center">
                <IoWarningOutline /> Cant be reschedule and refund
              </span>
            </div>
            <div className="">
              <span className="text-sm">Available Room Number :</span>
              <Select
                onValueChange={(roomId) => {
                  const selected = data.rooms.find(
                    (room: any) => String(room.id) === roomId
                  );
                  setSelectedRoom(selected || null);
                }}
                required
              >
                <div className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select room number" />
                  </SelectTrigger>
                </div>
                <SelectContent className="bg-white w-full">
                  {data.rooms && data.rooms.length > 0
                    ? data.rooms.map((room: any, index: any) => (
                        <SelectItem key={index} value={String(room.id)}>
                          {room.number}
                        </SelectItem>
                      ))
                    : "No room available"}
                </SelectContent>
              </Select>
            </div>
          </div>
          <hr className="border-t border-gray-300 w-full mt-2" />
          <div className="flex flex-row gap-3 py-3">
            {data.facilities ? (
              data.facilities.map((facility: any, index: any) => (
                <span
                  className="text-sm flex flex-row items-center gap-1"
                  key={index}
                >
                  {facility.facility.name === "Wi-Fi" ? (
                    <Wifi size={15} />
                  ) : (
                    <IoWater />
                  )}{" "}
                  {facility.facility.name}
                </span>
              ))
            ) : (
              <Spinner />
            )}
          </div>
          <div className="w-full flex justify-between mb-5 items-center">
            <div className="flex flex-col text-sm text-gray-500">
              <span> Max. Capacity:</span>
              <span className="font-bold">{data.capacity.toString()}</span>
            </div>
            <div className="flex flex-col text-sm text-gray-500">
              {selectedRoom ? (
                <div className="flex flex-col">
                  <span> Mulai dari</span>
                  <span className="text-red-500 text-xl font-medium">
                    IDR {selectedRoom.price}
                  </span>
                  <span> /kamar/malam</span>
                </div>
              ) : (
                "No room selected"
              )}
            </div>
          </div>
          <Button
            onClick={() => handleCheckout()}
            className="bg-third text-white float-right disabled:"
            disabled={session === null}
          >
            {session === null ? "Need login to book the room" : "Booking"}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AvailableRoomTypeCard;
