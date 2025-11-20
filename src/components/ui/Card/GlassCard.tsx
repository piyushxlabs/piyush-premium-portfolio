// GlassCard — Glassmorphism card with backdrop blur (Mobile Optimized)
"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/helpers/cn";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-premium rounded-2xl p-6 transition-colors duration-300 relative overflow-hidden",
          "md:hover:border-accent-cyan/40",
          className
        )}
        style={{ transform: 'translateZ(0)' }}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";
