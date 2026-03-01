"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import MacOverlaySimulator from "@/components/ui/MacOverlaySimulator";
import { useRef } from "react";

export default function HeroSection() {
  const t = useTranslations("hero");

  const triggerRef = useRef<HTMLDivElement>(null);
  const isFinished = useInView(triggerRef, {
    once: false,
    margin: "-100px 0px 0px 0px",
  });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -30]);
  const y2 = useTransform(scrollY, [0, 500], [0, 25]);
  const y3 = useTransform(scrollY, [0, 500], [0, -15]);
  const y4 = useTransform(scrollY, [0, 500], [0, 40]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-x-clip">
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-12 text-primary leading-[1.1] font-serif"
        >
          Your voice, <br />
          <span className="text-accent italic">typed instantly.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 serif-body leading-relaxed font-serif"
        >
          Write emails, documents, and messages just by speaking. Private, fast,
          and stays entirely on your Mac.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-28"
        >
          <a
            className="btn-warm px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3"
            href="https://verbaspeech.app/download"
          >
            <span className="material-symbols-outlined shrink-0 text-xl font-medium">
              download
            </span>
            {t("cta_primary")}
          </a>
          <a
            className="px-10 py-5 rounded-full font-bold text-lg text-primary bg-white border border-border hover:bg-muted transition-all"
            href="https://verbaspeech.app/buy"
          >
            {t("cta_secondary")} ($22)
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-96 max-w-4xl mx-auto z-10"
        >
          <motion.div
            style={{ y: y1 }}
            className="thought-bubble absolute top-0 left-0 p-6 max-w-xs text-left rotate-[-2deg]"
          >
            <BackgroundWaveform />
            <span className="hidden absolute -top-5 -left-3 text-8xl text-accent/25 font-serif leading-none select-none">
              “
            </span>
            <p className="relative z-10 text-sm text-muted-foreground serif-body italic font-serif">
              The future of writing isn't typing...
            </p>
            <span className="hidden absolute -bottom-20 -right-2 text-8xl text-accent/25 font-serif leading-none select-none">
              ”
            </span>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="thought-bubble absolute top-12 right-0 p-6 max-w-sm text-left rotate-[3deg]"
          >
            <BackgroundWaveform />
            <span className="hidden absolute -top-5 -left-3 text-8xl text-highlight/35 font-serif leading-none select-none">
              “
            </span>
            <p className="relative z-10 text-md text-muted-foreground serif-body italic font-serif">
              It's speaking naturally and having it appear exactly where you
              need it.
            </p>
            <span className="hidden absolute -bottom-20 -right-2 text-8xl text-highlight/35 font-serif leading-none select-none">
              ”
            </span>
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            className="thought-bubble absolute bottom-8 left-12 p-6 max-w-xs text-left rotate-[-1deg]"
          >
            <BackgroundWaveform />
            <span className="hidden absolute -top-5 -left-3 text-8xl text-accent/25 font-serif leading-none select-none">
              “
            </span>
            <p className="relative z-10 text-lg text-muted-foreground serif-body italic font-serif">
              Spoken words fly away, written ones remain.
            </p>
            <span className="hidden absolute -bottom-20 -right-2 text-8xl text-accent/25 font-serif leading-none select-none">
              ”
            </span>
          </motion.div>
        </motion.div>

        <div className="sticky bottom-8 z-50 flex justify-center w-full mb-6">
          <MacOverlaySimulator isFinished={isFinished} />
        </div>

        {/* This empty div acts as the tripwire for the IntersectionObserver */}
        <div ref={triggerRef} className="w-full h-px pointer-events-none" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-4 text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase"
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}

const WAVE_DATA = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  duration: 1.5 + (i % 3) * 0.2 + (i % 5) * 0.1,
  delay: (i % 7) * 0.15,
  heights: [
    `${10 + (i % 5) * 10}%`,
    `${40 + (i % 3) * 20}%`,
    `${20 + (i % 4) * 10}%`,
    `${60 + (i % 2) * 20}%`,
    `${10 + (i % 5) * 10}%`,
  ],
}));

function BackgroundWaveform() {
  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden flex items-center justify-center gap-[3px] opacity-[0.10] pointer-events-none z-0 py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      {WAVE_DATA.map((data) => (
        <motion.div
          key={data.id}
          className="w-1 shrink-0 bg-primary/60 rounded-full "
          animate={{ height: data.heights }}
          transition={{
            duration: data.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: data.delay,
          }}
        />
      ))}
    </div>
  );
}
