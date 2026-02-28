"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CleanupSection() {
  const t = useTranslations("cleanup");
  const [isClean, setIsClean] = useState(true);

  return (
    <section className="py-40 bg-background overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest rounded-lg mb-10">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            {t("headline")}
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-10 text-primary leading-[1.15] font-serif">
            Polished text, <br />
            <span className="italic font-normal">without the filler.</span>
          </h2>

          <p className="text-xl text-muted-foreground serif-body mb-12 leading-relaxed font-serif">
            Verba's local AI intelligently removes "ums" and "uhs", fixes your
            grammar, and structures your stream of consciousness into
            professional prose.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-highlight/10 flex items-center justify-center text-highlight shrink-0">
                <span className="material-symbols-outlined text-2xl">
                  check_circle
                </span>
              </div>
              <span className="font-bold text-lg text-primary serif-body font-serif">
                {t("feature_fillers")}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-highlight/10 flex items-center justify-center text-highlight shrink-0">
                <span className="material-symbols-outlined text-2xl">
                  check_circle
                </span>
              </div>
              <span className="font-bold text-lg text-primary serif-body font-serif">
                {t("feature_grammar")}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2 w-full"
        >
          <div className="bg-card rounded-[40px] p-10 soft-shadow border border-border">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                Visual Transformation
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground">
                  Clean Mode
                </span>
                <div
                  className={`tactile-toggle ${isClean ? "active" : ""}`}
                  onClick={() => setIsClean(!isClean)}
                ></div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-red-200/50 rounded-full"></div>
                <div
                  className={
                    isClean ? "blur-filter" : "transition-all duration-500"
                  }
                >
                  <p className="text-lg text-muted-foreground serif-body italic leading-relaxed font-serif">
                    "So, um, I was thinking like, basically we should probably
                    launch the feature, uh, next Tuesday? No wait, let's go with
                    Wednesday because of the holiday."
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-black text-red-300 uppercase tracking-widest">
                  {t("before_label")}
                </div>
              </div>

              <div className="relative">
                <div
                  className={`absolute -left-6 top-0 bottom-0 w-1 rounded-full transition-colors duration-500 ${isClean ? "bg-highlight" : "bg-highlight/30"}`}
                ></div>
                <div
                  className={
                    !isClean ? "blur-filter" : "transition-all duration-500"
                  }
                >
                  <p className="text-2xl text-primary font-black leading-relaxed serif-body font-serif">
                    "We should launch the feature next Wednesday to account for
                    the holiday."
                  </p>
                </div>
                <div
                  className={`mt-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${isClean ? "text-highlight" : "text-highlight/50"}`}
                >
                  {t("after_label")}
                </div>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-muted flex items-center justify-between">
              <div
                className={`flex items-center gap-2 transition-colors duration-500 ${isClean ? "text-highlight" : "text-muted-foreground"}`}
              >
                <span className="material-symbols-outlined text-sm">
                  auto_awesome
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Smart Cleanup {isClean ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
