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
          "glass-premium rounded-2xl p-6 hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden group",
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";
