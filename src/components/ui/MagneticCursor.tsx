'use client';

import React, { useEffect, useRef, useState } from 'react';

export function MagneticCursor() {
    // State for mouse position and interaction status
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Refs for smooth animation
    const cursorRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | undefined>(undefined);

    // Target position for interpolation (lag effect)
    const targetPosition = useRef({ x: 0, y: 0 });
    const currentPosition = useRef({ x: 0, y: 0 });

    // Idle timer ref
    const idleTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        // Initial position setup
        if (typeof window !== 'undefined') {
            targetPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            currentPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        }

        const handleMouseMove = (e: MouseEvent) => {
            // Update target position
            targetPosition.current = { x: e.clientX, y: e.clientY };
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Handle visibility and idle state
            if (!isVisible) setIsVisible(true);
            setIsActive(true);

            // Reset idle timer
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                setIsActive(false);
            }, 3000);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive elements
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]') ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isInteractive);
        };

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        // Animation loop for smooth interpolation
        const animate = (time: number) => {
            if (previousTimeRef.current !== undefined) {
                // Lerp factor (0.15 for smooth lag)
                const lerpFactor = 0.15;

                currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lerpFactor;
                currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lerpFactor;

                if (cursorRef.current) {
                    cursorRef.current.style.transform = `translate3d(${currentPosition.current.x}px, ${currentPosition.current.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.9 : isHovering ? 1.1 : 1})`;
                }
            }

            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [isHovering, isClicking, isVisible]);

    // Don't render on touch devices (simple check)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform mix-blend-screen"
            style={{
                width: '600px',
                height: '600px',
                background: `radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)`,
                opacity: isActive ? 1 : 0.4,
                transition: 'opacity 0.5s ease-out, transform 0.1s linear', // Transform handled by JS, opacity by CSS
            }}
        />
    );
}
