// src/components/layout/Navbar/NavLogo.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function NavLogo() {
  return (
    <Link
      href="/"
      aria-label="Piyush — Home"
      className="relative inline-flex items-center gap-3 group"
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(167,139,250,0.1) 100%)",
            border: "1px solid rgba(34,211,238,0.2)",
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(34,211,238,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(167,139,250,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(34,211,238,0.2) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <svg
            viewBox="0 0 40 40"
            className="w-6 h-6 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M10 20 C10 10, 30 10, 30 20 C30 30, 10 30, 10 20"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="20"
              cy="20"
              r="3"
              fill="url(#gradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                <stop offset="100%" stopColor="rgb(167, 139, 250)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>

      <div className="flex flex-col">
        <motion.span
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-lavender-400 bg-clip-text text-transparent"
          style={{ lineHeight: 1.2 }}
        >
          Piyush
        </motion.span>
        <motion.span
          className="text-[10px] text-slate-500 uppercase tracking-wider font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI Innovator
        </motion.span>
      </div>

      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: [
            "0 0 0px rgba(34, 211, 238, 0)",
            "0 0 20px rgba(34, 211, 238, 0.1)",
            "0 0 0px rgba(34, 211, 238, 0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </Link>
  );
}