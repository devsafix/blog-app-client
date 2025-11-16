import { getUserPayload } from "@/lib/auth";
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
import { LogOut, User as UserIcon } from "lucide-react";

// Server Component for Logout
function LogoutButton() {
  return (
    <form action={logoutAction} className="w-full">
      <Button
        type="submit"
        variant="ghost"
        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </form>
  );
}

// Main Header (Async Server Component)
export async function Header() {
  const user = await getUserPayload();

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b bg-white">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  typeof user?.picture === "string" ? user.picture : undefined
                }
              />
              <AvatarFallback className="bg-blue-100 text-blue-700">
                {typeof user?.name === "string" ? (
                  user.name.substring(0, 2).toUpperCase()
                ) : (
                  <UserIcon size={16} />
                )}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline font-medium">
              {typeof user?.name === "string" ? user.name : ""}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
