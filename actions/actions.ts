"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { getUserPayload, requireAdmin } from "@/lib/auth";

// --- Zod Schemas for Validation ---
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().or(z.literal("")),
  picture: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

// --- Types for Action State ---
export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const API_BASE_URL = process.env.API_BASE_URL;

// --- Enhanced Auth Headers Helper ---
async function getAuthHeaders(): Promise<HeadersInit> {
  const cookieStore = await cookies();
  const token = cookieStore.get("blogAppToken")?.value;

  return {
    "Content-Type": "application/json",
    ...(token && { Cookie: `blogAppToken=${token}` }),
  };
}

// --- ENHANCED LOGIN ACTION with callback URL support ---

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please check your inputs and try again.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let userRole: string | null = null; // 1. Variable to store the role

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
      cache: "no-store",
    });

    // 2. Get the JSON response body
    // Your backend controller returns { success, message, user }
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Invalid email or password. Please try again.",
      };
    }

    // Handle Set-Cookie header
    const setCookieHeader = res.headers.get("Set-Cookie");
    if (!setCookieHeader) {
      return {
        success: false,
        message: "Authentication failed. Please try again.",
      };
    }

    // Parse and set cookie
    const cookieParts = setCookieHeader.split(";");
    const cookieValue = cookieParts[0].split("=")[1];
    const maxAgeMatch = setCookieHeader.match(/Max-Age=(\d+)/);
    const maxAge = maxAgeMatch
      ? parseInt(maxAgeMatch[1], 10)
      : 7 * 24 * 60 * 60;

    if (cookieValue) {
      const cookieStore = await cookies();
      cookieStore.set("blogAppToken", cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        path: "/",
        maxAge,
      });
    }

    // 3. Get the role from the response data
    if (!data.user || !data.user.role) {
      return {
        success: false,
        message: "Login success, but user role was not returned.",
      };
    }
    userRole = data.user.role; // e.g., "ADMIN" or "USER"

    // Revalidate all user-related caches
    revalidateTag("user-profile", "max");
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Unable to connect to the server. Please try again later.",
    };
  }

  // 4. Conditional redirect (must be outside try/catch)
  if (userRole === "ADMIN") {
    redirect("/dashboard");
  } else {
    redirect("/dashboard/settings");
  }
}

// --- ENHANCED REGISTER ACTION ---
export async function registerAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please check your inputs and try again.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Handle specific error cases
      if (res.status === 409) {
        return {
          success: false,
          message: "This email is already registered. Please sign in instead.",
        };
      }
      return {
        success: false,
        message: data.message || "Registration failed. Please try again.",
      };
    }

    return {
      success: true,
      message: "Account created successfully! Please sign in to continue.",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Unable to connect to the server. Please try again later.",
    };
  }
}

// --- ENHANCED LOGOUT ACTION ---
export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("blogAppToken");

    // Clear all caches related to user data
    revalidateTag("user-profile", "max");
    revalidateTag("posts", "max");
  } catch (error) {
    console.error("Logout error:", error);
  }

  redirect("/login");
}

// --- DELETE POST ACTION ---
export async function deletePostAction(postId: number): Promise<FormState> {
  try {
    // Check authorization
    const user = await requireAdmin();
    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Not authorized." };
    }

    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/post/${postId}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        message: data.message || "Failed to delete post.",
      };
    }

    // Revalidate caches
    revalidateTag("posts", "max");
    revalidateTag("posts-featured", "max");
    revalidateTag("sitemap", "max");
    revalidatePath("/blog");
    revalidatePath("/dashboard");

    return { success: true, message: "Post deleted successfully." };
  } catch (error) {
    console.error("Delete post error:", error);
    return {
      success: false,
      message: "An error occurred while deleting the post.",
    };
  }
}

