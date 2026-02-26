"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Shield, Globe, Mic } from "lucide-react";

const DOWNLOAD_URL = "https://verbaspeech.app/download";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center">
        {/* Top Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mb-16 flex flex-col items-center"
        >
          <div className="bg-primary/10 p-3 rounded-full mb-8 shadow-sm text-primary">
            <Mic className="w-6 h-6" strokeWidth={2} />
          </div>
          <h1 className="heading-serif text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] text-foreground mb-6">
            {t("headline_part1")} <br />
            <span className="italic text-primary/80">
              {t("headline_part2")}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light">
            {t("subheadline")}
          </p>
        </motion.div>

        {/* Two Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col justify-between group"
          >
            <h3 className="font-semibold text-lg mb-8">
              {t("live_transcription_title")}
            </h3>

            <div className="flex items-center gap-4 mb-8">
              <button className="h-12 w-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground shadow-sm transition-all duration-300">
                <Play className="w-5 h-5 ml-1" fill="currentColor" />
              </button>
              <div className="flex items-center gap-[3px] h-10 w-full opacity-60">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      delay: i * 0.05,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 rounded-full bg-primary/60"
                  />
                ))}
              </div>
            </div>

            <p className="text-sm font-medium text-foreground/80 leading-relaxed bg-foreground/5 p-4 rounded-2xl border border-glass-border">
              <span className="text-muted-foreground font-semibold">
                {t("live_transcription_speaking")}
              </span>
              {t("live_transcription_text")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col"
          >
            <h3 className="font-semibold text-lg mb-8">
              {t("key_features_title")}
            </h3>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-blue-500/10 text-blue-500 shrink-0 shadow-sm border border-blue-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-base font-medium">{t("feature_1")}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 shadow-sm border border-primary/20">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-base font-medium">{t("feature_2")}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-orange-500/10 text-orange-500 shrink-0 shadow-sm border border-orange-500/20">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-base font-medium">{t("feature_3")}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full w-full sm:w-auto h-14 px-10 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
          >
            <a href={DOWNLOAD_URL}>{t("cta_button")}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full w-full sm:w-auto h-14 px-10 text-base bg-transparent border-glass-border hover:bg-black/5 dark:hover:bg-white/5 transition-all"
          >
            <a href="#demo">{t("demo_button")}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
