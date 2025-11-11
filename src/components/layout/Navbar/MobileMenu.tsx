// MobileMenu — Full-screen mobile menu with slide-in animation
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/helpers/cn";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ href: string; label: string }>;
}

export function MobileMenu({ isOpen, onClose, items }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-overlay-heavy backdrop-blur-xl z-40 md:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-background-surface border-l border-overlay-medium z-50 md:hidden"
          >
            <div className="flex flex-col h-full p-8 pt-24">
              <nav className="flex flex-col gap-2">
                {items.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block px-6 py-4 rounded-xl text-lg font-medium transition-all",
                          "hover:bg-overlay-light hover:text-accent-cyan",
                          isActive
                            ? "bg-overlay-light text-accent-cyan"
                            : "text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
