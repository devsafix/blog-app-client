import { Post } from "@/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <article className="border rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* We'll add an Image component later */}
      {post.thumbnail && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          {/* Placeholder for Next/Image */}
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4 flex flex-col grow">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          By {post.author.name} on{" "}
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <p className="text-gray-800 text-sm grow">
          {post.content.substring(0, 120)}...
        </p>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${post.id}`}
          className="text-blue-600 font-medium mt-4 inline-block self-start"
        >
          Read more &rarr;
        </Link>
      </div>
    </article>
  );
};
