import { Skeleton } from "@/components/ui/skeleton";

export function AuthLayoutSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
    </div>
  );
}
