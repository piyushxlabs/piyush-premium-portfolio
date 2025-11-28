import { RefObject, useEffect } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";
import { useQuantumNav } from "../QuantumNavContext";

interface GravityOptions {
    maxPull?: number;
    stiffness?: number;
    damping?: number;
    threshold?: number;
}

export function useCursorGravity(
    ref: RefObject<HTMLElement>,
    { maxPull = 10, stiffness = 200, damping = 15, threshold = 150 }: GravityOptions = {}
) {
    const { cursorX, cursorY } = useQuantumNav();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness, damping });
    const springY = useSpring(y, { stiffness, damping });

    useEffect(() => {
        const handleMouseMove = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const currentCursorX = cursorX.get();
            const currentCursorY = cursorY.get();

            const dist = Math.sqrt(
                Math.pow(currentCursorX - centerX, 2) + Math.pow(currentCursorY - centerY, 2)
            );

            if (dist < threshold) {
                const pull = (threshold - dist) / threshold;
                const moveX = (currentCursorX - centerX) * pull * (maxPull / threshold);
                const moveY = (currentCursorY - centerY) * pull * (maxPull / threshold);

                x.set(moveX);
                y.set(moveY);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        const unsubscribeX = cursorX.on("change", handleMouseMove);
        const unsubscribeY = cursorY.on("change", handleMouseMove);

        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [cursorX, cursorY, maxPull, threshold, x, y, ref]);

    return { x: springX, y: springY };
}
