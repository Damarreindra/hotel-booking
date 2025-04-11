import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: number } }
) {
  const userId = Number(params.userId);
  if (!userId) {
    return new NextResponse(
      JSON.stringify({
        message: "User ID is required",
      }),
      { status: 404 }
    );
  }

  try {
    const payment = await prisma.payment.findMany({
      where: {
        booking: {
          userId,
        },
      },
      include: { booking: true },
    });
    if (payment.length === 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Payment not found",
        }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        payment,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}
