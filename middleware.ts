import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/login",
    error: "/error",
  },
})


// this config basically defines ki kin routes pr middleware ko chalna hai, we can define manually also all the required routes 
export const config = {
  matcher : [
    // this below expression tells that run the middleware on all the expect the below one - it is basically default snippt for middleware
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};