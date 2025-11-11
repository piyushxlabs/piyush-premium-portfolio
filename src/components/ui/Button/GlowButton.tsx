// GlowButton — CTA button with animated gradient glow
"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/helpers/cn";

export interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-heading font-semibold text-lg overflow-hidden transition-all duration-normal",
          "bg-gradient-to-r from-accent-cyan to-accent-lavender",
          "hover:shadow-glow hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <span className="relative z-10 text-background">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-accent-lavender to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-slow" />
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";
