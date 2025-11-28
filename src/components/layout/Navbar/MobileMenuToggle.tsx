"use client";

import { motion } from "framer-motion";
import { useQuantumNav } from "./QuantumNavContext";

export function MobileMenuToggle() {
    const { isMobileMenuOpen, toggleMobileMenu } = useQuantumNav();

    // Orbital dots configuration
    const dots = [
        { angle: 0, radius: 8 },
        { angle: 120, radius: 8 },
        { angle: 240, radius: 8 },
    ];

    const angleToRadians = (angle: number) => (angle * Math.PI) / 180;

    return (
        <button
            onClick={toggleMobileMenu}
            className="relative z-50 w-12 h-12 flex items-center justify-center lg:hidden focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
            <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                </defs>

                {/* Hexagon Frame */}
                <motion.polygon
                    points="24,6 38,14 38,34 24,42 10,34 10,14"
                    stroke="url(#hexGradient)"
                    fill={isMobileMenuOpen ? "rgba(34, 211, 238, 0.1)" : "transparent"}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    animate={{
                        rotate: isMobileMenuOpen ? 180 : 0,
                        scale: isMobileMenuOpen ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
                    style={{ originX: "24px", originY: "24px" }}
                />

                {/* Orbital Dots / Exploding X */}
                {dots.map((dot, i) => (
                    <motion.circle
                        key={i}
                        r="2"
                        fill="#22D3EE"
                        initial={false}
                        animate={{
                            cx: isMobileMenuOpen
                                ? 24 + Math.cos(angleToRadians(i * 90 + 45)) * 14 // Form X corners
                                : 24 + Math.cos(angleToRadians(dot.angle)) * dot.radius, // Orbit
                            cy: isMobileMenuOpen
                                ? 24 + Math.sin(angleToRadians(i * 90 + 45)) * 14
                                : 24 + Math.sin(angleToRadians(dot.angle)) * dot.radius,
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "backOut"
                        }}
                    />
                ))}

                {/* 4th dot for X formation (only visible when open) */}
                <motion.circle
                    r="2"
                    fill="#22D3EE"
                    initial={{ opacity: 0, cx: 24, cy: 24 }}
                    animate={{
                        opacity: isMobileMenuOpen ? 1 : 0,
                        cx: isMobileMenuOpen ? 24 + Math.cos(angleToRadians(270 + 45)) * 14 : 24,
                        cy: isMobileMenuOpen ? 24 + Math.sin(angleToRadians(270 + 45)) * 14 : 24,
                    }}
                    transition={{ duration: 0.4 }}
                />
            </svg>
        </button>
    );
}
