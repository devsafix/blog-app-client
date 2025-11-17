import { getUserProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types";
import { UserSettingsForm } from "./_components/UserSettingsForm";

export const metadata: Metadata = {
  title: "Account Settings",
};

// --- Skeleton for the settings page ---
function SettingsPageSkeleton() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <div className="space-y-8 max-w-2xl">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

// --- Page Content (fetches data) ---
async function SettingsPageContent() {
  // Fetch the full user profile
  const user = (await getUserProfile()) as User | null;

  if (!user) {
    notFound(); // Should be handled by middleware, but good practice
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <p className="text-gray-600">
        Update your profile information.
      </p>

      {/* Pass the user data to the client form */}
      <UserSettingsForm user={user} />
    </div>
  );
}

// --- Main Page Component (with Suspense) ---
export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsPageSkeleton />}>
      <SettingsPageContent />
    </Suspense>
  );
}