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
import { Room, RoomType } from "@prisma/client";
import { IParams } from "@/types/IParams";
import { toast } from "sonner";
const formSchema = z.object({
  number: z.number().gt(1),
  roomTypeId: z.number(),
  price: z.number().gt(1),
});

function UpdateRoomForm({ id }: { id: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: 0,
      roomTypeId: 0,
      price: 100000,
    },
  });
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [room, setRoom] = useState();

  useEffect(() => {
    async function getRoom() {
      try {
        const res = await fetch(`/api/room/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch Room");
        }
        const data = await res.json();
        setRoom(data);

        form.reset({
          number: data.number || 0,
          roomTypeId: data.roomTypeId || "",
          price: data.price || 100000,
        });
      } catch (error) {
        console.error(error);
      }
    }
    getRoom();
  }, [id, form]);

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
    const res = await fetch(`/api/room/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      return res.json().then((error) => {
        alert(error.message);
      });
    }
    const data = await res.json();
    toast(data.message);
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
                  {room ? (
                    <Input
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                      className="py-6"
                    />
                  ) : (
                    <Input
                      {...field}
                      value={"Fetching Data..."}
                      className="py-6 bg-gray-100"
                      disabled
                    />
                  )}
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
                {roomTypes ? (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? String(field.value) : ""}
                    required
                  >
                    <FormControl className="py-6 w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {roomTypes?.map((roomType, index) => (
                        <SelectItem key={index} value={String(roomType.id)}>
                          {roomType.roomType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    {...field}
                    value={"Fetching Data..."}
                    className="py-6 bg-gray-100"
                    disabled
                  />
                )}

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
                  {room ? (
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                      className="py-6"
                    />
                  ) : (
                    <Input
                      {...field}
                      value={"Fetching Data..."}
                      className="py-6 bg-gray-100"
                      disabled
                    />
                  )}
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
            Update Room
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateRoomForm;
