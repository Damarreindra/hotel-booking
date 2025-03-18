import { IParams } from "@/types/IParams";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const { id } = params;
    const { roomId, checkIn, checkOut, status } = await req.json();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return new NextResponse(
        JSON.stringify({
          message: "Check-out date must be later than check-in date",
        }),
        { status: 400 }
      );
    }

    const existedRoom = await prisma.booking.findUnique({ where: { id } });
    if (!existedRoom) {
      return new NextResponse(JSON.stringify({ message: "Room not found" }), {
        status: 404,
      });
    }

    await prisma.booking.update({
      where: { id },
      data: {
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        status,
      },
    });
    return new NextResponse(JSON.stringify({ message: "Booking updated" }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 404,
    });
  }
}
