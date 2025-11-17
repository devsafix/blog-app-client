import { getPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditPostForm } from "./_components/EditPostForm";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// Set dynamic metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);
  return {
    title: `Edit: ${post?.title || "Post"}`,
  };
}

// The page component
export default async function EditPostPage({ params }: Props) {
  const { id: idString } = await params;

  const id = Number(idString);
  if (isNaN(id)) {
    notFound();
  }

  console.log(id);

  // Fetch the post data on the server
  const post = await getPostById(id);

  // If no post, show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="outline" size="sm" className="gap-2">
        <Link href="/dashboard/posts">
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </Link>
      </Button>

      <h1 className="text-3xl font-bold">Edit Post</h1>

      {/* Pass the server-fetched post data down to the
        Client Component form.
      */}
      <EditPostForm post={post} />
    </div>
  );
}
