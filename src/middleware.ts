import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/admin"];
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRaw = request.cookies.get("user")?.value ?? " ";
  let user;

  // Try parsing user cookie
  try {
    user = JSON.parse(userRaw);
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    user = null;
  }

  // Redirect to /login if no accessToken for private paths
  if (!accessToken && privatePaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to /admin/products if logged in as admin and accessing auth paths
  if (accessToken && authPaths.some((path) => pathname.startsWith(path))) {
    if (user?.roleName === "admin") {
      return NextResponse.redirect(new URL("/admin/products", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If accessing /admin but user role is not admin, redirect to /logout
  if (
    privatePaths.some((path) => pathname.startsWith(path)) &&
    user?.roleName !== "admin"
  ) {
    return NextResponse.redirect(new URL("/logout", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/admin/:path*"],
};
