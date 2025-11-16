import { cache } from "react";
import { PostsResponse } from "@/types";

export const getAllPosts = cache(
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const url = `${process.env.API_BASE_URL}/post?page=${page}&limit=${limit}`;

    try {
      const res = await fetch(url, {
        next: {
          revalidate: 3600,
          tags: ["posts"],
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.statusText}`);
      }

      const postsData: PostsResponse = await res.json();
      return postsData;
    } catch (error) {
      console.error(error);
      return {
        data: [],
        pagination: { page: 1, limit: 10, totalData: 0, totalPages: 1 },
      };
    }
  }
);
