// PremiumBox – Ultra-smooth hover with consistent glow
"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/helpers/cn";

export interface PremiumBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "large" | "card";
  hover?: boolean;
  glow?: boolean;
}

export const PremiumBox = forwardRef<HTMLDivElement, PremiumBoxProps>(
  ({ className, children, variant = "default", hover = true, glow = false, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden group";
    
    const variantClasses = {
      default: "glass-premium rounded-2xl p-6 hover:border-accent-cyan/40 transition-colors duration-500",
      large: "glass-premium rounded-3xl p-8 md:p-10 hover:border-accent-cyan/40 transition-colors duration-500", 
      card: "glass-premium rounded-2xl p-8 hover:border-accent-cyan/40 transition-colors duration-500"
    };

    const hoverProps = hover ? {
      whileHover: { 
        y: -4,
        scale: 1.015,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      }
    } : {};

    return (
      <motion.div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        style={{
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: 1000,
          WebkitPerspective: 1000
        }}
        {...hoverProps}
        {...props}
      >
        {/* Consistent glow layer - always rendered, opacity controlled */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
            opacity: 0,
            transition: 'opacity 0.6s cubic-bezier(0.19, 1.0, 0.22, 1.0)',
            willChange: 'opacity'
          }}
          aria-hidden="true"
        />
        
        {/* Subtle gradient overlay for hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-accent-cyan/3 via-transparent to-accent-lavender/3 opacity-0 group-hover:opacity-100 pointer-events-none rounded-inherit"
          style={{
            transition: 'opacity 0.6s cubic-bezier(0.19, 1.0, 0.22, 1.0)',
            willChange: 'opacity'
          }}
          aria-hidden="true"
        />

        {/* Enhanced outer glow on hover */}
        {glow && (
          <div 
            className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 pointer-events-none rounded-inherit"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(167, 139, 250, 0.1))',
              filter: 'blur(20px)',
              transition: 'opacity 0.6s cubic-bezier(0.19, 1.0, 0.22, 1.0)',
              zIndex: -1
            }}
            aria-hidden="true"
          />
        )}
        
        {/* Content - Crystal clear text rendering */}
        <div 
          className="relative z-10"
          style={{ 
            transform: 'translate3d(0, 0, 0)',
            WebkitFontSmoothing: 'subpixel-antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {children}
        </div>
      </motion.div>
    );
  }
);

PremiumBox.displayName = "PremiumBox";