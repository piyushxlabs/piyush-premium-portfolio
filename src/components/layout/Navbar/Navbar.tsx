// src/components/layout/Navbar/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/helpers/cn";
import { NavItem } from "./NavItem";
import { MobileMenu } from "./MobileMenu";
import { NavLogo } from "./NavLogo";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-2xl border-b border-cyan-500/10 shadow-[0_8px_32px_rgba(34,211,238,0.1)]"
            : "bg-transparent"
        )}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(34,211,238,0.03) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(167,139,250,0.03) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(34,211,238,0.03) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <NavLogo />

            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <NavItem href={item.href} label={item.label} />
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                  backgroundColor: isMobileMenuOpen
                    ? "rgb(34, 211, 238)"
                    : "rgb(226, 232, 240)",
                }}
                transition={{ duration: 0.3, ease: [0.22, 0.9, 0.36, 1] }}
                className="w-6 h-0.5 rounded-full origin-center"
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  scale: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 rounded-full bg-slate-200"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                  backgroundColor: isMobileMenuOpen
                    ? "rgb(34, 211, 238)"
                    : "rgb(226, 232, 240)",
                }}
                transition={{ duration: 0.3, ease: [0.22, 0.9, 0.36, 1] }}
                className="w-6 h-0.5 rounded-full origin-center"
              />

              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{
                  boxShadow: isMobileMenuOpen
                    ? "0 0 20px rgba(34, 211, 238, 0.3)"
                    : "0 0 0px rgba(34, 211, 238, 0)",
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.9, 0.36, 1] }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), rgba(167,139,250,0.5), transparent)",
          }}
        />
      </motion.nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navItems}
      />
    </>
  );
}
