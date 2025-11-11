"use client";

import React from "react";
import { cn } from "@/utils/helpers/cn";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  gradient = false,
  align = "center",
  className,
}: SectionTitleProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("space-y-3", alignClasses[align], className)}>
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          gradient
            ? "bg-gradient-to-r from-accent-cyan via-accent-lavender to-accent-teal bg-clip-text text-transparent"
            : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-base text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
