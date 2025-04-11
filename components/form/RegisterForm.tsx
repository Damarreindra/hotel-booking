"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { IoPersonAddSharp } from "react-icons/io5";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().min(2).max(50),
  password: z.string().min(2).max(50),
});
function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/auth/register", {
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="py-6 "
                    placeholder="youremail@mail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="py-6 " placeholder="John Door" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="py-6 " type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full py-8 text-xl font-medium bg-third"
            type="submit"
          >
            <span>
              <IoPersonAddSharp />
            </span>{" "}
            Sign Up
          </Button>
          <div className=" text-center flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-500">
              I agree to abide by treact's Terms of Service and its Privacy
              Policy
            </span>
            <span className="font-medium">
              Already have an account?{" "}
              <Link className="font-bold underline" href={"/login"}>
                Sign In
              </Link>{" "}
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
