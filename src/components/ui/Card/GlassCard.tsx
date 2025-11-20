// GlassCard — Glassmorphism card (60fps Mobile Optimized)
"use client";

import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/utils/helpers/cn";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {}

// Perf: Memoized to prevent unnecessary re-renders
const GlassCardComponent = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-premium rounded-2xl p-6 transition-colors duration-300 relative overflow-hidden",
          "md:hover:border-accent-cyan/40",
          className
        )}
        // Perf: translate3d forces GPU acceleration without will-change overhead
        style={{ transform: 'translate3d(0, 0, 0)' }}
        {...props}
      />
    );
  }
);

GlassCardComponent.displayName = "GlassCard";

export const GlassCard = memo(GlassCardComponent);
