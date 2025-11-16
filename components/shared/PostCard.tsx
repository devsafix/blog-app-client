import { Post } from "@/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Eye, User, ArrowRight } from "lucide-react";

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <article className="group h-full border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden bg-white">
      {/* Thumbnail */}
      <Link
        href={`/blog/${post.id}`}
        className="relative aspect-video w-full overflow-hidden bg-gray-100"
      >
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}

        {/* Featured Badge Overlay */}
        {post.isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg">
              ⭐ Featured
            </Badge>
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col grow">
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 shrink-0" />
            <span className="truncate">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 shrink-0" />
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          {post.views > 0 && (
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 shrink-0" />
              <span>{post.views.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Excerpt */}
        <p className="text-gray-700 text-sm leading-relaxed grow line-clamp-3 mb-4">
          {post.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                #{tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Read More Link */}
        <Link
          href={`/blog/${post.id}`}
          className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all mt-auto"
        >
          Read article
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};
