import { getAllPosts, getFeaturedPosts } from "@/lib/data";
import { Suspense } from "react";

import PostCardSkeleton from "@/components/shared/PostCardSkeleton";
import HeroSection from "@/components/modules/home/HeroSection";
import FeaturedSection from "@/components/modules/home/FeaturedSection";
import LatestSection from "@/components/modules/home/LatestSection";
import CTASection from "@/components/modules/home/CTASection";

export default async function HomePage() {
  const [featuredPosts, latestPosts] = await Promise.all([
    getFeaturedPosts(3),
    getAllPosts({ page: 1, limit: 6 }),
  ]);

  return (
    <div className="space-y-24 pb-20 relative">
      {/* Grid Background */}
    
     

      <HeroSection />

      {featuredPosts.length > 0 && (
        <Suspense
          fallback={
            <section className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            </section>
          }
        >
          <FeaturedSection posts={featuredPosts} />
        </Suspense>
      )}

      <Suspense
        fallback={
          <section className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          </section>
        }
      >
        <LatestSection posts={latestPosts} />
      </Suspense>

      <CTASection />
    </div>
  );
}
