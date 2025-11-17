import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostSkeleton() {
  return (
    <article className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:pt-5">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-16 w-full mb-4" />
        <Skeleton className="h-12 w-3/4 mb-8" />

        <div className="flex gap-6 mb-8">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        <Skeleton className="aspect-video w-full rounded-2xl mb-16" />

        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </article>
  );
}
