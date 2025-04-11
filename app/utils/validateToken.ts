import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: NextRequest) {
  const authHeader = await req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(verified);

    if (verified) {
      return null;
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Token not valid" }));
  }
}
