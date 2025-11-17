import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLayoutSkeleton() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Skeleton className="w-64 shrink-0 border-r" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Skeleton className="h-16 w-full shrink-0 border-b" />
        <main className="flex-1 overflow-y-auto p-6">
          <Skeleton className="h-10 w-1/2 mb-6" />
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-48 w-full" />
        </main>
      </div>
    </div>
  );
}
