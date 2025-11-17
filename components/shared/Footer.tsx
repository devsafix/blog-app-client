import Link from "next/link";
import { Facebook, Twitter, Github, Linkedin } from "lucide-react";

const footerLinks = {
  pages: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
  resources: [
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Support" },
    { href: "https://devsafix.vercel.app/", label: "Developer" },
  ],
};

const socialLinks = [
  { href: "https://github.com/devsafix", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/devsafix/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/devsafix",
    icon: Facebook,
    label: "Facebook",
  },
  { href: "https://x.com/devsafix", icon: Twitter, label: "Twitter" },
];

export const Footer = () => {
  const currentYear = 2026;

  return (
    <footer className="border-t bg-gray-50 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 py-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 inline-block mb-4"
            >
              DSX-<span className="text-blue-600">B</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              A modern, fast, and SEO-friendly blog platform built with Next.js.
              Share your stories and connect with readers worldwide.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Stay Updated</h4>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} DSX-B. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  target="_blank"
                  key={social.label}
                  href={social.href}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
