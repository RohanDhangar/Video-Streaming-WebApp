import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        if
          (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true
        }

        if
          (
          pathname === "/" ||
          pathname.startsWith("/api/video")
        ) {
          return true;
        }

        return !!token;
      },
    },
  }
);


// this config basically defines ki kin routes pr middleware ko chalna hai, we can define manually also all the required routes 
export const config = {
  matcher: [
    // this below expression tells that run the middleware on all the expect the below one - it is basically default snippt for middleware
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};