import { cacheLife, cacheTag } from "next/cache";
import { Post, PostsResponse } from "@/types";

// 1. Get all posts with pagination
export async function getAllPosts({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  "use cache";
  cacheTag("posts");
  cacheLife("hours");

  const url = `${process.env.API_BASE_URL}/post?page=${page}&limit=${limit}`;

  try {
    const res = await fetch(url);

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
  cacheTag("posts", `post:${id}`);
  cacheLife("hours");

  const url = `${process.env.API_BASE_URL}/post/${id}`;

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
    const res = await fetch(url);

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
