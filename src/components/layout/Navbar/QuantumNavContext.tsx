"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useMotionValue, useSpring, useScroll, useVelocity, MotionValue } from "framer-motion";

interface QuantumNavContextType {
    isScrolled: boolean;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
    cursorX: MotionValue<number>;
    cursorY: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollYVelocity: MotionValue<number>;
    scrollProgress: MotionValue<number>;
    focusedLink: string | null;
    setFocusedLink: (href: string | null) => void;
}

const QuantumNavContext = createContext<QuantumNavContextType | undefined>(undefined);

export function QuantumNavProvider({ children }: { children: ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [focusedLink, setFocusedLink] = useState<string | null>(null);

    // Motion values for physics
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Scroll physics
    const { scrollY, scrollYProgress } = useScroll();
    const scrollYVelocity = useVelocity(scrollY);

    // Smooth scroll progress for morphing
    const scrollProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Threshold from plan
        };

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [cursorX, cursorY]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <QuantumNavContext.Provider
            value={{
                isScrolled,
                isMobileMenuOpen,
                toggleMobileMenu,
                closeMobileMenu,
                cursorX,
                cursorY,
                scrollY,
                scrollYVelocity,
                scrollProgress,
                focusedLink,
                setFocusedLink,
            }}
        >
            {children}
        </QuantumNavContext.Provider>
    );
}

export function useQuantumNav() {
    const context = useContext(QuantumNavContext);
    if (context === undefined) {
        throw new Error("useQuantumNav must be used within a QuantumNavProvider");
    }
    return context;
}
