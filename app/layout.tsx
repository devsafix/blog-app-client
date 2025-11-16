import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DSX-B | DSX-B website",
    template: "%s | DSX-B",
  },
  description: "A modern, fast, and SEO-friendly blog built with Next.js.",

  openGraph: {
    title: "DSX-B",
    description: "A modern, fast, and SEO-friendly blog built with Next.js.",
    url: "http://localhost:3000", // TODO: Change this to your production URL
    siteName: "DSX-B",
    images: [
      {
        url: "https://nextjs.org/static/images/twitter-card-blog.png",
        width: 610,
        height: 610,
        alt: "DSX-B",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSX-B",
    description: "A modern, fast, and SEO-friendly blog built with Next.js.",
    site: "@nextjs",
    images: [
      {
        url: "https://nextjs.org/static/images/twitter-card-blog.png",
        width: 610,
        height: 610,
        alt: "DSX-B",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* We'll add a real Header and Footer here soon */}
        <header className="py-4 border-b">
          <nav className="container mx-auto">
            <h1 className="text-2xl font-bold">My Blog</h1>
          </nav>
        </header>

        <main className="container mx-auto py-8">{children}</main>

        <footer className="py-8 mt-12 border-t">
          <p className="text-center text-gray-500">
            © 2025 My Blog. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
