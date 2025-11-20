// PremiumCard — Unified premium card component (Mobile Performance Optimized)
"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/helpers/cn";

export interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "heavy" | "glass";
  hover?: boolean;
  glow?: boolean;
}

export const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, variant = "default", hover = true, glow = false, children, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden transition-colors duration-300";
    
    const variantClasses = {
      default: "glass-premium rounded-2xl p-6 md:hover:border-accent-cyan/40",
      heavy: "glass-heavy rounded-3xl p-8 md:p-12 md:hover:border-accent-cyan/40",
      glass: "bg-glass rounded-2xl p-6 border border-overlay-medium backdrop-blur-xl md:hover:border-accent-cyan/40"
    };

    // Desktop-only hover effects using media query classes
    const hoverClasses = hover ? "md:hover:scale-[1.01] md:hover:-translate-y-0.5" : "";
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
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
        {...props}
      >
        {/* Desktop-only hover gradient overlay */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Content */}
        <div className="relative">
          {children}
        </div>
      </div>
    );
  }
);

PremiumCard.displayName = "PremiumCard";