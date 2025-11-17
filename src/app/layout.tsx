import type { Metadata } from "next";
import Script from "next/script";
import { Fira_Code, Inter, Sora } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { cn } from "@/utils/helpers/cn";

import { siteMetadata, structuredDataRoot } from "./metadata";
import { BackgroundEffects } from "@/components/layout/BackgroundEffects";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { PageLoader } from "@/components/layout/PageLoader";
import { ReadingProgress } from "@/components/ui/ReadingProgress";

const headingFont = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={cn(
          "relative min-h-screen bg-background text-foreground antialiased",
          headingFont.variable,
          bodyFont.variable,
          monoFont.variable,
        )}
      >
        <ThemeProvider>
          <PageLoader />
          <ReadingProgress />
          <BackgroundEffects />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 relative z-10">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
        <Script
          id="site-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataRoot),
          }}
        />
      </body>
    </html>
  );
}
