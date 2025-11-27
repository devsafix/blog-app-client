import { searchPosts } from "@/lib/data";
import { PostCard } from "@/components/shared/PostCard";
import PostCardSkeleton from "@/components/shared/PostCardSkeleton";
import { BlogPagination } from "@/components/shared/Pagination";
import { BlogSearchInput } from "@/components/modules/blog/BlogSearchInput";
import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";

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

export default async function BlogPageContent({ searchParams }: Props) {
  // Await searchParams to fix Next.js 15+ requirement
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const searchQuery = params?.search?.trim() || "";
  const postsPerPage = 9;

  return (
    <section className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {searchQuery ? (
              <>
                Search Results for{" "}
                <span className="text-blue-600">&quot;{searchQuery}&quot;</span>
              </>
            ) : (
              "All Blog Posts"
            )}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {searchQuery
              ? "Discover articles matching your search"
              : "Explore our collection of articles covering technology, development, design, and more"}
          </p>
        </header>

        {/* Search Input */}
        <BlogSearchInput initialSearch={searchQuery} />

        {/* Posts Grid with Suspense */}
        <Suspense
          key={`${currentPage}-${searchQuery}`}
          fallback={<BlogPostsGridSkeleton count={postsPerPage} />}
        >
          <BlogPostsGrid
            page={currentPage}
            limit={postsPerPage}
            search={searchQuery}
          />
        </Suspense>
      </div>
    </section>
  );
}

// Separate async component for fetching posts
async function BlogPostsGrid({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) {
  const { data: posts, pagination } = await searchPosts({
    page,
    limit,
    search,
  });

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100 mb-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {search ? "No posts found" : "No posts yet"}
          </h3>
          <p className="text-gray-500 mb-6">
            {search
              ? `We couldn't find any articles matching "${search}". Try different keywords.`
              : "Check back soon for new content!"}
          </p>
          {search && (
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to all posts
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Results count */}
      <div className="mb-6 text-sm text-gray-600">
        Showing {posts.length} of {pagination.totalData} articles
        {search && ` for "${search}"`}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <BlogPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          baseUrl="/blog"
          searchQuery={search}
        />
      )}
    </>
  );
}

// Loading skeleton component
export function BlogPostsGridSkeleton({ count }: { count: number }) {
  return (
    <>
      <div className="mb-6">
        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {Array.from({ length: count }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
