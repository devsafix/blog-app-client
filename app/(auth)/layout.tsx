import { getUserPayload } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 1. Check if the user is already logged in
  const user = await getUserPayload();

  // 2. If they are, redirect them to the dashboard
  if (user) {
    redirect("/dashboard");
  }

  // 3. If not, show the login/register page in a centered layout
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
