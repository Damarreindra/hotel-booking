"use client";

import { getPayment } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Loader2,
  CalendarCheck,
  Users,
  CreditCard,
  Clock,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { format, differenceInDays } from "date-fns";
import { baseUrl } from "../utils/baseUrl";
import { useSession } from "next-auth/react";

declare global {
  interface Window {
    snap: any;
  }
}

const page = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const midtransClientKey = process.env.CLIENT_API_KEY_MIDTRANS;
  const { data: session } = useSession();
  const router = useRouter();
  const [midtransLoaded, setMidtransLoaded] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["payment", orderId],
    queryFn: () => getPayment(orderId!),
    enabled: !!orderId,
  });

  useEffect(() => {
    if (!orderId) {
      router.replace("/");
    }
  }, [orderId, router]);

  const { amount, status, createdAt, booking, id, transactionToken } =
    data || {};
  const { checkIn, checkOut, room, guestName } = booking || {};
  const { roomImg, roomType, capacity, price } = room?.roomType || {};

  useEffect(() => {
    if (!orderId) return;

    const midtransScript = document.createElement("script");
    midtransScript.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    midtransScript.setAttribute("data-client-key", `${midtransClientKey}`);
    midtransScript.onload = () => setMidtransLoaded(true);
    document.body.appendChild(midtransScript);

    return () => {
      document.body.removeChild(midtransScript);
    };
  }, [orderId]);

  const handlePayment = () => {
    if (midtransLoaded && window.snap) {
      window.snap.pay(transactionToken, {
        onSuccess: () => {
          router.replace(`/payment?orderId=${orderId}`);
        },

        onPending: (result: any) => {
          console.log("Payment Pending", result);
          alert("Payment is pending");
        },

        onError: (result: any) => {
          console.log("Payment Error", result);
          alert("Payment failed");
        },
      });
    }
  };

  const nights =
    checkIn &&
    checkOut &&
    differenceInDays(new Date(checkOut), new Date(checkIn));

  const totalPrice = amount * nights;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    router.replace("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
          Complete Your Payment
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-white shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="border-b bg-white p-6">
              <CardTitle className="text-xl font-semibold">
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-5">
                {roomImg && (
                  <div className="relative w-full md:w-48 h-40 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={roomImg}
                      alt={roomType || "Room"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="space-y-3 text-gray-700 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900">
                    {roomType || "Standard Room"} - Room {room?.number}
                  </h3>

                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-primary" />
                    <span>Capacity: {capacity} people</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <CalendarCheck size={18} className="text-primary" />
                      <div>
                        <p className="font-medium">Check-in</p>
                        <p>
                          {checkIn ? format(new Date(checkIn), "PPP") : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:block text-gray-300">|</div>

                    <div className="flex items-center gap-2">
                      <CalendarCheck size={18} className="text-primary" />
                      <div>
                        <p className="font-medium">Check-out</p>
                        <p>
                          {checkOut ? format(new Date(checkOut), "PPP") : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:block text-gray-300">|</div>

                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-primary" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p>
                          {nights} night{nights !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {guestName && (
                    <div className="pt-2">
                      <p className="font-medium">Guest Name:</p>
                      <p>{guestName}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-base text-gray-600">
                  <span>
                    Room price ({nights} night{nights !== 1 ? "s" : ""})
                  </span>
                  <span>
                    IDR {amount} x {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-semibold mt-2 pt-2 border-t text-gray-900">
                  <span>Total Payment</span>
                  <span className="text-primary">IDR {totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm rounded-xl">
            <CardHeader className="border-b p-6">
              <CardTitle className="text-lg font-semibold">
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Order ID</span>
                  <span className="font-medium">{id || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Date</span>
                  <span>
                    {createdAt ? format(new Date(createdAt), "PPP") : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Status</span>
                  <span
                    className={`font-medium ${
                      status === "PENDING"
                        ? "text-yellow-600"
                        : status === "COMPLETED"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {status || "PENDING"}
                  </span>
                </div>
              </div>

              <div className="border-t border-b py-4 my-2">
                <div className="flex justify-between text-base font-semibold">
                  <span>Total Amount</span>
                  <span className="text-primary">IDR {totalPrice}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <ShieldCheck
                    size={18}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <span>Your payment is secure and encrypted</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={18}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <span>Instant confirmation after payment</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                onClick={handlePayment}
                disabled={!midtransLoaded || status === "PAID"}
                className="w-full py-6 text-base font-medium shadow-md bg-third text-white hover:shadow-lg transition-all disabled:bg-gray-400"
              >
                {status === "PAID" ? "Payment Completed" : "Pay Now"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
