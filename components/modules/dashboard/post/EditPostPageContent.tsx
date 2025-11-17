import { getPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { EditPostForm } from "@/app/(dashboard)/dashboard/posts/edit/[id]/_components/EditPostForm";

type Props = {
  paramsPromise: Promise<{ id: string }>;
};

// Set dynamic metadata for the page
export async function generateMetadata({
  paramsPromise,
}: Props): Promise<Metadata> {
  const { id } = await paramsPromise;
  const post = await getPostById(id);
  return {
    title: `Edit: ${post?.title || "Post"}`,
  };
}

// The page component
export default async function EditPostPageContent({ paramsPromise }: Props) {
  const { id: idString } = await paramsPromise;

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

      <EditPostForm post={post} />
    </div>
  );
}
