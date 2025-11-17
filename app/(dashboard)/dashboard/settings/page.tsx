import { getUserProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types";
import { UserSettingsForm } from "./_components/UserSettingsForm";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your account settings and profile information",
};

function SettingsPageSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <Skeleton className="h-10 w-64 mb-3" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="max-w-2xl space-y-6 bg-white rounded-xl border border-gray-200 p-8">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-11 w-full" />
        </div>
        <Skeleton className="h-11 w-32" />
      </div>
    </div>
  );
}

async function SettingsPageContent() {
  const user = (await getUserProfile()) as User | null;

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Account Settings
        </h1>
        <p className="text-lg text-gray-600">
          Manage your profile information and preferences
        </p>
      </div>

      <UserSettingsForm user={user} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsPageSkeleton />}>
      <SettingsPageContent />
    </Suspense>
  );
}
