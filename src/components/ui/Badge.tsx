"use client";

import React from "react";
import { cn } from "@/utils/helpers/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "gradient";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        {
          "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20": variant === "default",
          "border border-muted/30 text-muted": variant === "outline",
          "bg-gradient-to-r from-accent-cyan to-accent-lavender text-white": variant === "gradient",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
