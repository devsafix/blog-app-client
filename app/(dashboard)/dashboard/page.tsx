import { Suspense } from "react";
import { DashboardPageSkeleton } from "@/components/modules/dashboard/DashboardPageSkeleton";
import DashboardPageContent from "@/components/modules/dashboard/DashboardPageContent";

export default async function DashboardPage() {
  return (
    <Suspense fallback={<DashboardPageSkeleton />}>
      <DashboardPageContent />
    </Suspense>
  );
}
