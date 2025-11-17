import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
    "./src/data/**/*.{json}",
    "./public/**/*.{svg}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "3rem",
        "2xl": "4rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        background: "var(--color-bg-primary)",
        "background-surface": "var(--color-bg-surface)",
        foreground: "var(--color-text-primary)",
        muted: "var(--color-text-muted)",
        "muted-foreground": "var(--color-text-muted)",
        border: "var(--color-border)",
        ring: "var(--color-ring)",
        accent: {
          DEFAULT: "var(--color-accent-primary)",
          cyan: "var(--color-accent-primary)",
          lavender: "var(--color-accent-secondary)",
          teal: "var(--color-accent-tertiary)",
          indigo: "var(--color-accent-indigo)",
          glow: "var(--color-accent-glow)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
        overlay: {
          light: "var(--layer-overlay-light)",
          medium: "var(--layer-overlay-medium)",
          heavy: "var(--layer-overlay-heavy)",
        },
        slate: {
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        purple: {
          500: "#a855f7",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.5rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 24px 60px rgba(15, 23, 42, 0.35)",
        glow: "0 0 40px rgba(34, 211, 238, 0.45)",
        "glow-soft": "0 0 60px rgba(167, 139, 250, 0.35)",
        "inner-soft": "inset 0 1px 12px rgba(255, 255, 255, 0.06)",
      },
      backgroundImage: {
        neural: "var(--gradient-neural)",
        infinity: "var(--gradient-infinity)",
        depth: "var(--gradient-depth)",
        glow: "var(--gradient-glow)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "aurora-flow": "linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(167, 139, 250, 0.08) 50%, rgba(20, 184, 166, 0.06) 100%)",
        "cinematic-depth": "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.05) 0%, transparent 70%)",
        "atmospheric-glow": "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, rgba(167, 139, 250, 0.1) 50%, transparent 100%)",
      },
      transitionTimingFunction: {
        smooth: "var(--animation-ease)",
      },
      transitionDuration: {
        fast: "var(--animation-duration-fast)",
        normal: "var(--animation-duration-normal)",
        slow: "var(--animation-duration-slow)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(34, 211, 238, 0.0)" },
          "50%": { boxShadow: "0 0 32px rgba(34, 211, 238, 0.35)" },
        },
        "float-slow": {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(12px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(12px) rotate(-360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up var(--animation-duration-normal) var(--animation-ease)",
        "scale-in": "scale-in var(--animation-duration-fast) var(--animation-ease)",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        orbit: "orbit 18s linear infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".bg-glass": {
          "background-color": "var(--layer-overlay-light)",
          "border": "1px solid var(--layer-overlay-medium)",
          "backdrop-filter": "blur(18px)",
        },
        ".bg-glass-heavy": {
          "background-color": "var(--layer-overlay-medium)",
          "border": "1px solid var(--layer-overlay-heavy)",
          "backdrop-filter": "blur(28px)",
        },
        ".glass-premium": {
          "background": "rgba(255, 255, 255, 0.08)",
          "border": "1px solid rgba(255, 255, 255, 0.12)",
          "backdrop-filter": "blur(24px) saturate(180%)",
          "box-shadow": "0 8px 32px rgba(0, 0, 0, 0.12)",
        },
        ".glass-heavy": {
          "background": "rgba(15, 23, 42, 0.6)",
          "border": "1px solid rgba(34, 211, 238, 0.2)",
          "backdrop-filter": "blur(32px) saturate(200%)",
          "box-shadow": "0 16px 64px rgba(34, 211, 238, 0.1)",
        },
        ".premium-shadow": {
          "box-shadow": "0 32px 80px rgba(15, 23, 42, 0.4), 0 8px 32px rgba(34, 211, 238, 0.1)",
        },
        ".section-padding": {
          "padding-top": "6rem",
          "padding-bottom": "6rem",
          "@media (min-width: 768px)": {
            "padding-top": "7rem",
            "padding-bottom": "7rem",
          },
          "@media (min-width: 1024px)": {
            "padding-top": "8rem",
            "padding-bottom": "8rem",
          },
        },
        ".container-padding": {
          "padding-left": "1.5rem",
          "padding-right": "1.5rem",
          "@media (min-width: 768px)": {
            "padding-left": "2rem",
            "padding-right": "2rem",
          },
          "@media (min-width: 1024px)": {
            "padding-left": "3rem",
            "padding-right": "3rem",
          },
        },
        ".text-gradient": {
          "background-image": "var(--gradient-neural)",
          "-webkit-background-clip": "text",
          "background-clip": "text",
          color: "transparent",
        },
        ".ring-glow": {
          "box-shadow": "0 0 0 1px rgba(255,255,255,0.08), 0 0 40px rgba(34, 211, 238, 0.25)",
        },
        ".grid-bento": {
          display: "grid",
          gap: "1.5rem",
          "grid-template-columns": "repeat(auto-fit, minmax(240px, 1fr))",
        },
        ".bg-aurora": {
          "background": "radial-gradient(ellipse at top, rgba(34, 211, 238, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(167, 139, 250, 0.08) 0%, transparent 50%)",
        },
        ".bg-cinematic": {
          "background": "linear-gradient(135deg, rgba(2, 6, 23, 0.95) 0%, rgba(15, 23, 42, 0.9) 50%, rgba(2, 6, 23, 0.95) 100%)",
        },
        ".bg-depth": {
          "background": "linear-gradient(180deg, rgba(2, 6, 23, 0.8) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(2, 6, 23, 0.9) 100%)",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
