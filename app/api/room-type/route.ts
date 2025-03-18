import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { type, img } = await req.json();
  if (!type || !img) {
    return new NextResponse(
      JSON.stringify({ message: "Type and Image field are required" })
    );
  }
  const roomType = await prisma.roomType.create({
    data: {
      room_type: type,
      room_img: img,
    },
  });
  return new NextResponse(
    JSON.stringify({
      message: "Roomtype Added",
      roomType,
    })
  );
}
