"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/helpers/cn";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "large" | "premium";
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, variant = "default", hover = true, glow = false, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden group";
    
    const variantClasses = {
      default: "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-accent-cyan/30 transition-colors duration-500",
      large: "backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 hover:border-accent-cyan/30 transition-colors duration-500",
      premium: "backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-white/5 border border-white/20 rounded-2xl p-8 hover:from-white/15 hover:via-white/8 hover:to-white/8 hover:border-accent-cyan/40 transition-all duration-500"
    };

    const hoverProps = hover ? {
      whileHover: { 
        y: -8,
        scale: 1.01
      },
      transition: {
        duration: 0.6,
        ease: [0.19, 1.0, 0.22, 1.0] // Smooth easeOutExpo
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

GlassCard.displayName = "GlassCard";