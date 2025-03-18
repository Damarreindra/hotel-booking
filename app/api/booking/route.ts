import { IBooking } from "@/types/IBooking";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, roomId, checkIn, checkOut }: IBooking = await req.json();
    if (!userId || !roomId || !checkIn || !checkOut) {
      return new NextResponse(
        JSON.stringify({
          message: "User ID, Room ID, Check In, Check Out field are required",
        }),
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkInDate > checkOutDate) {
      return new NextResponse(
        JSON.stringify({
          message: "Check out date must be later than check in",
        }),
        { status: 400 }
      );
    }

    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (room?.status === "BOOKED") {
      return new NextResponse(
        JSON.stringify({
          message: "Room already booked",
        })
      );
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        roomId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
      },
    });

    await prisma.room.update({
      where: { id: roomId },
      data: { status: "BOOKED" },
    });

    return new NextResponse(
      JSON.stringify({ message: "Booking successful", booking }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
