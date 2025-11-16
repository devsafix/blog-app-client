import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="border rounded-xl shadow-sm flex flex-col overflow-hidden bg-white">
      {/* Thumbnail */}
      <Skeleton className="aspect-video w-full" />

      <div className="p-6 flex flex-col grow">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-6 w-1/2 mb-4" />

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Excerpt */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-4" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}
