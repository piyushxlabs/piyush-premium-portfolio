import type { Metadata } from "next";

const siteUrl = "https://piyush.ai";
const siteTitle = "Piyush — Neural Horizon Portfolio";
const siteDescription =
  "Dive into Piyush's premium AI and data innovation portfolio — a Neural Horizon experience blending intelligent interfaces, storytelling, and founder-level ambition.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: "Piyush Premium Portfolio",
  authors: [{ name: "Piyush" }],
  creator: "Piyush",
  publisher: "Piyush",
  category: "portfolio",
  keywords: [
    "Piyush",
    "AI Portfolio",
    "Neural Horizon",
    "Cognitive Infinity",
    "Data Science",
    "Machine Learning",
    "Automation",
    "Next.js 15",
    "React",
    "Framer Motion",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    siteName: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Piyush Neural Horizon Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@piyush_ai",
    images: ["/images/og/og-default.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/brand/logo-icon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const structuredDataRoot = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Piyush",
  url: siteUrl,
  jobTitle: "AI Innovator & Founder in Training",
  description: siteDescription,
};
