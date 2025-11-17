import AuthLayoutContent from "@/components/modules/auth/AuthLayoutContent";
import { AuthLayoutSkeleton } from "@/components/modules/auth/AuthLayoutSkeleton";
import { ReactNode, Suspense } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<AuthLayoutSkeleton />}>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </Suspense>
  );
}
