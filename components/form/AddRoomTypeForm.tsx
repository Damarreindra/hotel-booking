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

import { Input } from "@/components/ui/input";
import { baseUrl } from "@/app/utils/baseUrl";
import { Facility, RoomType } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
const formSchema = z.object({
  facilities: z.number().array(),
  type: z.string(),
  img: z.string(),
});

function AddRoomTypeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facilities: [],
      type: "",
      img: "",
    },
  });
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    async function getFacility() {
      const res = await fetch(`/api/facility`);
      if (!res.ok) {
        throw new Error("Failed to fetch facilities");
      }
      const data: { facilities: Facility[] } = await res.json();
      setFacilities(data.facilities);
    }
    getFacility();
  }, []);

  const uploadImage = async () => {
    if (!image) {
      toast("Please select an image first!");
      return;
    }
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "tutorial");
    data.append("cloud_name", "dttd52ltg");
    try {
      const resp = await fetch(
        "https://api.cloudinary.com/v1_1/dttd52ltg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await resp.json();
      return result.secure_url; // Return the uploaded image URL
    } catch (err) {
      console.error("Upload failed:", err);
      toast("Upload failed!");
      return null;
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const uploadedImageUrl = await uploadImage();
    if (!uploadedImageUrl) {
      return;
    }
    const updatedValues = { ...values, img: uploadedImageUrl };
    const res = await fetch("/api/room-type", {
      method: "POST",
      body: JSON.stringify(updatedValues),
    });
    if (!res.ok) {
      return res.json().then((error) => {
        toast(error.message);
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(event) => field.onChange(event.target.value)}
                    className="py-6"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facilities</FormLabel>
                {facilities.length == 0 ? (
                  <Spinner size="small" />
                ) : (
                  <div className="grid gap-2">
                    {facilities.map((facility) => (
                      <FormControl key={facility.id}>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`facility-${facility.id}`}
                            checked={field.value.includes(facility.id)}
                            onCheckedChange={(checked) => {
                              const newFacilities = checked
                                ? [...field.value, facility.id]
                                : field.value.filter(
                                    (id) => id !== facility.id
                                  );
                              field.onChange(newFacilities);
                            }}
                          />
                          <label
                            htmlFor={`facility-${facility.id}`}
                            className="text-sm font-medium"
                          >
                            {facility.name}
                          </label>
                        </div>
                      </FormControl>
                    ))}
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormLabel htmlFor="picture">Picture</FormLabel>
            <Input
              accept="image/png, image/jpeg, image/jpg"
              id="picture"
              type="file"
              onChange={(event) => {
                const file = event.target.files;
                if (file && file?.length > 0) {
                  setImage(file[0]);
                  setPreview(URL.createObjectURL(file[0]));
                }
              }}
            />
          </div>

          {preview && (
            <div>
              <span>Image Preview</span>
              <img src={preview} alt="Preview" className=" rounded" />
            </div>
          )}
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

export default AddRoomTypeForm;
