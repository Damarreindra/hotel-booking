import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  try {
    const updatedRooms = await prisma.room.updateMany({
      where: {
        bookings: {
          some: {
            checkOut: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
        },
        status: {
          not: "AVAILABLE",
        },
      },
      data: {
        status: "AVAILABLE",
      },
    });
    return new NextResponse(
      JSON.stringify({
        updated: updatedRooms.count,
      })
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error,
      }),
      { status: 500 }
    );
  }
}
