import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "DSX-B | A modern, fast, and SEO-friendly blog built with Next.js.",
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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="container mx-auto py-8 grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
