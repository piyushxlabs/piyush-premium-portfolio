// NavItem — Individual navigation link with hover glow
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/helpers/cn";

interface NavItemProps {
  href: string;
  label: string;
}

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-fast",
        "hover:text-accent-cyan hover:bg-overlay-light",
        isActive
          ? "text-accent-cyan bg-overlay-light"
          : "text-foreground"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />
      )}
    </Link>
  );
}
