import { Suspense } from "react";

import { PostsPageSkeleton } from "@/components/modules/dashboard/post/PostPageSkeleton";
import PostsPageContent from "@/components/modules/dashboard/post/PostsPageContent";

export const metadata = {
  title: "Manage Posts",
};

// --- Main Page Component ---
export default async function DashboardPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  return (
    <Suspense fallback={<PostsPageSkeleton />}>
      <PostsPageContent searchParamsPromise={searchParams} />
    </Suspense>
  );
}
