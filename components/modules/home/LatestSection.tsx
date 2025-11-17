"use client";

import { PostsResponse } from "@/types";
import { PostCard } from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

interface LatestSectionProps {
  posts: PostsResponse;
}

export default function LatestSection({ posts }: LatestSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Latest Posts
            </h2>
            <p className="text-gray-600 text-lg">
              Fresh content from our writers
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex group">
            <Link href="/blog" className="flex items-center gap-2">
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {posts.data.length === 0 ? (
          <motion.div
            className="text-center py-20 bg-gray-50 rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 text-lg">
              No posts yet. Check back soon!
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {posts.data.map((post) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12 sm:hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild className="w-full max-w-xs">
                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-2"
                >
                  View All Posts
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
}
