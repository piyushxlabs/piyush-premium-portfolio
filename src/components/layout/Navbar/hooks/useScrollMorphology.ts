import { useTransform, MotionValue } from "framer-motion";
import { useQuantumNav } from "../QuantumNavContext";

export function useScrollMorphology() {
    const { scrollY } = useQuantumNav();

    // Morph values based on scroll position (0 to 50px)
    const width = useTransform(scrollY, [0, 50], ["100%", "880px"]);
    const height = useTransform(scrollY, [0, 50], ["96px", "70px"]);
    const borderRadius = useTransform(scrollY, [0, 50], ["16px", "40px"]);
    const backgroundOpacity = useTransform(scrollY, [0, 50], [0.82, 0.96]);
    const backdropBlur = useTransform(scrollY, [0, 50], ["32px", "40px"]);
    const borderLightSpeed = useTransform(scrollY, [0, 50], [1, 3]); // Multiplier for animation speed

    // Container positioning
    const top = useTransform(scrollY, [0, 50], ["0px", "12px"]);

    // Content scaling
    const logoScale = useTransform(scrollY, [0, 50], [1, 0.75]); // 48px -> 36px
    const contentPadding = useTransform(scrollY, [0, 50], ["0 32px", "0 24px"]);

    return {
        width,
        height,
        borderRadius,
        backgroundOpacity,
        backdropBlur,
        borderLightSpeed,
        top,
        logoScale,
        contentPadding
    };
}
