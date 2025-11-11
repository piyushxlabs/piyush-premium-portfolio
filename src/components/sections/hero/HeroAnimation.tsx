// src/components/sections/hero/HeroAnimation.tsx — Subtle background animation
export function HeroAnimation() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-1/2 h-[120px] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow blur-2xl opacity-60" />
    </div>
  );
}
