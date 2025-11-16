import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-white">
      {/* Image Skeleton */}
      <Skeleton className="aspect-video w-full" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-3/5" />

        {/* Meta info */}
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>

        {/* Read more */}
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}
