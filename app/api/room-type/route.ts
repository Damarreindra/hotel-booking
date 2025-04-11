import prisma from "@/lib/prisma";
import { formatISO, parse } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { type, img, facilities } = await req.json();
  if (!type || !img) {
    return new NextResponse(
      JSON.stringify({
        message: "type and img field are required",
      })
    );
  }

  if (!Array.isArray(facilities)) {
    return new NextResponse(
      JSON.stringify({
        message: "Facilities must be an array of IDs",
      })
    );
  }
  const roomType = await prisma.roomType.create({
    data: {
      roomType: type,
      roomImg: img,
      facilities: {
        create: facilities.map((facilityId: number) => ({
          facility: { connect: { id: facilityId } },
        })),
      },
    },
    include: {
      facilities: true,
    },
  });
  return new NextResponse(
    JSON.stringify({
      message: "Roomtype Added",
      roomType,
    })
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const guestNumber = Number(searchParams.get("guestNumber"));

  if (checkIn && checkOut && guestNumber) {
    const parsedCheckInDate = parse(checkIn!, "dd-MM-yyyy", new Date());
    const parsedCheckOutDate = parse(checkOut!, "dd-MM-yyyy", new Date());
    const checkInDate = formatISO(parsedCheckInDate!);
    const checkOutDate = formatISO(parsedCheckOutDate!);

    const roomTypes = await prisma.roomType.findMany({
      where: {
        ...(guestNumber > 1 ? { capacity: { gt: 1 } } : {}),
        rooms: {
          some: {
            bookings: {
              none: {
                OR: [
                  {
                    room: { status: "BOOKED" },
                  },
                  {
                    status: "CONFIRMED",
                  },
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
        },
      },
      include: {
        rooms: {
          where: {
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
        },
        facilities: {
          include: { facility: true },
        },
      },
    });
    return new NextResponse(
      JSON.stringify({
        roomTypes,
      })
    );
  } else {
    const roomTypes = await prisma.roomType.findMany();
    return new NextResponse(
      JSON.stringify({
        roomTypes,
      })
    );
  }
}
