import { getAllPosts, getFeaturedPosts } from "@/lib/data";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import PostCardSkeleton from "@/components/shared/PostCardSkeleton";
import { PostCard } from "@/components/shared/PostCard";
import CtaButton from "@/components/shared/CTAButton";

export default async function HomePage() {
  const [featuredPosts, latestPosts] = await Promise.all([
    getFeaturedPosts(3),
    getAllPosts({ page: 1, limit: 6 }),
  ]);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            Discover Stories That <span className="text-blue-600">Inspire</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Explore insightful articles, tutorials, and stories from our
            community of passionate writers
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/blog">
                Explore All Posts
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-8"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Articles
              </h2>
              <p className="text-gray-600 mt-2">
                Hand-picked stories worth reading
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                <PostCard post={post} />
              </Suspense>
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Latest Posts
            </h2>
            <p className="text-gray-600 mt-2">Fresh content from our writers</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex">
            <Link href="/blog" className="flex items-center gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {latestPosts.data.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.data.map((post) => (
                <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                  <PostCard post={post} />
                </Suspense>
              ))}
            </div>

            <div className="text-center mt-12 sm:hidden">
              <Button asChild>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 mx-auto w-full max-w-xs"
                >
                  View All Posts
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </section>

      {/* CTA Section */}
      <CtaButton />
    </div>
  );
}
