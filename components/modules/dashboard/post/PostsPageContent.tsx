import { searchPosts } from "@/lib/data";
import { Suspense, use } from "react";
import { Post } from "@/types";
import { PostsDataTable } from "@/app/(dashboard)/dashboard/posts/_components/PostsDataTable";
import { CreatePostButton } from "@/app/(dashboard)/dashboard/posts/_components/PostActions";
import { FileText } from "lucide-react";
import { TableSkeleton } from "./PostPageSkeleton";

async function PostsTable({ page, search }: { page: number; search: string }) {
  const postsResponse = await searchPosts({ page, search, limit: 10 });
  return (
    <PostsDataTable
      posts={postsResponse.data as Post[]}
      pagination={postsResponse.pagination}
    />
  );
}

export default function PostsPageContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ page?: string; search?: string }>;
}) {
  const params = use(searchParamsPromise);
  const currentPage = Number(params?.page) || 1;
  const currentSearch = params?.search || "";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Posts</h1>
            <p className="text-gray-600 mt-1">Manage your blog content</p>
          </div>
        </div>
        <CreatePostButton />
      </div>

      {/* Search */}
  

      {/* Table */}
      <div>
        <Suspense
          key={`${currentPage}-${currentSearch}`}
          fallback={<TableSkeleton />}
        >
          <PostsTable page={currentPage} search={currentSearch} />
        </Suspense>
      </div>
    </div>
  );
}
