import "server-only";
import { cookies } from "next/headers";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyAuth() {
  // FIX: Removed 'await' from cookies()
  const token = (await cookies()).get("blogAppToken")?.value || "";

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

export async function getUserPayload() {
  try {
    const payload = await verifyAuth();
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function requireAdmin() {
  try {
    const payload = await verifyAuth();
    if (payload.role !== "ADMIN") {
      throw new Error("Not authorized");
    }
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}
