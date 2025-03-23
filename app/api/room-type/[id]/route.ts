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
