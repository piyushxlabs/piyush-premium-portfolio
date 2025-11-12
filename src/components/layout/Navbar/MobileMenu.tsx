// MobileMenu — Full-screen mobile menu with slide-in animation
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/utils/helpers/cn";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ href: string; label: string }>;
}

// Floating particles background
function FloatingParticles() {
  const particles = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent-cyan rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-10, -50],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

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
            className="fixed inset-0 bg-gradient-to-br from-black/80 via-slate-900/70 to-transparent backdrop-blur-xl z-40 md:hidden"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="fixed top-0 left-0 bottom-0 w-[80vw] max-w-sm bg-white/5 backdrop-blur-lg border-r border-white/10 z-50 md:hidden"
            aria-modal="true"
            role="dialog"
          >
            {/* Floating particles */}
            <FloatingParticles />

            {/* Light beam gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 via-transparent to-accent-lavender/5 pointer-events-none" />

            <div className="relative flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-heading font-bold bg-gradient-to-r from-accent-cyan to-accent-lavender bg-clip-text text-transparent">
                  Piyush
                </h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-accent-cyan/10 transition-colors"
                  aria-label="Close Menu"
                >
                  <motion.div
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <X size={24} className="text-accent-cyan" />
                  </motion.div>
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-3 flex-1">
                {items.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block px-6 py-3 rounded-full text-base font-medium transition-all relative group",
                          "border border-cyan-400/30 hover:border-cyan-400/60",
                          "hover:bg-gradient-to-r hover:from-accent-cyan/10 hover:to-accent-lavender/10",
                          isActive && "bg-gradient-to-r from-accent-cyan/20 to-accent-lavender/20 border-accent-cyan/60"
                        )}
                      >
                        <span className={cn(
                          "transition-all",
                          isActive ? "bg-gradient-to-r from-accent-cyan to-accent-lavender bg-clip-text text-transparent" : "text-foreground group-hover:bg-gradient-to-r group-hover:from-accent-cyan group-hover:to-accent-lavender group-hover:bg-clip-text group-hover:text-transparent"
                        )}>
                          {item.label}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mini Bio Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: items.length * 0.08 + 0.2 }}
                  className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-center"
                >
                  <p className="text-sm tracking-wide text-cyan-200">
                    AI Innovator & Future Founder
                  </p>
                </motion.div>
              </nav>

              {/* Footer Quote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: items.length * 0.08 + 0.4 }}
                className="mt-auto pt-6 border-t border-white/10"
              >
                <p className="text-xs text-muted/60 italic text-center leading-relaxed">
                  "Designing intelligence that empowers people — one idea at a time."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
