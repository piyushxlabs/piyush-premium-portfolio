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
      });
    }),
  ],
} satisfies Config;

export default config;
