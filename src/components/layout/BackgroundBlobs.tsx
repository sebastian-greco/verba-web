"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundBlobs() {
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 2000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 250]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#F7F9FC]">
      {/* Top Right Blue Shape */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[-30%] right-[-10%] w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px] rounded-[45%] bg-gradient-to-tr from-[#bae6fd] to-[#e0f2fe] opacity-80 blur-[80px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* Left Purple Shape */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[-10%] left-[-30%] w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] rounded-[40%] bg-gradient-to-b from-[#e9d5ff] to-[#f3e8ff] opacity-80 blur-[80px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      />

      {/* Bottom Right Peach Shape */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[-30%] right-[-10%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-[50%] bg-gradient-to-tl from-[#fed7aa] to-[#ffedd5] opacity-80 blur-[60px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
