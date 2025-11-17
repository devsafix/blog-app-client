import { EditPostPageSkeleton } from "@/components/modules/dashboard/post/EditPostPageSkeleton";
import EditPostPageContent from "@/components/modules/dashboard/post/EditPostPageContent";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
  paramsPromise: Promise<{ id: string }>;
};

// The page component
export default async function EditPostPage({ params }: Props) {
  return (
    <Suspense fallback={<EditPostPageSkeleton />}>
      <EditPostPageContent paramsPromise={params} />
    </Suspense>
  );
}
