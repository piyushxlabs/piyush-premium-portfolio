"use client";

import { motion, useTransform, useReducedMotion } from "framer-motion";
import { useQuantumNav } from "./QuantumNavContext";
import { useScrollMorphology } from "./hooks/useScrollMorphology";
import { NavParticleField } from "./NavParticleField";
import { ReactNode } from "react";
import { cn } from "@/utils/helpers/cn";

interface NavbarContainerProps {
    children: ReactNode;
    className?: string;
}

export function NavbarContainer({ children, className }: NavbarContainerProps) {
    // [MODIFIED] Use hasUnfolded from context
    const { isScrolled, hasUnfolded } = useQuantumNav();
    const prefersReducedMotion = useReducedMotion();

    const {
        width,
        height,
        borderRadius,
        backgroundOpacity,
        backdropBlur,
        borderLightSpeed,
        top
    } = useScrollMorphology();

    // [NEW] Dimensions for the folded "Pill" state
    // TOGGLE: Edit this value to change the initial folded width
    const INITIAL_WIDTH = "-400px";

    return (
        <motion.div
            className={cn("fixed left-0 right-0 z-50 flex justify-center items-start", className)}
            style={{
                top,
                // Always visible now, but starts small
                visibility: "visible"
            }}
        >
            <motion.nav
                className="relative overflow-hidden flex items-center justify-between"
                // Animate width based on hasUnfolded state
                animate={{
                    width: hasUnfolded ? width.get() : INITIAL_WIDTH,
                    height: hasUnfolded ? height.get() : "200px", // Fixed height for pill
                    borderRadius: hasUnfolded ? borderRadius.get() : "40px", // Rounder for pill
                }}
                transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1], // Smooth exponential ease out
                }}
                style={{
                    width: hasUnfolded ? width : INITIAL_WIDTH,
                    height: hasUnfolded ? height : "200px",
                    borderRadius: hasUnfolded ? borderRadius : "40px",

                    willChange: "width, height, border-radius",
                    transform: "translateZ(0)",
                }}
            >
                {/* Layer 3: Deep Void Background & Blur */}
                <motion.div
                    className="absolute inset-0 z-0 bg-[#000816]"
                    style={{
                        opacity: backgroundOpacity,
                        backdropFilter: useTransform(backdropBlur, (v) => `blur(${v})`),
                        WebkitBackdropFilter: useTransform(backdropBlur, (v) => `blur(${v})`),
                        willChange: "opacity, filter",
                        transform: "translateZ(0)",
                    }}
                />

                {/* Layer 2: Particle Constellation Field */}
                <NavParticleField />

                {/* Layer 1: Glass Interface (Content) */}
                <div className="relative z-10 w-full h-full px-6 flex items-center justify-between">
                    <div className={cn(
                        "flex items-center justify-between w-full transition-opacity duration-500",
                        !hasUnfolded ? "justify-center" : "" // Center logo when folded
                    )}>
                        {children}
                    </div>
                </div>

                {/* Racing Border Light */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                        style={{
                            filter: "blur(8px)",
                        }}
                        animate={{
                            x: ["-100%", "200%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 1
                        }}
                    />
                    {/* Border Stroke */}
                    <div className="absolute inset-0 border border-cyan-500/10 rounded-[inherit]" />
                </div>
            </motion.nav>
        </motion.div>
    );
}
