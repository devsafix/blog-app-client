import { getPostById } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Eye, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post could not be found.",
    };
  }

  // Extract plain text from HTML content for meta description
  const plainText = post.content.replace(/<[^>]*>/g, "").substring(0, 160);

  return {
    title: post.title,
    description: plainText,
    keywords: post.tags,
    authors: [{ name: post.author.name }],

    openGraph: {
      title: post.title,
      description: plainText,
      url: `/blog/${post.id}`,
      type: "article",
      images: post.thumbnail ? [{ url: post.thumbnail, alt: post.title }] : [],
      publishedTime: post.createdAt,
      authors: [post.author.name],
      tags: post.tags,
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: plainText,
      images: post.thumbnail ? [post.thumbnail] : [],
    },

    alternates: {
      canonical: `/blog/${post.id}`,
    },
  };
}

// --- 2. THE PAGE COMPONENT ---
export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-5xl mx-auto px-4 md:pt-5">
          {/* Featured Badge */}
          {post.isFeatured && (
            <Badge className="mb-4 bg-amber-600 hover:bg-amber-700 text-white">
              ⭐ Featured Article
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            {/* Author */}
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={post.author.picture || undefined}
                  alt={post.author.name}
                />
                <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                  {post.author.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-500">{post.author.email}</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-300" />

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.createdAt} className="text-sm">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{readingTime} min read</span>
            </div>

            {/* Views */}
            {post.views > 0 && (
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm">
                  {post.views.toLocaleString()} views
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Bookmark className="w-4 h-4" />
              Save
            </Button>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {post.thumbnail && (
        <div className="max-w-5xl mx-auto px-4 mt-8 mb-16">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        <div
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:italic
            prose-img:rounded-xl prose-img:shadow-lg
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-6">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={post.author.picture || undefined}
                alt={post.author.name}
              />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-xl">
                {post.author.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.author.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {post.author.email}
              </p>
              {/* Add author bio here if available in your schema */}
            </div>
          </div>
        </div>

        {/* Related Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-base px-4 py-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
