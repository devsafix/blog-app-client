import { getAllPosts } from "@/lib/data";
import { PostCard } from "@/components/modules/home/PostCard";
import { Suspense } from "react";
import PostCardSkeleton from "@/components/modules/home/PostCardSkeleton";

export default async function HomePage() {
  const postsResponse = await getAllPosts({ page: 1, limit: 6 });
  const posts = postsResponse.data;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Welcome to <span className="text-blue-600">DSX-B</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover insightful articles, tutorials, and stories from our
          community of writers
        </p>
      </div>

      {/* Latest Posts Section */}
      <div>
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No posts found. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                <PostCard post={post} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
