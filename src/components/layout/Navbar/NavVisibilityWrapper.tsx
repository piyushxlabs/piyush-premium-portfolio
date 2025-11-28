"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useQuantumNav } from "./QuantumNavContext";
import { ReactNode } from "react";

export function NavVisibilityWrapper({ children }: { children: ReactNode }) {
    const { hasUnfolded } = useQuantumNav();

    return (
        <AnimatePresence>
            {hasUnfolded && (
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
