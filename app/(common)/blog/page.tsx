import { Suspense } from "react";
import { Metadata } from "next";
import { BlogPageSkeleton } from "@/components/modules/blog/BlogPageSkeleton";
import BlogPageContent from "@/components/modules/blog/BlogPageContent";

export const metadata: Metadata = {
  title: "All Blog Posts",
  description:
    "Browse all our latest articles, tutorials, and insights on technology, development, and more.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "All Blog Posts | DSX-B",
    description: "Browse all our latest articles, tutorials, and insights.",
    type: "website",
  },
};

type Props = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function BlogsPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <BlogPageContent searchParams={searchParams} />
    </Suspense>
  );
}
