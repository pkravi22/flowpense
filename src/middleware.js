import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // npm i jsonwebtoken

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Public routes (no auth needed)
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // Read JWT from cookie
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ Verify JWT (must use SAME secret as backend)
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    // Role-based access
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/user") && decoded.role !== "user") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // ✅ allow access
  } catch (err) {
    console.error("JWT error:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Protect only user/admin routes
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
