'use client';

import React from 'react';

/**
 * 🌌 Vision Background Component (MVP Version)
 * A lightweight, static background that maintains the theme without performance cost.
 */
export default function VisionBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Base Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#050510] to-[#020617]" />

            {/* Static Grid Pattern */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(6,182,212,0.03)_1.5px,transparent_1.5px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] opacity-20"
            />

            {/* Static Ambient Glows (Replacing Fog Layers) */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,2,2,0.8)_100%)]" />
        </div>
    );
}
