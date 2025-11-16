import { getAllPosts } from "@/lib/data";
import { BlogPagination } from "@/components/shared/Pagination";
import { Suspense } from "react";
import { Metadata } from "next";
import PostCardSkeleton from "@/components/shared/PostCardSkeleton";
import { PostCard } from "@/components/shared/PostCard";

export const metadata: Metadata = {
  title: "All Blog Posts | DSX-B",
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
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const postsPerPage = 9;

  const { data: posts, pagination } = await getAllPosts({
    page: currentPage,
    limit: postsPerPage,
  });

  return (
    <section className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            All Blog Posts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore {pagination.totalData} articles covering technology,
            development, design, and more
          </p>
        </header>

        {/* Posts Grid */}
        <Suspense
          key={currentPage}
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {Array.from({ length: postsPerPage }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg mb-4">
                No posts found for this page
              </p>
              {currentPage > 1 && (
                <p className="text-gray-400 text-sm">
                  Try going back to page 1
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Suspense>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <BlogPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            baseUrl="/blog"
          />
        )}
      </div>
    </section>
  );
}
