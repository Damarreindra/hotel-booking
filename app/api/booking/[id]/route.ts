import { IParams } from "@/types/IParams";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const { id } = params;
    const {
      roomId,
      checkIn,
      checkOut,
      bookingStatus,
      paymentId,
      paymentStatus,
    } = await req.json();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const bookingId = Number(id);
    if (checkOutDate <= checkInDate) {
      return new NextResponse(
        JSON.stringify({
          message: "Check-out date must be later than check-in date",
        }),
        { status: 400 }
      );
    }

    const existedBooking = await prisma.booking.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existedBooking) {
      return new NextResponse(
        JSON.stringify({ message: "Booking not found" }),
        {
          status: 404,
        }
      );
    }

    if (paymentId && paymentStatus) {
      await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          roomId,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          status: bookingStatus,
          payment: {
            update: {
              where: { id: paymentId },
              data: {
                status: paymentStatus,
              },
            },
          },
        },
      });
      return new NextResponse(JSON.stringify({ message: "Booking updated" }), {
        status: 200,
      });
    } else {
      await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          roomId,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          status: bookingStatus,
        },
      });
      return new NextResponse(JSON.stringify({ message: "Booking updated" }), {
        status: 200,
      });
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 404,
    });
  }
}
