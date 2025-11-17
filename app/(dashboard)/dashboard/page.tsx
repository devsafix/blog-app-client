import { getUserPayload } from "@/lib/auth";
import { Suspense } from "react";
import DashboardPageContent from "@/components/modules/dashboard/DashboardPageContent";
import { DashboardPageSkeleton } from "@/components/modules/dashboard/DashboardPageSkeleton";

async function getStats() {
  const url = `${process.env.API_BASE_URL}/post/stats`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600, tags: ["stats"] },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function DashboardDataLoader() {
  const [user, stats] = await Promise.all([getUserPayload(), getStats()]);

  const userName = typeof user?.name === "string" ? user.name : "Guest";

  return <DashboardPageContent userName={userName} stats={stats} />;
}

export default async function DashboardPage() {
  return (
    <Suspense fallback={<DashboardPageSkeleton />}>
      <DashboardDataLoader />
    </Suspense>
  );
}
