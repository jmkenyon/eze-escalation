import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const session = req.cookies.get("admin_session");

  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};