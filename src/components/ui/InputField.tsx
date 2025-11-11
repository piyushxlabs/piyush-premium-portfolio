"use client";

import React from "react";
import { cn } from "@/utils/helpers/cn";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  className?: string;
}

export function InputField({ label, error, success, className, ...props }: InputFieldProps) {
  return (
    <div className="relative">
      {label && (
        <label className="mb-2 block text-sm font-medium text-muted">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full rounded-lg border bg-background-surface px-4 py-2.5 text-foreground transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
          {
            "border-muted/20 focus:border-accent-cyan focus:ring-accent-cyan/20": !error && !success,
            "border-red-500/50 focus:border-red-500 focus:ring-red-500/20": error,
            "border-green-500/50 focus:border-green-500 focus:ring-green-500/20": success,
          },
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

export default InputField;
