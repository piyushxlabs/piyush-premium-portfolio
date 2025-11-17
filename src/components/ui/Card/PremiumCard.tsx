// PremiumCard — Unified premium card component with consistent styling
"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/helpers/cn";

export interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "heavy" | "glass";
  hover?: boolean;
  glow?: boolean;
}

export const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, variant = "default", hover = true, glow = false, children, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden transition-all duration-300 group";
    
    const variantClasses = {
      default: "glass-premium rounded-2xl p-6 hover:border-accent-cyan/40",
      heavy: "glass-heavy rounded-3xl p-8 md:p-12 hover:border-accent-cyan/40",
      glass: "bg-glass rounded-2xl p-6 border border-overlay-medium backdrop-blur-xl hover:border-accent-cyan/40"
    };

    const hoverClasses = hover ? "hover:scale-[1.02] hover:-translate-y-1" : "";
    const glowClasses = glow ? "hover:shadow-glow-shadow-hover" : "";

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
        {...props}
      >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

PremiumCard.displayName = "PremiumCard";