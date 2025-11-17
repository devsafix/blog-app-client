"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, Home } from "lucide-react";
import { UserPayload } from "@/lib/auth";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    role: "ADMIN",
  },
  {
    href: "/dashboard/posts",
    label: "Posts",
    icon: FileText,
    role: "ADMIN",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    role: "ANY",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export function Sidebar({ user }: { user: UserPayload }) {
  const pathname = usePathname();

  const filteredNavLinks = navLinks.filter((link) => {
    if (link.role === "ANY") return true;
    return user?.role === link.role;
  });

  return (
    <motion.aside
      className="w-64 shrink-0 border-r border-gray-200 bg-white"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Title */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Link href="/dashboard">
            <motion.h1
              className="text-2xl font-bold text-gray-900"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              DSX-
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                B
              </span>
            </motion.h1>
          </Link>
        </div>

        {/* Navigation */}
        <motion.nav
          className="flex-1 py-6 px-4 space-y-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredNavLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      !isActive && "group-hover:scale-110"
                    )}
                  />
                  <span className="font-medium">{link.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Footer Link */}
        <motion.div
          className="mt-auto p-4 border-t border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">View Main Site</span>
          </Link>
        </motion.div>
      </div>
    </motion.aside>
  );
}
