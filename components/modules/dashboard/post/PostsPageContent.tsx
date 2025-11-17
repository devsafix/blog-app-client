import { searchPosts } from "@/lib/data";
import { Suspense } from "react";
import { Post } from "@/types";
import { TableSkeleton } from "./PostPageSkeleton";
import { PostsDataTable } from "@/app/(dashboard)/dashboard/posts/_components/PostsDataTable";
import { CreatePostButton } from "@/app/(dashboard)/dashboard/posts/_components/PostActions";
import { BlogSearchInput } from "../../blog/BlogSearchInput";

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

// --- Main Page Component ---
export default async function PostsPageContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParamsPromise;
  const currentPage = Number(params?.page) || 1;
  const currentSearch = params?.search || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <CreatePostButton />
      </div>

      <BlogSearchInput initialSearch={currentSearch} />

      <Suspense
        key={`${currentPage}-${currentSearch}`}
        fallback={<TableSkeleton />}
      >
        <PostsTable page={currentPage} search={currentSearch} />
      </Suspense>
    </div>
  );
}
