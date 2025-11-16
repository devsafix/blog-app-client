import { MetadataRoute } from "next";
import { getAllPostsForSitemap } from "@/lib/data";

// This file generates your sitemap.xml
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "http://localhost:3000";

  // 1. Get all your posts
  const posts = await getAllPostsForSitemap();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 2. Add your static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    // ... add /about, /privacy, etc.
  ];

  return [...staticUrls, ...postUrls];
}
