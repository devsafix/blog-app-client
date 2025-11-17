import DashboardLayoutContent from "@/components/modules/dashboard/DashboardLayoutContent";
import { DashboardLayoutSkeleton } from "@/components/modules/dashboard/DashboardLayoutSkeleton";
import { ReactNode } from "react";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<DashboardLayoutSkeleton />}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
