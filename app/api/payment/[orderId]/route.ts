import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  if (!orderId) {
    return new NextResponse(
      JSON.stringify({
        message: "Token invalid",
      })
    );
  }
  const transaction = await prisma.payment.findFirst({
    where: { orderId },
    include: {
      booking: {
        include: {
          room: {
            include: {
              roomType: true,
            },
          },
        },
      },
    },
  });

  if (!transaction) {
    return new NextResponse(
      JSON.stringify({ message: "Transaction not found" }),
      { status: 404 }
    );
  }
  return new NextResponse(JSON.stringify(transaction), { status: 200 });
}
