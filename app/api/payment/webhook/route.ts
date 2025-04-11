import {
  CLIENT_API_KEY_MIDTRANS,
  SERVER_API_KEY_MIDTRANS,
} from "@/app/utils/baseUrl";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const midtransClient = require("midtrans-client");

export async function POST(req: NextRequest) {
  const core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: SERVER_API_KEY_MIDTRANS,
    clientKey: CLIENT_API_KEY_MIDTRANS,
  });

  try {
    const body = await req.json();
    const statusResponse = await core.transaction.notification(body);

    const { order_id, transaction_status, fraud_status } = statusResponse;

    if (transaction_status === "capture" && fraud_status === "accept") {
      await prisma.payment.update({
        where: { orderId: order_id },
        data: { status: "PAID" },
      });
      await prisma.booking.update({
        where: { orderId: order_id },
        data: {
          status: "CONFIRMED",
          room: {
            update: {
              status: "BOOKED",
            },
          },
        },
      });
    } else if (transaction_status === "settlement") {
      await prisma.payment.update({
        where: { orderId: order_id },
        data: { status: "PAID" },
      });
      await prisma.booking.update({
        where: { orderId: order_id },
        data: {
          status: "CONFIRMED",
          room: {
            update: {
              status: "BOOKED",
            },
          },
        },
      });
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      await prisma.payment.update({
        where: { orderId: order_id },
        data: {
          status: "CANCELLED",
        },
      });
    } else if (transaction_status === "pending") {
      await prisma.payment.update({
        where: { orderId: order_id },
        data: { status: "PENDING" },
      });
    }

    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
    });
  } catch (err: any) {
    console.error("❌ Webhook error:", err);
    return new NextResponse(JSON.stringify({ message: "Webhook error" }), {
      status: 500,
    });
  }
}
