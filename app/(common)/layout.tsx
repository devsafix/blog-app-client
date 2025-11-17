import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserPayload } from "@/lib/auth";
import { Suspense } from "react";

// --- 1. Create a Skeleton for the Navbar ---
function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="hidden md:flex items-center gap-20">
            {/* Skeleton for nav links */}
            <Skeleton className="h-6 w-48" />
            {/* Skeleton for login button */}
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </nav>
    </header>
  );
}

// --- 2. Create a Skeleton for the Page Content ---
function PageSkeleton() {
  return (
    <div className="container mx-auto py-8 grow">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}

// --- 3. Create a new component to load the Navbar dynamically ---
async function DynamicNavbar() {
  const user = await getUserPayload();
  return <Navbar user={user} />;
}

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<NavbarSkeleton />}>
        <DynamicNavbar />
      </Suspense>
      <Suspense fallback={<PageSkeleton />}>
        <main className="grow">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}
