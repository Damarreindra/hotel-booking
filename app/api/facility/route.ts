import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return new NextResponse(
        JSON.stringify({
          message: "name Field are required",
        }),
        { status: 400 }
      );
    }
    const facility = await prisma.facility.create({
      data: { name },
    });
    return new NextResponse(
      JSON.stringify({
        message: "Facility Added",
        facility,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany();
    return new NextResponse(
      JSON.stringify({
        facilities,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 400 }
    );
  }
}
