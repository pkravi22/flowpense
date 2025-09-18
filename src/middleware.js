import { NextResponse } from "next/server";
//import jwt from "jsonwebtoken"; // npm install jsonwebtoken

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // 🔹 STEP 1: Bypass toggle (set true to skip auth)
  const BYPASS_AUTH = true; // change to false when you want real auth

  // 🔹 STEP 2: If bypass is enabled → allow access
  if (BYPASS_AUTH) {
    console.log("⚠️ Auth bypass enabled - Dev mode only!");
    return NextResponse.next();
  }

  // 🔹 STEP 3: Allow public routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // 🔹 STEP 4: Get JWT token from cookies
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // 🔹 STEP 5: Hardcode JWT secret
    const decoded = jwt.verify(token, "my_secret_key"); // <-- secret directly here

    // 🔹 STEP 6: Role-based access
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/user") && decoded.role !== "user") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ Everything good → allow request
    return NextResponse.next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// 🔹 STEP 7: Protect only admin/user routes
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
