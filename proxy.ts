import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Verifies the JWT token from the cookie.
 */
async function verifyAuth(token: string): Promise<jose.JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
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
  const payload = await verifyAuth(token);

  if (!payload) {
    // Invalid token - clear cookie and redirect
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("blogAppToken");
    return response;
  }

  // --- 4. NEW LOGIC: Role-based security ---
  const isAdmin = payload.role === "ADMIN";
  const { pathname } = req.nextUrl;

  // Define which routes are for ADMINS ONLY
  const isAccessingAdminRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/posts");

  // If the user is NOT an admin AND is trying to access an admin route
  if (!isAdmin && isAccessingAdminRoute) {
    // Redirect them to the settings page, the only page they can see
    const settingsUrl = new URL("/dashboard/settings", req.url);
    return NextResponse.redirect(settingsUrl);
  }

  // Token is valid - allow request to proceed
  return NextResponse.next();
}
