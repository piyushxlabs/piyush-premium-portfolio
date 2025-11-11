// src/components/animations/StaggerChildren.tsx — Stagger wrapper for child reveals
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/utils/motionVariants";

type Props = {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  as?: "div" | "section" | "ul" | "li";
  className?: string;
};

const motionMap = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  li: motion.li,
} as const;

export function StaggerChildren({
  children,
  delayChildren = 0.2,
  staggerChildren: stagger = 0.1,
  as = "div",
  className,
}: Props) {
  const M = (motionMap as Record<string, typeof motion.div>)[as] ?? motion.div;
  return (
    <M
      className={className}
      variants={staggerContainer(delayChildren, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </M>
  );
}


