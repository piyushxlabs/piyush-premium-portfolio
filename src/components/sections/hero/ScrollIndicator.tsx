// ScrollIndicator — Animated scroll-down indicator with pulse
"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-sm text-muted font-medium">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-accent-cyan/40 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
          />
        </div>
        <ChevronDown size={20} className="text-accent-cyan" />
      </motion.div>
    </motion.div>
  );
}
