import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { type, img } = await req.json();
  if (!type || !img) {
    return new NextResponse(
      JSON.stringify({
        message: "type and img field are required",
      })
    );
  }
  const roomType = await prisma.roomType.create({
    data: {
      roomType: type,
      roomImg: img,
    },
  });
  return new NextResponse(
    JSON.stringify({
      message: "Roomtype Added",
      roomType,
    })
  );
}

export async function GET() {
  const roomTypes = await prisma.roomType.findMany();
  return new NextResponse(
    JSON.stringify({
      roomTypes,
    })
  );
}
