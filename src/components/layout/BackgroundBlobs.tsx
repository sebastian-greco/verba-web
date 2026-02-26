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
      {/* Top Right Cyan Shape */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[-20%] right-[-5%] w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] rounded-[48%_52%_41%_59%/46%_43%_57%_54%] bg-gradient-to-tr from-[#E3F2FD] to-[#cbf0ff] opacity-100 mix-blend-multiply"
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      />

      {/* Left Purple/Lavender Shape */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[0%] left-[-20%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-[55%_45%_51%_49%/50%_53%_47%_50%] bg-gradient-to-b from-[#F3E5F5] to-[#e6dbf5] opacity-100 mix-blend-multiply"
        animate={{ rotate: -360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      />

      {/* Bottom Right Peach/Orange Shape */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[-20%] right-[0%] w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-[41%_59%_37%_63%/57%_43%_57%_43%] bg-gradient-to-tl from-[#FFF3E0] to-[#ffead2] opacity-100 mix-blend-multiply"
        animate={{ rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
