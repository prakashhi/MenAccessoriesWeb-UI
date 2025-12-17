import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  const userToken = req.cookies.get("User_token")?.value;

  const protectedRoutes = [
    "/admin/Dashboard",
    "/admin/Orders",
    "/admin/products",
    "/admin",
  ];
  // const userProtected = ["/AccountInfo", "/Wishlist", "/Cart"];
  const userProtected = ["/AccountInfo", "/Wishlist"];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // user check
  if (userProtected.some((path) => path.startsWith(path)) && !userToken) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/adminLogin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/AccountInfo/:path*",
    "/Wishlist/:path*",
  ],
};
