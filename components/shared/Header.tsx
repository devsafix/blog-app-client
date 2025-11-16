import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export const Header = () => {
  return (
    <header className="py-4 border-b sticky top-0 bg-white/80 backdrop-blur-sm z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900"
          aria-label="The Modern Blog - Homepage"
        >
          TheModern<span className="text-blue-600">Blog</span>
        </Link>

        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
