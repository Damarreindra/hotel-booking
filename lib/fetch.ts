import { baseUrl } from "@/app/utils/baseUrl";
import { Booking, RoomType } from "@prisma/client";

export async function customerFetch() {
  const res = await fetch("/api/customer");
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }

  return res.json();
}

export async function bookingFetch() {
  const res = await fetch("/api/booking");
  if (!res.ok) {
    throw new Error("Failed to fetch booking");
  }
  return res.json();
}

export async function getUserPayment(userId: number) {
  const res = await fetch(`/api/payment/user/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch booking");
  }
  return res.json();
}

export async function postBooking({ data, token }: any) {
  const res = await fetch(`${baseUrl}/api/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      roomId: data.roomId,
      userId: data.userId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  return res.json();
}

export async function getRoomTypes() {
  const res = await fetch(`${baseUrl}/api/room-type`);

  if (!res.ok) {
    throw new Error("Failed to fetch roomtypes");
  }

  const data = await res.json();
  return data;
}

export async function getRooms() {
  const res = await fetch(`${baseUrl}/api/room`);

  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }

  const data = await res.json();
  return data;
}

export async function getBookings() {
  const res = await fetch(`${baseUrl}/api/booking`);

  if (!res.ok) {
    throw new Error("Failed to fetch booking");
  }

  const data = await res.json();
  return data;
}

export async function getRoom(id: any) {
  const res = await fetch(`${baseUrl}/api/room/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const data = await res.json();
  return data;
}

export async function getPayment(token: string) {
  const res = await fetch(`/api/payment/${token}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const data = await res.json();
  return data;
}

export async function getAvailableRoom({
  checkIn,
  checkOut,
  guestNumber,
}: {
  checkIn: any;
  checkOut: any;
  guestNumber: Number;
}) {
  const res = await fetch(
    `${baseUrl}/api/room-type?checkIn=${checkIn}&checkOut=${checkOut}&guestNumber=${guestNumber}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch roomtypes");
  }

  const data = await res.json();
  return data;
}
