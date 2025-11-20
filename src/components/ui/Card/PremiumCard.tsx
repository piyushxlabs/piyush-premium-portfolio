// PremiumCard — Unified premium card (60fps Mobile Optimized)
"use client";

import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/utils/helpers/cn";

export interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "heavy" | "glass";
  hover?: boolean;
  glow?: boolean;
}

// Perf: Memoized to prevent re-renders during scroll
const PremiumCardComponent = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, variant = "default", hover = true, glow = false, children, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden transition-colors duration-300";
    
    const variantClasses = {
      default: "glass-premium rounded-2xl p-6 md:hover:border-accent-cyan/40",
      heavy: "glass-heavy rounded-3xl p-8 md:p-12 md:hover:border-accent-cyan/40",
      glass: "bg-glass rounded-2xl p-6 border border-overlay-medium backdrop-blur-xl md:hover:border-accent-cyan/40"
    };

    // Perf: Reduced transform intensity for smoother mobile performance
    const hoverClasses = hover ? "md:hover:scale-[1.005] md:hover:-translate-y-0.5" : "";
    const glowClasses = glow ? "md:hover:shadow-glow-shadow-hover" : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          hoverClasses,
          glowClasses,
          className
        )}
        // Perf: translate3d + no will-change = GPU acceleration without layer overhead
        style={{ transform: 'translate3d(0, 0, 0)' }}
        {...props}
      >
        {/* Perf: Removed gradient overlay - causes extra compositing layer */}
        
        {/* Content */}
        <div className="relative">
          {children}
        </div>
      </div>
    );
  }
);

PremiumCardComponent.displayName = "PremiumCard";

export const PremiumCard = memo(PremiumCardComponent);