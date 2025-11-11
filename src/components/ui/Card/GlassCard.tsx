// GlassCard — Glassmorphism card with backdrop blur
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
          "rounded-2xl bg-glass border border-overlay-medium backdrop-blur-xl p-6",
          "transition-all duration-normal hover:bg-glass-heavy hover:shadow-glow-soft",
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";
