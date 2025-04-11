import prisma from "@/lib/prisma";
import { IParams } from "@/types/IParams";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;
    const existedRoom = await prisma.roomType.findUnique({
      where: { id: Number(id) },
    });

    if (!existedRoom) {
      return new NextResponse(
        JSON.stringify({ message: "Roomtype not found" }),
        {
          status: 404,
        }
      );
    }
    await prisma.roomType.delete({ where: { id: Number(id) } });
    return new NextResponse(
      JSON.stringify({ message: "Roomtype deleted successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;
    const roomType = await prisma.roomType.findUnique({
      where: { id: Number(id) },
      include: {
        facilities: {
          include: { facility: true },
        },
      },
    });
    if (!roomType) {
      return new NextResponse(
        JSON.stringify({ message: "Roomtype not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(roomType));
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;

    const { type, img, facilities } = await req.json();
    console.log(facilities);

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
    const roomType = await prisma.roomType.update({
      where: { id: Number(id) },
      data: {
        roomType: type,
        roomImg: img,
        facilities: {
          deleteMany: {},
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
        message: "Roomtype Updated",
        roomType,
      })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: error,
      })
    );
  }
}
