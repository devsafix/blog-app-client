import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// --- Table Skeleton ---
export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export function PostsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button disabled>Create Post</Button>
      </div>
      <TableSkeleton />
    </div>
  );
}
