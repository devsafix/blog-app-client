import { ReactNode } from "react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/modules/dashboard/Sidebar";
import { Header } from "@/components/modules/dashboard/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Suspense for user data */}
        <Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <Header />
        </Suspense>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
