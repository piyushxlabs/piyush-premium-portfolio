// src/components/layout/Navbar/MobileMenu.tsx

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

function FloatingOrbs() {
  const orbs = Array.from({ length: 8 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

function NeuralLines() {
  const lines = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {lines.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)",
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
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
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
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
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
            style={{ touchAction: "none" }}
          />

          <motion.div
            key="menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 lg:hidden will-change-transform"
            style={{
              backgroundColor: "rgba(2, 6, 23, 0.95)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              touchAction: "pan-y",
            }}
            aria-modal="true"
            role="dialog"
          >
            <div className="absolute inset-0 border-l border-cyan-500/10" />
            
            <FloatingOrbs />
            <NeuralLines />

            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,211,238,0.05) 0%, transparent 50%, rgba(167,139,250,0.05) 100%)",
              }}
            />

            <div className="relative flex flex-col h-full overflow-y-auto overscroll-contain p-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mb-12 flex-shrink-0"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-lavender-400 bg-clip-text text-transparent mb-2">
                  Navigation
                </h2>
                <motion.div
                  className="h-1 w-20 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(34,211,238,0.8), rgba(167,139,250,0.8))",
                  }}
                  animate={{
                    width: ["80px", "120px", "80px"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              <nav className="flex flex-col gap-2 flex-1 flex-shrink-0">
                {items.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.4,
                        ease: [0.22, 0.9, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group relative block px-6 py-4 rounded-xl text-lg font-medium transition-all overflow-hidden",
                          isActive
                            ? "text-cyan-400"
                            : "text-slate-300 hover:text-cyan-400"
                        )}
                      >
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(167,139,250,0.1) 100%)",
                          }}
                        />

                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-xl"
                            animate={{
                              boxShadow: [
                                "inset 0 0 0px rgba(34,211,238,0.2)",
                                "inset 0 0 30px rgba(34,211,238,0.1)",
                                "inset 0 0 0px rgba(34,211,238,0.2)",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}

                        <span className="relative z-10 flex items-center justify-between">
                          <span>{item.label}</span>
                          <motion.span
                            className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            →
                          </motion.span>
                        </span>

                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 rounded-r-full"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(34,211,238,0.8), rgba(167,139,250,0.8))",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}

                        {!isActive && (
                          <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-3/4 rounded-r-full bg-cyan-400/30 group-hover:w-1 transition-all duration-300"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-auto pt-8 border-t border-cyan-500/10 flex-shrink-0"
              >
                <div
                  className="px-6 py-4 rounded-xl relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(167,139,250,0.05) 100%)",
                    border: "1px solid rgba(34,211,238,0.1)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      background: [
                        "radial-gradient(circle at 0% 0%, rgba(34,211,238,0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, rgba(167,139,250,0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, rgba(34,211,238,0.1) 0%, transparent 50%)",
                      ],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="relative text-sm text-slate-400 italic leading-relaxed">
                    "Building intelligence with empathy — one idea at a time."
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}