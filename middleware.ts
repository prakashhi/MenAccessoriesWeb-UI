import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userToken = req.cookies.get("User_token")?.value;

  // const Usercheck = ["/AccountInfo", "/Wishlist", "/Cart","/*"];
  const userProtected = [""];

  // user check
  // if (userProtected.some((path) => path.startsWith(path)) && !userToken) {
  //   return NextResponse.redirect(new URL("/Login", req.url));
  // }

  // return NextResponse.next();
}

export const config = {
  // matcher: ["/AccountInfo/:path*"],
};
