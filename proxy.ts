import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// Get the JWT secret (must be available in the middleware)
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Verifies the JWT token from the cookie.
 */
async function verifyAuth(token: string) {
  try {
    await jose.jwtVerify(token, secret);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// 1. Define the routes you want to protect
export const config = {
  matcher: ["/dashboard/:path*"],
};

// 2. The middleware function
export async function proxy(req: NextRequest) {
  // 3. Get the token from the cookie
  const token = req.cookies.get("blogAppToken")?.value;
  const loginUrl = new URL("/login", req.url);

  if (!token) {
    // 4. If no token, redirect to login
    return NextResponse.redirect(loginUrl);
  }

  // 5. Verify the token
  const isValid = await verifyAuth(token);

  if (!isValid) {
    // 6. If invalid, redirect to login
    // Bonus: We can also clear the invalid cookie
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("blogAppToken");
    return response;
  }

  // 7. If valid, allow the request to proceed
  return NextResponse.next();
}
