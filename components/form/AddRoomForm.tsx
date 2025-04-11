"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  IoAdd,
  IoAddCircle,
  IoAddOutline,
  IoPersonAddSharp,
} from "react-icons/io5";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/app/utils/baseUrl";
import { RoomType } from "@prisma/client";
const formSchema = z.object({
  number: z.number().gt(1),
  roomTypeId: z.number(),
  price: z.number().gt(1),
});

function AddRoomForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: 0,
      roomTypeId: 0,
      price: 100000,
    },
  });
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  useEffect(() => {
    async function getRoomType() {
      const res = await fetch(`/api/room-type`);
      if (!res.ok) {
        throw new Error("Failed to fetch Room Type");
      }
      const data: { roomTypes: RoomType[] } = await res.json();
      setRoomTypes(data.roomTypes);
    }
    getRoomType();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/room", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      return res.json().then((error) => {
        alert(error.message);
      });
    }
    const data = await res.json();
    alert(data.message);
  }
  return (
    <div className="w-full p-16 text-fourth">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                    className="py-6"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roomTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type</FormLabel>
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                  value={String(field.value)}
                  required
                >
                  <FormControl className="py-6 w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {roomTypes.map((roomType, index) => (
                      <SelectItem key={index} value={String(roomType.id)}>
                        {roomType.roomType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Price</FormLabel>
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
            className="w-full py-8 text-xl font-medium bg-third text-white"
            type="submit"
          >
            <span className="font-bold">
              <IoAddOutline />
            </span>{" "}
            Add Room
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddRoomForm;
