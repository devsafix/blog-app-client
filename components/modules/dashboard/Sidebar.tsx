"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, Home } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/posts", label: "Posts", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="flex flex-col h-full">
        {/* Logo/Title */}
        <div className="h-16 flex items-center justify-center border-b">
          <Link href="/dashboard" className="text-2xl font-bold text-gray-900">
            DSX-B <span className="text-blue-600">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Link */}
        <div className="mt-auto p-4 border-t">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">View Main Site</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
