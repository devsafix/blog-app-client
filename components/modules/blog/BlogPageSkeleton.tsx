// ... (keep all your imports)

import { BlogPostsGridSkeleton } from "./BlogPageContent";

// 1. CREATE THIS NEW SKELETON COMPONENT
export function BlogPageSkeleton({ count = 9 }: { count?: number }) {
  return (
    <section className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Skeleton Header */}
        <header className="mb-12 text-center md:text-left">
          <div className="h-10 md:h-12 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
        </header>

        {/* Skeleton Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="h-14 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Use your existing grid skeleton */}
        <BlogPostsGridSkeleton count={count} />
      </div>
    </section>
  );
}

// ... (keep BlogPostsGrid and BlogPostsGridSkeleton components)
