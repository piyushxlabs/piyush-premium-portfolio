// src/components/animations/FadeIn.tsx — Viewport-based fade/slide reveal
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { fadeIn as fadeInVariants } from "@/utils/motionVariants";

type Props = {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  as?: "div" | "section" | "span" | "p" | "ul" | "li";
  className?: string;
};

const motionMap = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  p: motion.p,
  ul: motion.ul,
  li: motion.li,
} as const;

export function FadeIn({ children, delay = 0, direction = "up", as = "div", className }: Props) {
  const M = (motionMap as Record<string, typeof motion.div>)[as] ?? motion.div;
  return (
    <M
      className={className}
      variants={fadeInVariants(direction, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </M>
  );
}


