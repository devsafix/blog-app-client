import { getUserPayload } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayoutContent({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserPayload();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">{children}</div>
    </div>
  );
}
