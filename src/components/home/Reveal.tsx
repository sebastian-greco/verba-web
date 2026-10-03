"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useAnimationPreferences } from "@/components/home/AnimationPreferences";

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { paused, reducedMotion } = useAnimationPreferences();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reducedMotion || paused ? undefined : { opacity: [0.65, 1], y: [18, 0] }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
