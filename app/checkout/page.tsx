"use client";
import BookingDetailSkeleton from "@/components/skeleton/BookingDetailSkeleton";
import { Spinner } from "@/components/ui/spinner";
import { getRoom, postBooking } from "@/lib/fetch";
import { IRoom } from "@/types/IRoom";
import { useQuery } from "@tanstack/react-query";
import {
  differenceInCalendarDays,
  differenceInDays,
  endOfDay,
  endOfToday,
  format,
  formatISO,
  isBefore,
  parse,
  startOfToday,
} from "date-fns";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle,
  CreditCard,
  Loader2,
  Moon,
  User2Icon,
  Users,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoWater } from "react-icons/io5";
import AnnouncerLogo from "@/public/images/illustrations/announcer.png";
import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { useSession } from "next-auth/react";

const steps = [
  {
    step: 1,
    title: "Booking Details",
  },
  {
    step: 2,
    title: "Booking Summary",
  },
];
function page() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const roomId = searchParams.get("roomId");
  let checkInStr = searchParams.get("checkIn");
  let checkOutStr = searchParams.get("checkOut");
  let guestNumberStr = searchParams.get("guestNumber");

  const checkInDate = parse(checkInStr!, "dd-MM-yyyy", new Date());
  const checkOutDate = parse(checkOutStr!, "dd-MM-yyyy", new Date());

  const formattedCheckIn = format(checkInDate, "EE, dd MMM yyyy");
  const formattedCheckOut = format(checkOutDate, "EE, dd MMM yyyy");
  const formattedCheckInInput = format(checkInDate!, "yyyy-MM-dd");
  const formattedCheckOutInput = format(checkOutDate!, "yyyy-MM-dd");
  const todayDate = format(endOfToday(), "yyyy-MM-dd");

  const { data, isLoading, isError } = useQuery<IRoom>({
    queryKey: ["room"],
    queryFn: () => getRoom(roomId),
  });
  const totalNight = differenceInDays(checkOutDate, checkInDate);
  const totalPrice = data?.price! * totalNight;

  const handleStepChange = async (newStep: number) => {
    setCurrentStep(newStep);
  };

  const handleBooking = async () => {
    if (!session || !session.user) {
      console.error("User session is missing.");
      return;
    }
    if (isBefore(formattedCheckInInput, todayDate)) {
      alert("Check-in date cannot be in the past.");
      router.push("/");
      return;
    }

    try {
      const createBooking = await postBooking({
        data: {
          roomId,
          userId: session.user.id,
          checkIn: formattedCheckInInput,
          checkOut: formattedCheckOutInput,
        },
        token: session.accessToken,
      });

      if (createBooking && !createBooking.error) {
        router.replace(`/payment?orderId=${createBooking?.payment.orderId}`);
      } else {
        alert(createBooking.message);
      }
    } catch (error: any) {
      console.error("Booking failed:", error.message);
    }
  };

  if (isLoading) {
    return <BookingDetailSkeleton />;
  }

  return (
    <div>
      <div className="max-w-1/2">
        <Stepper value={currentStep}>
          {steps.map(({ step, title }) => (
            <StepperItem
              key={step}
              step={step}
              className="not-last:flex-1 max-md:items-start "
            >
              <div className="rounded max-md:flex-col flex flex-row items-center gap-2 ">
                <StepperIndicator className="rounded-full border border-gray-300" />
                <div
                  className={`text-center md:text-left ${
                    step == currentStep ? "text-black" : "text-gray-400"
                  }`}
                >
                  <StepperTitle>{title}</StepperTitle>
                </div>
              </div>
              {step < steps.length && (
                <StepperSeparator className="max-md:mt-3.5 md:mx-4 bg-gray-300" />
              )}
            </StepperItem>
          ))}
        </Stepper>
      </div>
      <section className="flex flex-row gap-5 mt-5">
        <div className="flex-1 max-w-3/5 flex flex-col gap-3">
          <h1 className="text-2xl font-bold ">
            Booking Detail in Grand Hotel{" "}
          </h1>
          <span className="text-gray-600">
            To ensure a smoother check-in process, please enter the guest's name
            as it appears on their ID.
          </span>

          {currentStep == 1 && (
            <div className="flex flex-col gap-3">
              <div className="rounded-xl bg-white p-6 flex flex-col shadow-md">
                <span className="text-xl">Room {data?.roomType.roomType}</span>

                <span className="text-sm text-gray-400">
                  Cannot be refund or reschedule
                </span>
                <div className="text-sm">
                  <span className="flex flex-row gap-3 items-center text-gray-600 mt-2">
                    <User2Icon size={15} /> {guestNumberStr} Guest(s)
                  </span>
                  <div className="flex flex-row gap-3 py-1">
                    {data?.roomType.facilities ? (
                      data?.roomType.facilities.map(
                        (facility: any, index: any) => (
                          <div
                            key={index}
                            className="flex flex-col gap-1 text-gray-600"
                          >
                            <span
                              className="text-sm flex flex-row items-center gap-3"
                              key={index}
                            >
                              {facility.facility.name === "Wi-Fi" ? (
                                <Wifi size={15} />
                              ) : (
                                <IoWater />
                              )}{" "}
                              {facility.facility.name}
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </div>
              </div>
              <div className="shadow-md rounded-xl p-3 bg-white flex flex-row gap-2 items-center text-sm">
                <Image
                  src={AnnouncerLogo}
                  alt="Announcer Logo"
                  height={50}
                  width={50}
                />
                <div className="flex flex-col gap-1">
                  <span>Check the important information</span>
                  <span className="text-blue-500 font-bold">
                    See the details
                  </span>
                </div>
              </div>
              <div className="shadow-md rounded-xl p-5 bg-white flex flex-row gap-2 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-red-500">
                    IDR {totalPrice}
                  </span>
                </div>
                <Button
                  onClick={() => handleStepChange(2)}
                  className="bg-third text-white p-3 text-lg"
                >
                  Proceed
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mt-4 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Booking Summary
              </h3>

              <div className="grid grid-cols-2 gap-4 text-gray-600 w-full">
                <div className="flex items-center gap-2">
                  <CalendarCheck size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Check-in</p>
                    <p className="font-medium">
                      {checkInDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarCheck size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Check-out</p>
                    <p className="font-medium">
                      {checkOutDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Moon size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="font-medium">
                      {totalNight} night{totalNight > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Guests</p>
                    <p className="font-medium">{guestNumberStr} people</p>
                  </div>
                </div>

                <div className="col-span-2 flex flex-col gap-2 border-t pt-4  w-full">
                  <CreditCard size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Total Price</p>
                    <p className="font-semibold text-red-500 text-lg">
                      IDR {totalPrice}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 w-full ">
                    <Button
                      className="bg-third text-white w-full flex items-center gap-2"
                      onClick={handleBooking}
                    >
                      <CheckCircle size={18} />
                      Proceed to Payment
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      onClick={() => setCurrentStep(1)}
                    >
                      <ArrowLeft size={18} />
                      Back to Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="rounded-xl bg-white p-6 flex flex-col shadow-md h-fit">
          <div className="flex flex-row gap-3 items-center">
            <Image
              src={data?.roomType.roomImg!}
              alt="Room Image"
              width={100}
              height={50}
              className="rounded-xl"
            />
            <div className="flex flex-col gap-1">
              <span>Room Double</span>
              <span>No. 101</span>
            </div>
          </div>
          <hr className="mt-3" />
          <span className="text-sm mt-2">
            {formattedCheckIn} - {formattedCheckOut}
          </span>
          <span className="text-sm text-gray-400">
            {totalNight} Night • {guestNumberStr} Guest
          </span>
          <hr className="w-full h-2 mt-3" />
          <div className="w-full flex flex-row justify-between items-center">
            <span>Total</span>
            <span className="font-bold text-red-500">IDR {totalPrice}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
