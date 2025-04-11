import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        email: true,
        name: true,
      },
    });
    return new NextResponse(
      JSON.stringify({
        customers,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}
