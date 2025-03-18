import { sendEmailVerif } from "@/lib/email";
import { IAuth } from "@/types/IAuth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password }: IAuth = await req.json();
    if (!email || !name || !password) {
      return new NextResponse(
        JSON.stringify({
          message: "Email, Name, and Password field are required",
        }),
        { status: 400 }
      );
    }

    if (name.length < 8) {
      return new NextResponse(
        JSON.stringify({
          message: "Name character minimum are 8",
        }),
        { status: 400 }
      );
    }

    const existedUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existedUser) {
      return new NextResponse(
        JSON.stringify({ message: "Email is already used" }),
        { status: 400 }
      );
    }

    const encryptPassword = await bcrypt.hash(password, 12);
    const verifToken = crypto.randomUUID();

    await prisma.user.create({
      data: {
        email,
        name,
        password: encryptPassword,
        verificationToken: verifToken,
      },
    });
    await sendEmailVerif(email, verifToken);
    return new NextResponse(JSON.stringify({ message: "Register Success" }), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
