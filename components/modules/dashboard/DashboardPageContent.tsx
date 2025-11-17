import { getUserPayload } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileText, User } from "lucide-react";
import { Suspense } from "react";
import { StatCardSkeleton } from "./DashboardPageSkeleton";

async function getStats() {
  const url = `${process.env.API_BASE_URL}/post/stats`;
  try {
    const res = await fetch(url, {
      // Use a short revalidation time for stats
      next: { revalidate: 3600, tags: ["stats"] },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// --- Stat Cards Component (fetches data) ---
async function StatCards() {
  const data = await getStats();
  const stats = data?.stats || {};
  const featured = data?.featured || {};

  const statsList = [
    {
      title: "Total Posts",
      value: stats.totalPosts || 0,
      icon: FileText,
      change: `${data?.lastWeekPostCount || 0} in last 7 days`,
    },
    {
      title: "Total Views",
      value: (stats.totalViews || 0).toLocaleString(),
      icon: Eye,
      change: `Avg ${Math.round(stats.avgViews || 0)} per post`,
    },
    {
      title: "Featured Posts",
      value: featured.count || 0,
      icon: User,
      change: `Top post has ${featured.topPost?.views || 0} views`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsList.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// --- Main Dashboard Page Content ---
export default async function DashboardPageContent() {
  const user = await getUserPayload();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Welcome back, {typeof user?.name === "string" ? user.name : ""}
      </h1>
      <p className="text-lg text-gray-600">
        Here&apos;s a quick overview of your blog.
      </p>

      {/* Stats Cards */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        }
      >
        <StatCards />
      </Suspense>
    </div>
  );
}
