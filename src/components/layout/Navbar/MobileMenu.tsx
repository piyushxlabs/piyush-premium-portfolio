"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/helpers/cn";
import { useQuantumNav } from "./QuantumNavContext";

interface MobileMenuProps {
  items: Array<{ href: string; label: string }>;
}

// Deterministic Constellation Mesh
function ConstellationMesh() {
  const nodes = useMemo(() => {
    const seed = 42;
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 40 }, (_, i) => ({
      x: seededRandom(seed + i) * 100,
      y: seededRandom(seed + i + 100) * 100,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full">
        {nodes.map((node, i) => (
          <circle key={i} cx={`${node.x}%`} cy={`${node.y}%`} r="1" fill="#22D3EE" />
        ))}
        {/* Simple connections */}
        {nodes.map((node, i) => (
          i % 3 === 0 && i < nodes.length - 1 && (
            <line
              key={`line-${i}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nodes[i + 1].x}%`}
              y2={`${nodes[i + 1].y}%`}
              stroke="#22D3EE"
              strokeWidth="0.5"
              opacity="0.3"
            />
          )
        ))}
      </svg>
    </div>
  );
}

export function MobileMenu({ items }: MobileMenuProps) {
  const { isMobileMenuOpen, closeMobileMenu } = useQuantumNav();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Stage 1: The Tear (Vertical Line) */}
          <motion.div
            key="tear-line"
            initial={{ scaleY: 0, width: "2px", height: "0%" }}
            animate={{ scaleY: 1, height: "100vh" }}
            exit={{ scaleY: 0, transition: { delay: 0.3 } }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-1/2 top-0 -translate-x-1/2 bg-cyan-400 z-[60] pointer-events-none lg:hidden"
          />

          {/* Stage 2: The Portal (Expansion) */}
          <motion.div
            key="portal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-[#000816] lg:hidden flex flex-col items-center justify-center overflow-hidden"
            style={{ originX: 0.5 }}
          >
            <ConstellationMesh />

            {/* Menu Links with Orbital Entrance */}
            <nav className="relative z-10 flex flex-col gap-6 items-center">
              {items.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{
                      opacity: 0,
                      x: Math.cos((i * 45 * Math.PI) / 180) * 100,
                      y: Math.sin((i * 45 * Math.PI) / 180) * 100,
                      rotate: i * 10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      delay: 0.4 + i * 0.08,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "relative text-2xl font-light tracking-wider transition-colors duration-300",
                        isActive ? "text-cyan-400 font-normal" : "text-slate-300 hover:text-white"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveRing"
                          className="absolute -inset-4 border border-cyan-500/30 rounded-full"
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 text-slate-500 text-xs uppercase tracking-[0.2em]"
            >
              System Online
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}