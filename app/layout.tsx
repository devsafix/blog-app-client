import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "DSX-B | A modern, fast, and SEO-friendly blog built with Next.js 16.",
    template: "%s | DSX-B",
  },
  description: "A modern, fast, and SEO-friendly blog built with Next.js 16.",

  openGraph: {
    title: "DSX-B",
    description: "A modern, fast, and SEO-friendly blog built with Next.js 16.",
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
    description: "A modern, fast, and SEO-friendly blog built with Next.js 16.",
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
      <body className={`${inter.className}`}>
        <main>{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
