import { cacheTag } from "next/cache";
import { PostsResponse } from "@/types";

export async function getAllPosts({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  "use cache";
  cacheTag("posts");

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
