import { authMiddleware } from "@/app/utils/validateToken";
import prisma from "@/lib/prisma";
import { formatISO } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { number, roomTypeId, price } = await req.json();
    const newRoom = await prisma.room.create({
      data: { number, roomType: { connect: { id: roomTypeId } }, price },
    });
    return new NextResponse(
      JSON.stringify({ message: "Room successfully added", newRoom })
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: `${error.message}`,
      })
    );
  }
}

export async function GET(req: NextRequest) {
  // const validateRequest = await authMiddleware(req);
  // if (validateRequest) return validateRequest;

  const { searchParams } = new URL(req.url);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guestNumber = Number(searchParams.get("guestNumber"));

  if (checkIn && checkOut && guestNumber) {
    try {
      const checkInDate = formatISO(checkIn!);
      const checkOutDate = formatISO(checkOut!);
      const rooms = await prisma.room.findMany({
        where: {
          status: "AVAILABLE",
          ...(guestNumber > 1 && {
            roomType: {
              is: {
                roomType: { not: "Single" },
              },
            },
          }),
          bookings: {
            none: {
              OR: [
                {
                  checkIn: { lt: checkOutDate },
                  checkOut: { gt: checkInDate },
                },
                {
                  checkIn: { gte: checkInDate, lt: checkOutDate },
                },
                {
                  checkOut: { gt: checkInDate, lte: checkOutDate },
                },
              ],
            },
          },
        },
        include: { roomType: true },
      });
      return new NextResponse(JSON.stringify({ rooms }));
    } catch (error: any) {
      return new NextResponse(
        JSON.stringify({
          message: `${error.message}`,
        })
      );
    }
  }
  try {
    const rooms = await prisma.room.findMany({
      include: { roomType: true },
    });
    return new NextResponse(JSON.stringify({ rooms }));
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: `${error.message}`,
      })
    );
  }
}
