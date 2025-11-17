import { ReactNode } from "react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/modules/dashboard/shared/Sidebar";
import { Header } from "@/components/modules/dashboard/shared/Header";
import { getUserPayload } from "@/lib/auth";

function PageSkeleton() {
  return (
    <div className="p-6">
      <Skeleton className="h-10 w-1/2 mb-6" />
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-48 w-full" />
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Suspense for user data */}
        <Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <Header user={user} />
        </Suspense>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<PageSkeleton />}>
            <div className="p-6">{children}</div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
