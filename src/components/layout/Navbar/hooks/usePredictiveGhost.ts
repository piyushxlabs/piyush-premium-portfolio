import { RefObject, useEffect, useState } from "react";
import { useQuantumNav } from "../QuantumNavContext";

export function usePredictiveGhost(ref: RefObject<HTMLElement>, threshold: number = 120) {
    const { cursorX, cursorY } = useQuantumNav();
    const [showGhost, setShowGhost] = useState(false);

    useEffect(() => {
        const checkProximity = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const currentCursorX = cursorX.get();
            const currentCursorY = cursorY.get();

            const dist = Math.sqrt(
                Math.pow(currentCursorX - centerX, 2) + Math.pow(currentCursorY - centerY, 2)
            );

            // Show ghost if close but not hovering (hover is usually < 40-50px depending on size)
            // We want it to appear "before" hover
            if (dist < threshold && dist > 40) {
                setShowGhost(true);
            } else {
                setShowGhost(false);
            }
        };

        const unsubscribeX = cursorX.on("change", checkProximity);
        const unsubscribeY = cursorY.on("change", checkProximity);

        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [cursorX, cursorY, threshold, ref]);

    return showGhost;
}
