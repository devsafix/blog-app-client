"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function HeroSection() {
  return (
    <section className="pt-16 pb-10 md:pt-20 md:pb-16 text-center relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
      />
      <motion.div
        className="max-w-4xl mx-auto px-4 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight"
          variants={fadeInUp}
        >
          Discover Stories That{" "}
          <span className="text-blue-600 relative inline-block">
            Inspire
            <motion.div
              className="absolute bottom-1 left-0 right-0 h-3 bg-blue-100 -z-10"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          Explore insightful articles, tutorials, and stories from our community
          of passionate writers
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          variants={fadeInUp}
        >
          <Button
            asChild
            size="lg"
            className="text-base px-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link href="/blog" className="flex items-center gap-2">
              Explore All Posts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-base px-8 border-2"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
