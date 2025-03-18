"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { IoPersonAddSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2).max(50).optional(),
});

function AuthForm({ formType }: { formType: "login" | "register" }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      formType === "register"
        ? { email: "", password: "", name: "" }
        : { email: "", password: "" },
  });

  async function onSubmit(values: any) {
    if (formType === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        return res.json().then((error) => alert(error.message));
      } else {
        return res.json().then((success) => alert(success.message));
      }
    } else {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (response?.error) return alert("Invalid credentials");
      router.push("/home");
    }
  }

  return (
    <div className="w-full p-16 text-fourth">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="py-6"
                    placeholder="youremail@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {formType === "register" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className="py-6" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="py-6" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full py-8 text-xl font-medium bg-third"
            type="submit"
          >
            <IoPersonAddSharp />{" "}
            {formType === "register" ? "Sign Up" : "Sign In"}
          </Button>
          <div className="text-center flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-500">
              {formType === "register"
                ? "I agree to abide by the Terms of Service and Privacy Policy"
                : "Forgot your password?"}
            </span>
            <span className="font-medium">
              {formType === "register" ? (
                <>
                  Already have an account?{" "}
                  <Link className="font-bold underline" href="/login">
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Link className="font-bold underline" href="/register">
                    Sign Up
                  </Link>
                </>
              )}
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AuthForm;
