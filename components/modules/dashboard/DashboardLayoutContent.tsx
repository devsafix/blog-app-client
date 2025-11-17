import { ReactNode } from "react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/modules/dashboard/shared/Sidebar";
import { Header } from "@/components/modules/dashboard/shared/Header";
import { getUserPayload } from "@/lib/auth";

function PageSkeleton() {
  return (
    <div className="p-8 space-y-6 animate-pulse">
      <Skeleton className="h-12 w-1/2 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}

export default async function DashboardLayoutContent({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserPayload();

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 to-gray-100/50">
      <Sidebar user={user} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Suspense fallback={<Skeleton className="h-16 w-full border-b" />}>
          <Header user={user} />
        </Suspense>

        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<PageSkeleton />}>
            <div className="p-8 w-full">{children}</div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
