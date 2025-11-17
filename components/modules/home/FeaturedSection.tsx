"use client";

import { Post } from "@/types";
import { PostCard } from "@/components/shared/PostCard";
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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

interface FeaturedSectionProps {
  posts: Post[];
}

export default function FeaturedSection({ posts }: FeaturedSectionProps) {
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
              Featured Articles
            </h2>
            <p className="text-gray-600 text-lg">
              Hand-picked stories worth reading
            </p>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
