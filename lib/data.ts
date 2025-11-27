import { cacheLife, cacheTag } from "next/cache";
import { Post, PostsResponse, User } from "@/types";
import { getUserPayload } from "./auth";
import { cookies } from "next/headers";

// 1. Get all posts with pagination
export async function getAllPosts({
  page = 1,
  limit = 10,
  sortBy = "desc",
}: {
  page?: number;
  limit?: number;
  sortBy?: "asc" | "desc";
}) {
  "use cache";
  cacheTag("posts");
  cacheLife("hours");

  const url = `${process.env.API_BASE_URL}/post?page=${page}&limit=${limit}&sortBy=${sortBy}`;

  try {
    const res = await fetch(url, {
      next: { tags: ["posts"] },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const postsData: PostsResponse = await res.json();
    return postsData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      data: [],
      pagination: { page: 1, limit: 10, totalData: 0, totalPages: 1 },
    };
  }
}

// 2. Get a single post by ID
export async function getPostById(id: string | number) {
  "use cache";
  cacheTag("post");
  cacheLife("days");

  const url = `${process.env.API_BASE_URL}/post/${id}`;

  console.log(url);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }

    const post: Post = await res.json();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// 3. Get all posts for sitemap
export async function getAllPostsForSitemap(): Promise<Post[]> {
  "use cache";
  cacheTag("sitemap");
  cacheLife("days");

  const url = `${process.env.API_BASE_URL}/post?page=1&limit=9999`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch posts for sitemap: ${res.statusText}`);
    }

    const postsData: PostsResponse = await res.json();
    return postsData.data;
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
    return [];
  }
}

// 4. Get featured posts for homepage
export async function getFeaturedPosts(limit: number = 6) {
  "use cache";
  cacheTag("posts-featured");
  cacheLife("hours");

  const url = `${process.env.API_BASE_URL}/post?page=1&limit=${limit}&isFeatured=true&sortBy=desc`;

  try {
    const res = await fetch(url, {
      next: { tags: ["posts-featured"] },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch featured posts: ${res.statusText}`);
    }

    const postsData: PostsResponse = await res.json();
    return postsData.data;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

// 5. THIS IS THE FUNCTION WE NEED
export async function searchPosts({
  search = "",
  tags = [],
  page = 1,
  limit = 9,
}: {
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}) {
  "use cache";
  cacheTag("posts", "search");

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) {
    params.set("search", search);
  }
  if (tags.length > 0) {
    params.set("tags", tags.join(","));
  }

  const url = `${
    process.env.API_BASE_URL
  }/post?${params.toString()}&sortBy=desc`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to search posts: ${res.statusText}`);
    }
    const postsData: PostsResponse = await res.json();
    return postsData;
  } catch (error) {
    console.error("Error searching posts:", error);
    return {
      data: [],
      pagination: { page: 1, limit: limit, totalData: 0, totalPages: 1 },
    };
  }
}

export async function getCachedUserProfile(
  userId: number,
  token: string | undefined
): Promise<User | null> {
  "use cache";
  cacheTag("user-profile");

  if (!token) {
    console.error("No auth token provided to getCachedUserProfile");
    return null;
  }

  const url = `${process.env.API_BASE_URL}/user/${userId}`;

  try {
    const res = await fetch(url, {
      headers: {
        Cookie: `blogAppToken=${token}`,
      },
      next: {
        tags: ["user-profile"],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user profile from cache");
    }
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.error("Error in getCachedUserProfile:", error);
    return null;
  }
}

export async function getUserProfile(): Promise<User | null> {
  const user = await getUserPayload();
  if (!user) return null;
  const token = (await cookies()).get("blogAppToken")?.value;
  return getCachedUserProfile(user.id as number, token);
}
