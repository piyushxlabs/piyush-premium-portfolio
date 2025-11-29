"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/utils/helpers/cn";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/lab", label: "Lab" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/connect", label: "Connect" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                  <path
                    d="M10 20 C10 10, 30 10, 30 20 C30 30, 10 30, 10 20"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="20" r="3" fill="url(#gradient)" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                      <stop offset="100%" stopColor="rgb(167, 139, 250)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Piyush
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  AI Innovator
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={cn(
                "w-6 h-0.5 bg-slate-200 rounded-full transition-all",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )} />
              <span className={cn(
                "w-6 h-0.5 bg-slate-200 rounded-full transition-all",
                isMobileMenuOpen && "opacity-0"
              )} />
              <span className={cn(
                "w-6 h-0.5 bg-slate-200 rounded-full transition-all",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 right-0 bottom-0 w-full max-w-sm bg-slate-950/95 backdrop-blur-xl border-l border-cyan-500/10 p-8">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-6 py-4 rounded-xl text-lg font-medium transition-all",
                      isActive
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 rounded-r-full bg-gradient-to-b from-cyan-400 to-purple-500" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}