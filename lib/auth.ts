import "server-only"; // Ensures this code *never* runs on the client
import { cookies } from "next/headers";
import * as jose from "jose";

// 1. Get the JWT secret from environment variables
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Verifies the 'blogAppToken' cookie and returns the payload.
 * Throws an error if the token is invalid or missing.
 */
export async function verifyAuth() {
  const token = (await cookies()).get("blogAppToken")?.value;

  if (!token) {
    throw new Error("Missing auth token");
  }

  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    throw new Error("Invalid auth token");
  }
}

/**
 * A safe way to get the user payload.
 * Returns the payload if valid, or null if not.
 */
export async function getUserPayload() {
  try {
    const payload = await verifyAuth();
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}
