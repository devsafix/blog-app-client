import { searchPosts } from "@/lib/data";
import { Suspense } from "react";
import { Post } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { PostsDataTable } from "./_components/PostsDataTable";
import { CreatePostButton } from "./_components/PostActions";

export const metadata = {
  title: "Manage Posts",
};

// --- Posts Table (Async Component) ---
async function PostsTable({ page, search }: { page: number; search: string }) {
  const postsResponse = await searchPosts({ page, search, limit: 10 });
  return (
    <PostsDataTable
      posts={postsResponse.data as Post[]}
      pagination={postsResponse.pagination}
    />
  );
}

// --- Table Skeleton ---
function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

// --- Main Page Component ---
export default async function DashboardPostsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const currentSearch = params?.search || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <CreatePostButton />
      </div>

      {/* TODO: Add search input for the admin table */}

      <Suspense
        key={`${currentPage}-${currentSearch}`}
        fallback={<TableSkeleton />}
      >
        <PostsTable page={currentPage} search={currentSearch} />
      </Suspense>
    </div>
  );
}
