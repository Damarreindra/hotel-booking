"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { date, z } from "zod";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { addDays, format, formatISO, parse } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z
  .object({
    checkIn: z.date(),
    checkOut: z.date(),
    guest: z.number().nonnegative().gte(1),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check Out date must be after Check In date",
    path: ["checkOut"],
  });
function HomeSearchForm() {
  const today = new Date(Date.now());
  const tomorrow = new Date(Date.now());
  const searchParams = useSearchParams();
  let checkInStr = searchParams.get("checkIn");
  let checkOutStr = searchParams.get("checkOut");
  let guestNumber = searchParams.get("guestNumber");
  const [isLoading, setIsLoading] = useState(true);

  let parsedCheckIn = parse(checkInStr!, "dd-MM-yyyy", new Date());
  let parsedCheckOut = parse(checkOutStr!, "dd-MM-yyyy", new Date());

  tomorrow.setDate(today.getDate() + 1);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkIn: today,
      checkOut: tomorrow,
      guest: 1,
    },
  });

  useEffect(() => {
    if (form) {
      form.setValue("checkIn", parsedCheckIn);
      form.setValue("checkOut", parsedCheckOut);
      form.setValue("guest", Number(guestNumber));
      setIsLoading(false);
    }
  }, [form]);

  const onSubmit = (values: any) => {
    const formattedCheckIn = format(values.checkIn, "dd-MM-yyyy");
    const formattedCheckOut = format(values.checkOut, "dd-MM-yyyy");

    const params = new URLSearchParams({
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      guestNumber: values.guest,
    });
    router.push(`/search?${params.toString()}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="py-2 px-6 border border-gray-200 flex items-center justify-center rounded-xl shadow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex mt-2 flex-row  items-center justify-between font-medium w-full"
        >
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Check In</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[320px] justify-start text-left font-normal py-6",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "LLL dd, y")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white z-50 rounded-xl border border-gray-200 shadow"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Check Out</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[320px] justify-start text-left font-normal py-6",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "LLL dd, y")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white z-50 rounded-xl border border-gray-200 shadow"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Guest Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                    className="py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="py-6  text-lg font-medium bg-third text-white"
            type="submit"
          >
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default HomeSearchForm;
