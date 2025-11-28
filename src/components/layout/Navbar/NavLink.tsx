"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { cn } from "@/utils/helpers/cn";
import { useQuantumNav } from "./QuantumNavContext";
import { useCursorGravity } from "./hooks/useCursorGravity";
import { usePredictiveGhost } from "./hooks/usePredictiveGhost";

interface NavLinkProps {
    href: string;
    label: string;
}

export function NavLink({ href, label }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    const { focusedLink, setFocusedLink } = useQuantumNav();
    const linkRef = useRef<HTMLAnchorElement>(null);

    // Physics hooks - casting ref to satisfy hook signature
    const { x, y } = useCursorGravity(linkRef as React.RefObject<HTMLElement>, { maxPull: 6, threshold: 100 });
    const showGhost = usePredictiveGhost(linkRef as React.RefObject<HTMLElement>, 120);

    // Local state for prismatic effect
    const [isHovered, setIsHovered] = useState(false);
    const [refract, setRefract] = useState(false);

    // Depth of Field calculation
    const isBlurred = focusedLink && focusedLink !== href;

    return (
        <div className="relative isolate">
            {/* Predictive Ghost State */}
            <AnimatePresence>
                {showGhost && !isActive && !isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, z: -10 }}
                        animate={{ opacity: 0.04, scale: 1, z: -5 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                        style={{ x: 10 }} // Slight offset to suggest "future"
                    >
                        <span className="text-sm font-medium text-white blur-[1px]">{label}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <Link
                ref={linkRef}
                href={href}
                className="relative block"
                onMouseEnter={() => {
                    setIsHovered(true);
                    setFocusedLink(href);
                    setRefract(true);
                    setTimeout(() => setRefract(false), 120);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setFocusedLink(null);
                }}
            >
                <motion.div
                    className={cn(
                        "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                        isActive ? "text-cyan-400" : "text-slate-300"
                    )}
                    style={{
                        x,
                        y,
                        filter: isBlurred ? 'blur(2px)' : 'blur(0px)',
                        opacity: isBlurred ? 0.4 : 1,
                    }}
                >
                    {/* Prismatic/Refraction Effect on Text */}
                    <motion.span
                        className="relative z-10 block"
                        animate={{
                            textShadow: refract
                                ? "2px 0 0 rgba(255,0,0,0.5), -2px 0 0 rgba(0,0,255,0.5)"
                                : "0 0 0 rgba(0,0,0,0)"
                        }}
                    >
                        {label}
                    </motion.span>

                    {/* Active State: Plasma Containment Field */}
                    {isActive && (
                        <motion.div
                            layoutId="plasmaField"
                            className="absolute inset-0 rounded-lg -z-10"
                            style={{
                                background: 'radial-gradient(circle, rgba(217,70,239,0.15), transparent 70%)',
                                boxShadow: '0 0 15px rgba(217,70,239,0.1)',
                            }}
                            transition={{ type: "spring", stiffness: 280, damping: 22 }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-lg border border-fuchsia-500/20"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    )}

                    {/* Hover State: Glass Reflection */}
                    {!isActive && (
                        <motion.div
                            className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100"
                            animate={{ opacity: isHovered ? 1 : 0 }}
                        />
                    )}
                </motion.div>
            </Link>
        </div>
    );
}
