"use client";

import { motion, useTransform } from "framer-motion";
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
    const { isScrolled } = useQuantumNav();

    const {
        width,
        height,
        borderRadius,
        backgroundOpacity,
        backdropBlur,
        top
    } = useScrollMorphology();

    return (
        <motion.div
            className={cn("fixed left-0 right-0 z-50 flex justify-center items-start", className)}
            style={{
                top,
                visibility: "visible"
            }}
        >
            <motion.nav
                className="relative overflow-hidden flex items-center justify-between"
                style={{
                    width,
                    height,
                    borderRadius,
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
                    <div className="flex items-center justify-between w-full">
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
