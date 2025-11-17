/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileText, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardStats {
  stats: {
    totalPosts: number;
    totalViews: number;
    avgViews: number;
  };
  featured: {
    count: number;
    topPost?: {
      views: number;
    };
  };
  lastWeekPostCount: number;
}

interface DashboardPageContentProps {
  userName: string;
  stats: DashboardStats | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

export default function DashboardPageContent({
  userName,
  stats,
}: DashboardPageContentProps) {
  const data = stats || {
    stats: { totalPosts: 0, totalViews: 0, avgViews: 0 },
    featured: { count: 0 },
    lastWeekPostCount: 0,
  };

  const statsList = [
    {
      title: "Total Posts",
      value: data.stats.totalPosts || 0,
      icon: FileText,
      change: `${data.lastWeekPostCount || 0} in last 7 days`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Views",
      value: (data.stats.totalViews || 0).toLocaleString(),
      icon: Eye,
      change: `Avg ${Math.round(data.stats.avgViews || 0)} per post`,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Featured Posts",
      value: data.featured.count || 0,
      icon: Star,
      change: `Top post: ${data.featured.topPost?.views || 0} views`,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Here&apos;s an overview of your blog performance
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {statsList.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card className="border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div
                  className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions or Recent Activity could go here */}
      <motion.div variants={itemVariants}>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Quick Stats Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Avg Views/Post</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(data.stats.avgViews || 0)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data.lastWeekPostCount || 0}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Featured</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data.featured.count || 0}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data.stats.totalPosts || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
