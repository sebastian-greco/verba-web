"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundBlobs() {
  const { scrollY } = useScroll();

  // Gentle, slower parallax to prevent clunky jumps during scroll.
  // Using very small movement ranges for fluid effect.
  const y1 = useTransform(scrollY, [0, 2000], [0, 100]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -120]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 80]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#F8FAFC]">
      {/* Top Right Cyan Blob */}
      <motion.div
        style={{ y: y1 }}
        animate={{
          rotate: [0, 8, -8, 0],
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "50% 50% 60% 40% / 50% 60% 40% 50%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-30%] right-[-10%] w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px] bg-gradient-to-tr from-[#7dd3fc] via-[#bae6fd] to-[#f0f9ff] opacity-40 mix-blend-multiply"
      />

      {/* Left Purple Blob */}
      <motion.div
        style={{ y: y2 }}
        animate={{
          rotate: [0, -10, 5, 0],
          borderRadius: [
            "55% 45% 50% 50% / 50% 55% 45% 50%",
            "45% 55% 60% 40% / 40% 50% 60% 55%",
            "60% 40% 40% 60% / 60% 40% 50% 50%",
            "55% 45% 50% 50% / 50% 55% 45% 50%",
          ],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-25%] w-[110vw] h-[110vw] max-w-[1300px] max-h-[1300px] bg-gradient-to-b from-[#d8b4fe] via-[#e9d5ff] to-[#faf5ff] opacity-40 mix-blend-multiply"
      />

      {/* Bottom Right Peach Blob */}
      <motion.div
        style={{ y: y3 }}
        animate={{
          rotate: [0, 5, -5, 0],
          borderRadius: [
            "50% 50% 60% 40% / 50% 50% 40% 60%",
            "40% 60% 50% 50% / 60% 40% 50% 50%",
            "60% 40% 40% 60% / 40% 60% 60% 40%",
            "50% 50% 60% 40% / 50% 50% 40% 60%",
          ],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-30%] right-[0%] w-[100vw] h-[100vw] max-w-[1100px] max-h-[1100px] bg-gradient-to-tl from-[#fdba74] via-[#fed7aa] to-[#fff7ed] opacity-40 mix-blend-multiply"
      />
    </div>
  );
}
