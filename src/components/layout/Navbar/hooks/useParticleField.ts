import { useMemo } from "react";

// Simple seeded random function for deterministic results
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export interface Particle {
    id: number;
    x: number; // %
    y: number; // %
    size: number; // px
    speed: number;
    color: string;
    initialX: number;
    initialY: number;
}

export function useParticleField(count: number = 500) {
    const particles = useMemo(() => {
        const seed = 12345; // Deterministic seed
        return Array.from({ length: count }, (_, i) => {
            const x = seededRandom(seed + i) * 100;
            const y = seededRandom(seed + i + 1000) * 100;
            return {
                id: i,
                x,
                y,
                initialX: x,
                initialY: y,
                size: 2 + seededRandom(seed + i + 2000) * 2, // 2-4px
                speed: 0.5 + seededRandom(seed + i + 3000) * 1.5,
                color: i % 3 === 0 ? '#4FD1E8' : '#A78BFA', // Cyan or Lavender
            };
        });
    }, [count]);

    return particles;
}
