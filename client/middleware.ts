import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("buddy-session")?.value;
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/feed") || request.nextUrl.pathname.startsWith("/profile");

  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/feed/:path*", "/profile/:path*"],
};
