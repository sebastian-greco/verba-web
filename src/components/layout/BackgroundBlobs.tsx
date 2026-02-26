"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundBlobs() {
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 2000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 250]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* A distinct background color layer in case globals.css gets overridden */}
      <div className="absolute inset-0 bg-background" />

      {/* Parallax Blobs */}
      <motion.div
        style={{ y: y1 }}
        animate={{ rotate: 360, x: [0, 50, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary/20 mix-blend-multiply blur-[120px] opacity-80"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-secondary/30 mix-blend-multiply blur-[120px] opacity-70"
      />
      <motion.div
        style={{ y: y3 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] left-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full bg-accent/20 mix-blend-multiply blur-[120px] opacity-80"
      />

      {/* Ambient Pulsing Glow */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-300/20 mix-blend-multiply blur-[140px] pointer-events-none"
      />
    </div>
  );
}
