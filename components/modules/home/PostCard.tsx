import { Post } from "@/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Eye, User } from "lucide-react";

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <article className="group border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden bg-white">
      {/* Thumbnail */}
      {post.thumbnail && (
        <Link
          href={`/blog/${post.id}`}
          className="relative aspect-video w-full overflow-hidden"
        >
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 800vw, (max-width: 1200px) 40vw, 28vw"
          />
        </Link>
      )}

      <div className="p-6 flex flex-col grow">
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          {post.views > 0 && (
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          )}
        </div>

        {/* Excerpt */}
        <p className="text-gray-700 text-sm leading-relaxed grow line-clamp-2 mb-4">
          {post.content.substring(0, 150)}...
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Featured Badge */}
        <div className="flex items-center justify-between mt-4">
          {post.isFeatured && (
            <div>
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                ⭐ Featured
              </Badge>
            </div>
          )}

          {/* Read More Link */}
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all group-hover:text-blue-700"
          >
            Read article
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};
