// src/components/animations/SlideUp.tsx — Upward reveal on viewport enter
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { slideUp as slideUpVariants } from "@/utils/motionVariants";

type Props = {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
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

export function SlideUp({ children, delay = 0, distance = 40, as = "div", className }: Props) {
  const M = (motionMap as Record<string, typeof motion.div>)[as] ?? motion.div;
  return (
    <M
      className={className}
      variants={slideUpVariants(distance, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </M>
  );
}


