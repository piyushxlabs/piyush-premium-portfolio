// src/components/layout/Navbar/NavItem.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/helpers/cn";

interface NavItemProps {
  href: string;
  label: string;
}

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link href={href} className="relative group">
      <motion.div
        className={cn(
          "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden",
          isActive
            ? "text-cyan-400"
            : "text-slate-300 hover:text-cyan-400"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(167,139,250,0.1) 100%)",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
          animate={{
            boxShadow: [
              "0 0 0px rgba(34, 211, 238, 0)",
              "0 0 20px rgba(34, 211, 238, 0.2)",
              "0 0 0px rgba(34, 211, 238, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <span className="relative z-10">{label}</span>

        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), rgba(167,139,250,0.8), transparent)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        <AnimatePresence>
          {!isActive && (
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full bg-cyan-400/50 group-hover:w-3/4 transition-all duration-300"
              initial={{ width: 0 }}
              whileHover={{ width: "75%" }}
              exit={{ width: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
        }}
      />
    </Link>
  );
}
