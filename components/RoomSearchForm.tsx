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
import React from "react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { addDays, format, formatISO } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

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
function RoomSearchForm() {
  const today = new Date(Date.now());
  const tomorrow = new Date(Date.now());
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
  const onSubmit = (values: any) => {
    const formattedCheckIn = format(values.checkIn, "dd-MM-yyyy");
    const formattedCheckOut = format(values.checkOut, "dd-MM-yyyy");

    const params = new URLSearchParams({
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      guest: values.guest,
    });
    router.push(`/home?${params.toString()}`);
  };
  return (
    <div className="px-96">
      <div className=" rounded-xl px-8 py-3 mt-12 border border-gray-200">
        <span className="font-medium text-fourth">
          Select Room Availability
        </span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex mt-2 flex-row gap-5 items-center justify-between"
          >
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-thin">Check In</FormLabel>
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
                      <PopoverContent className="w-auto p-0" align="start">
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
                  <FormLabel className="font-thin">Check Out</FormLabel>
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
                      <PopoverContent className="w-auto p-0" align="start">
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
                  <FormLabel className="font-thin">Guest Number</FormLabel>
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
              className="py-6 space-y-9 mb-2 text-lg font-medium bg-third"
              type="submit"
            >
              Search
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default RoomSearchForm;