// --- CREATE POST ACTION ---
export async function createPostAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Check authorization
    const user = await requireAdmin();
    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Not authorized." };
    }

    // Parse tags (handle both comma-separated string and array)
    const tagsInput = formData.get("tags");
    let tags: string[] = [];

    if (typeof tagsInput === "string") {
      // Split by comma and clean up
      tags = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    } else if (Array.isArray(tagsInput)) {
      tags = tagsInput.filter((tag): tag is string => typeof tag === "string");
    }

    // Validate form data
    const validatedFields = postSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      thumbnail: formData.get("thumbnail") || "",
      isFeatured:
        formData.get("isFeatured") === "true" ||
        formData.get("isFeatured") === "on",
      tags,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Send data to backend
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/post`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...validatedFields.data,
        authorId: user.id,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        message: data.message || "Failed to create post.",
      };
    }

    // Revalidate caches
    revalidateTag("posts", "max");
    revalidateTag("posts-featured", "max");
    revalidateTag("sitemap", "max");
    revalidatePath("/blog");
    revalidatePath("/dashboard");

    return { success: true, message: "Post created successfully!" };
  } catch (error) {
    console.error("Create post error:", error);
    return {
      success: false,
      message: "An error occurred while creating the post.",
    };
  }
}

// --- UPDATE POST ACTION ---
export async function updatePostAction(
  postId: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Check authorization
    const user = await requireAdmin();
    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Not authorized." };
    }

    // Parse tags
    const tagsInput = formData.get("tags");
    let tags: string[] = [];

    if (typeof tagsInput === "string") {
      tags = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    // Validate form data
    const validatedFields = postSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      thumbnail: formData.get("thumbnail") || "",
      isFeatured:
        formData.get("isFeatured") === "true" ||
        formData.get("isFeatured") === "on",
      tags,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Send data to backend
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/post/${postId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        message: data.message || "Failed to update post.",
      };
    }

    // Revalidate caches

    revalidateTag(`post:${postId}`, "max");
    revalidateTag("posts", "max");
    revalidateTag("posts-featured", "max");
    revalidateTag("sitemap", "max");
    revalidatePath("/blog");
    revalidatePath(`/blog/${postId}`);
    revalidatePath("/dashboard");

    return { success: true, message: "Post updated successfully!" };
  } catch (error) {
    console.error("Update post error:", error);
    return {
      success: false,
      message: "An error occurred while updating the post.",
    };
  }
}

// --- TOGGLE FEATURED STATUS ACTION ---
export async function toggleFeaturedAction(
  postId: number,
  isFeatured: boolean
): Promise<FormState> {
  try {
    const user = await getUserPayload();
    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Not authorized." };
    }

    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/post/${postId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isFeatured }),
    });

    if (!res.ok) {
      return { success: false, message: "Failed to update post." };
    }

    // Revalidate caches
    revalidateTag(`post:${postId}`, "max");
    revalidateTag("posts", "max");
    revalidateTag("posts-featured", "max");
    revalidateTag("sitemap", "max");
    revalidatePath("/blog");
    revalidatePath(`/blog/${postId}`);
    revalidatePath("/dashboard");

    return {
      success: true,
      message: isFeatured ? "Post featured!" : "Post unfeatured!",
    };
  } catch (error) {
    console.error("Toggle featured error:", error);
    return { success: false, message: "An error occurred." };
  }
}

export async function updateUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // 1. Get user and validate auth
    const user = await getUserPayload();
    if (!user) {
      return { success: false, message: "Not authorized." };
    }

    // 2. Validate form data
    const validatedFields = profileSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      picture: formData.get("picture"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // 3. Send data to backend PATCH /user/:id endpoint
    const headers = await getAuthHeaders(); // Your helper function
    const res = await fetch(`${API_BASE_URL}/user/${user.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        message: data.message || "Failed to update profile.",
      };
    }

    revalidateTag("user-profile", "max");
    revalidatePath("/dashboard");

    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    console.error("Update profile error:", error);
    return {
      success: false,
      message: "An error occurred while updating your profile.",
    };
  }
}
