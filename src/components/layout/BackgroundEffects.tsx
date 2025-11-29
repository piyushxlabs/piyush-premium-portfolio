// BackgroundEffects — MVP Optimized (Static & Lightweight)
"use client";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Gradient Foundation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Static Aurora Layer - Replaces heavy animation */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.06) 0%, transparent 50%)'
        }}
      />

      {/* Simple Atmospheric Glow - No Blur */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.1) 0%, transparent 60%)'
        }}
      />

      {/* Depth Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

      {/* Subtle Noise Texture - Kept for texture but reduced opacity */}
      <div
        className="absolute inset-0 opacity-[0.01] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
