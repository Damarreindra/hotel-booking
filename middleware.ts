import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedRoutes = ["/dashboard", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (isAdminRoute) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }
  const authRoutes = ["/register", "/login"];
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  const res = NextResponse.next();

  // Tambahkan header CORS ke response
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/register",
    "/login",
    "/api/:path*",
  ],
};
