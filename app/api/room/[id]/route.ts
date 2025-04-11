import { IParams } from "@/types/IParams";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;
    const room = await prisma.room.findUnique({
      where: { id: Number(id) },
      include: {
        roomType: {
          include: {
            facilities: {
              include: {
                facility: true,
              },
            },
          },
        },
      },
    });
    if (!room) {
      return new NextResponse(JSON.stringify({ message: "Room not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(room));
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;
    const existedRoom = await prisma.room.findUnique({
      where: { id: Number(id) },
    });

    if (!existedRoom) {
      return new NextResponse(JSON.stringify({ message: "Room not found" }), {
        status: 404,
      });
    }
    await prisma.room.delete({ where: { id: Number(id) } });
    return new NextResponse(
      JSON.stringify({ message: "Room deleted successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;
    const { number, price, status, roomTypeId } = await req.json();

    const existedRoom = await prisma.room.findUnique({
      where: { id: Number(id) },
    });

    if (!existedRoom) {
      return new NextResponse(JSON.stringify({ message: "Room not found" }), {
        status: 404,
      });
    }
    if (number && price && roomTypeId) {
      const updatedRoom = await prisma.room.update({
        where: { id: Number(id) },
        data: {
          number,
          price,
          roomTypeId,
        },
      });
      return new NextResponse(
        JSON.stringify({ message: "Room updated successfully", updatedRoom }),
        { status: 200 }
      );
    } else {
      const updatedRoom = await prisma.room.update({
        where: { id: Number(id) },
        data: {
          status,
        },
      });
      return new NextResponse(
        JSON.stringify({ message: "Room updated successfully", updatedRoom }),
        { status: 200 }
      );
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
