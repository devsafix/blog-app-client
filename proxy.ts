import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Verifies the JWT token from the cookie.
 */
async function verifyAuth(token: string): Promise<boolean> {
  try {
    await jose.jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return false;
  }
}

/**
 * Configuration for route matching
 * Protects all dashboard routes
 */
export const config = {
  matcher: ["/dashboard/:path*"],
};

/**
 * Middleware function (renamed to 'proxy' for Next.js 16)
 * Protects authenticated routes by verifying JWT token
 */
export async function proxy(req: NextRequest) {
  const token = req.cookies.get("blogAppToken")?.value;
  const loginUrl = new URL("/login", req.url);

  // Add the original URL as a callback parameter for better UX
  loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

  // No token found - redirect to login
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  // Verify the token
  const isValid = await verifyAuth(token);

  if (!isValid) {
    // Invalid token - clear cookie and redirect
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("blogAppToken");
    return response;
  }

  // Token is valid - allow request to proceed
  return NextResponse.next();
}
