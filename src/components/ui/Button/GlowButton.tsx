// GlowButton — Premium CTA button with animated gradient glow
"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/helpers/cn";

export interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-2xl px-10 py-4 font-heading font-bold text-lg overflow-hidden transition-all duration-300",
          "bg-gradient-to-r from-accent-cyan via-accent-lavender to-accent-cyan bg-[length:200%_100%]",
          "hover:bg-[position:100%_0] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "shadow-[0_0_40px_rgba(34,211,238,0.4)]",
          className
        )}
        {...props}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Pulsing glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-lavender opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
        
        <span className="relative z-10 text-background flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";
