// ThemeToggle — dark/light switch using next-themes
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/utils/helpers/cn";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-3 py-2",
        "glass-panel hover:ring-glow transition-colors duration-fast",
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="size-4 text-accent-cyan transition-transform group-hover:rotate-12" />
      ) : (
        <Moon className="size-4 text-accent-lavender transition-transform group-hover:-rotate-12" />
      )}
      <span className="text-xs text-muted">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
