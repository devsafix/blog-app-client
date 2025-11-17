"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Post } from "@/types";
import { Badge } from "@/components/ui/badge";
import { DeletePostButton } from "./PostActions";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { BlogPagination } from "@/components/shared/Pagination";
import { motion } from "framer-motion";

type Props = {
  posts: Post[];
  pagination: {
    page: number;
    totalPages: number;
  };
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export function PostsDataTable({ posts, pagination }: Props) {
  return (
    <div className="space-y-6">
      <motion.div
        className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="font-semibold text-gray-700">
                Title
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  Views
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Date
                </div>
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <FileText className="w-12 h-12 text-gray-300" />
                    <p className="text-base">No posts found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post, index) => (
                <motion.tr
                  key={post.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900 max-w-md truncate">
                    {post.title}
                  </TableCell>
                  <TableCell>
                    {post.isFeatured ? (
                      <Badge className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                        Featured
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-gray-300">
                        Published
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {post.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Link href={`/dashboard/posts/edit/${post.id}`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                      </motion.div>
                      <DeletePostButton postId={post.id} />
                    </div>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Pagination */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <BlogPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            baseUrl="/dashboard/posts"
          />
        </motion.div>
      )}
    </div>
  );
}
