"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-highlight/10 text-highlight text-xs font-bold mb-10 border border-highlight/20"
        >
          <span className="w-2 h-2 rounded-full bg-highlight animate-pulse"></span>
          Ready for your next idea
        </motion.div>

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
          className="relative h-64 max-w-3xl mx-auto"
        >
          <div className="thought-bubble absolute top-0 left-0 p-6 max-w-xs text-left rotate-[-2deg]">
            <p className="text-sm text-muted-foreground serif-body italic font-serif">
              "The future of writing isn't typing..."
            </p>
          </div>
          <div className="thought-bubble absolute top-20 right-0 p-8 max-w-sm text-left rotate-[3deg]">
            <p className="text-lg font-bold text-primary leading-snug serif-body font-serif">
              It's speaking naturally and having it appear exactly where you
              need it.
            </p>
          </div>
          <div className="thought-bubble absolute bottom-0 left-1/4 p-4 flex items-center gap-4 border-none bg-primary text-primary-foreground">
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-white/40 rounded-full animate-bounce"></div>
              <div
                className="w-1 h-6 bg-white/80 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1 h-3 bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">
              Capturing Audio...
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase"
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}
