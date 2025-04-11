import { IBooking } from "@/types/IBooking";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "@/app/utils/baseUrl";

const midtransKey = process.env.MIDTRANS_SERVER_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { userId, roomId, checkIn, checkOut, guestNumber }: IBooking =
      await req.json();
    if (!userId || !roomId || !checkIn || !checkOut) {
      return new NextResponse(
        JSON.stringify({
          message: "User ID, Room ID, Check In, Check Out field are required",
        }),
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const numericUserId = Number(userId);
    const numericRoomId = Number(roomId);

    if (checkInDate >= checkOutDate) {
      return new NextResponse(
        JSON.stringify({
          message: "Check out date must be later than check in",
        }),
        { status: 400 }
      );
    }

    const customer = await prisma.user.findUnique({
      where: { id: numericUserId },
    });

    const room = await prisma.room.findUnique({
      where: { id: numericRoomId },
    });

    if (!room) {
      return new NextResponse(
        JSON.stringify({
          message: "Room not found",
        }),
        { status: 404 }
      );
    }

    const existedBooking = await prisma.booking.findFirst({
      where: {
        roomId: numericRoomId,
        OR: [
          {
            checkIn: { lt: checkOutDate },
            checkOut: { gt: checkInDate },
          },
          {
            checkIn: { gte: checkInDate, lt: checkOutDate },
          },
          {
            checkOut: { gt: checkInDate, lte: checkOutDate },
          },
        ],
      },
    });
    if (existedBooking) {
      return new NextResponse(
        JSON.stringify({
          message: "Room already booked for the selected dates",
        })
      );
    }
    const orderId = crypto.randomUUID();
    const booking = await prisma.booking.create({
      data: {
        userId: numericUserId,
        roomId: numericRoomId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        orderId,
      },
    });

    const midtransClient = require("midtrans-client");

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: midtransKey,
    });

    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: room?.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        name: customer?.name,
        email: customer?.email,
      },
      callbacks: {
        finish: `${baseUrl}/payment?orderId=${orderId}`,
        unfinish: `${baseUrl}/payment?orderId=${orderId}`,
        error: `${baseUrl}/booking`,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    const newPayment = await prisma.payment.create({
      data: {
        amount: room.price,
        orderId,
        bookingId: booking.id,
        transactionToken,
      },
    });

    if (!newPayment) {
      await prisma.booking.delete({
        where: { id: booking.id },
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: "Booking successful",
        booking,
        payment: newPayment,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req: NextResponse) {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        payment: true,
      },
    });
    return new NextResponse(
      JSON.stringify({
        bookings,
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
