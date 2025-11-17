import { getPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { EditPostForm } from "@/app/(dashboard)/dashboard/posts/edit/[id]/_components/EditPostForm";
import { use } from "react";

type Props = {
  paramsPromise: Promise<{ id: string }>;
};

export default function EditPostPageContent({ paramsPromise }: Props) {
  const { id: idString } = use(paramsPromise);

  const id = Number(idString);
  if (isNaN(id)) {
    notFound();
  }

  // Note: This should be async in the actual implementation
  // For demo purposes, we'll assume post is fetched
  const post = use(getPostById(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 border-gray-200"
            >
              <Link href="/dashboard/posts">
                <ArrowLeft className="w-4 h-4" />
                Back to Posts
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Edit className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Edit Post</h1>
          <p className="text-gray-600 mt-1">Update your post content</p>
        </div>
      </div>

      <div>
        <EditPostForm post={post} />
      </div>
    </div>
  );
}
