"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// --- Zod Schemas for Validation ---

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// --- Types for Action State ---

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const API_BASE_URL = process.env.API_BASE_URL;

// --- REGISTER ACTION ---

export async function registerAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Get and validate data
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Call the backend's 'createUser' endpoint
    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await res.json();

    if (!res.ok) {
      // Handle backend errors (e.g., "email already exists")
      return {
        success: false,
        message: data.message || "Registration failed. Please try again.",
      };
    }

    // 3. On success, return a success message
    return {
      success: true,
      message: "Registration successful! You can now log in.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unknown error occurred. Please try again.",
    };
  }
}

// --- LOGIN ACTION ---

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Get and validate data
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Call the backend's 'login' endpoint
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        success: false,
        message: data.message || "Invalid email or password.",
      };
    }

    // 3. *** IMPORTANT: Handle the cookie ***
    // The backend sends 'Set-Cookie'. We grab it
    // and set it for the Next.js app's domain.
    const setCookieHeader = res.headers.get("Set-Cookie");

    console.log(setCookieHeader);

    if (setCookieHeader) {
      // Parse the cookie string to get the value and attributes
      // A simple parse for 'blogAppToken=value;'
      const cookieValue = setCookieHeader.split(";")[0].split("=")[1];
      const maxAgeMatch = setCookieHeader.match(/Max-Age=(\d+)/);
      const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : undefined;

      if (cookieValue) {
        (await cookies()).set("blogAppToken", cookieValue, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          path: "/",
          maxAge: maxAge,
        });
      }
    } else {
      // This shouldn't happen based on our backend, but it's good to check
      return {
        success: false,
        message: "Login successful, but no auth token was provided.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unknown error occurred. Please try again.",
    };
  }

  // 4. On success, revalidate the root path and redirect
  revalidatePath("/");
  redirect("/dashboard"); // Redirect to the dashboard
}
