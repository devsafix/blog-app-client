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
import { Edit } from "lucide-react";
import Link from "next/link";
import { BlogPagination } from "@/components/shared/Pagination";

type Props = {
  posts: Post[];
  pagination: {
    page: number;
    totalPages: number;
  };
};

export function PostsDataTable({ posts, pagination }: Props) {
  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No posts found.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    {post.isFeatured ? (
                      <Badge>Featured</Badge>
                    ) : (
                      <Badge variant="outline">Published</Badge>
                    )}
                  </TableCell>
                  <TableCell>{post.views.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/posts/edit/${post.id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <DeletePostButton postId={post.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <BlogPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          baseUrl="/dashboard/posts"
        />
      </div>
    </>
  );
}
