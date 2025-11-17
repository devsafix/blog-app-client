"use client";

import { UserPayload } from "@/lib/auth";
import { logoutAction } from "@/actions/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  User as UserIcon,
  Settings,
  Bell,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function LogoutButton() {
  return (
    <form action={logoutAction} className="w-full">
      <Button
        type="submit"
        variant="ghost"
        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Log out
      </Button>
    </form>
  );
}

export function Header({ user }: { user: UserPayload }) {
  return (
    <motion.header
      className="h-16 shrink-0 flex items-center justify-between px-6 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left side - Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 rounded-full"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </Button>
        </motion.div>

        {/* Create New Post (Only for ADMIN) */}
        {user?.role === "ADMIN" && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              size="sm"
              className="shadow-sm hover:shadow-md transition-all"
            >
              <Link
                href="/dashboard/posts/new"
                className="flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">New Post</span>
              </Link>
            </Button>
          </motion.div>
        )}

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                className="flex items-center gap-3 hover:bg-gray-100 rounded-full px-2 py-1"
              >
                <Avatar className="w-8 h-8 ring-2 ring-gray-100">
                  <AvatarImage
                    src={
                      typeof user?.picture === "string"
                        ? user.picture
                        : undefined
                    }
                  />
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
                    {typeof user?.name === "string" ? (
                      user.name.substring(0, 2).toUpperCase()
                    ) : (
                      <UserIcon size={16} />
                    )}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-medium text-gray-700">
                  {typeof user?.name === "string" ? user.name : "User"}
                </span>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {typeof user?.name === "string" ? user.name : "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {typeof user?.email === "string" ? user.email : ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings"
                className="flex items-center cursor-pointer"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}
