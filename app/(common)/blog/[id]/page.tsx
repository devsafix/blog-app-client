import { Suspense } from "react";
import BlogPostContent from "@/components/modules/blog/BlogPostContent";
import { BlogPostSkeleton } from "@/components/modules/blog/BlogPostSkeleton";

type Props = {
  params: Promise<{ id: string }>;
};

// Main page component
export default async function BlogPostPage({ params }: Props) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}
