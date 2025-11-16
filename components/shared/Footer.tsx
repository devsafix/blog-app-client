import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-12 mt-16 border-t bg-gray-50">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">DSX-B</h3>
          <p className="text-gray-600 text-sm">
            A modern, fast, and SEO-friendly blog.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-10 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} TheModernBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
