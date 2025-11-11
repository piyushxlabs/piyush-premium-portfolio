"use client";

import React, { useEffect } from "react";
import { cn } from "@/utils/helpers/cn";
import { CloseIcon } from "@/components/icons/UIIcons/CloseIcon";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onOpenChange, title, children, className }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-xl border border-muted/20 bg-background-surface p-6 shadow-2xl",
          "animate-in fade-in-0 zoom-in-95 duration-300",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
          aria-label="Close modal"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Title */}
        {title && (
          <h2 id="modal-title" className="mb-4 text-xl font-semibold text-foreground">
            {title}
          </h2>
        )}

        {/* Content */}
        <div className="text-muted">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
