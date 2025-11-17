"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function CTASection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    // Add your subscription logic here
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="max-w-4xl mx-auto px-4 relative">
      <motion.div
        className="relative bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700 rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/2" />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Miss an Update
          </h2>
          <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest articles delivered
            straight to your inbox
          </p>

          <motion.form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-shadow bg-white"
            />
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="whitespace-nowrap font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Subscribe
            </Button>
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
}
