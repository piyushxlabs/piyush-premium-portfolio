"use client";

import React from "react";
import { cn } from "@/utils/helpers/cn";

interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className }: DividerProps) {
  return (
    <div className={cn("relative my-8", className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-muted/20" />
      </div>
      {label && (
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-sm text-muted">{label}</span>
        </div>
      )}
    </div>
  );
}

export default Divider;
