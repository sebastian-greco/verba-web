"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function DemoSection() {
  const t = useTranslations("demo");

  return (
    <section className="py-40 bg-muted relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-black text-primary mb-6 font-serif">
            How it Works
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-16">
          <svg
            className="absolute top-1/2 left-0 w-full h-12 hidden md:block -translate-y-1/2 z-0 overflow-visible"
            viewBox="0 0 1000 50"
          >
            <path
              className="organic-path"
              d="M150,25 Q300,5 450,25 T750,25"
              fill="none"
              strokeWidth="2"
            ></path>
          </svg>

          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 flex-1 flex flex-col items-center text-center group"
          >
            <div className="w-40 h-40 organic-shape bg-card flex items-center justify-center mb-10 soft-shadow border border-border transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-4xl text-primary">
                keyboard_command_key
              </span>
            </div>
            <div className="mb-4 px-3 py-1 rounded-full bg-highlight/20 text-highlight text-[10px] font-black tracking-widest">
              STEP 01
            </div>
            <h3 className="text-3xl font-bold text-primary mb-5 font-serif">
              {t("step_hold")}
            </h3>
            <p className="text-muted-foreground serif-body leading-relaxed max-w-[240px] font-serif">
              Tap a key to wake Verba. The transcription overlay appears
              instantly.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex-1 flex flex-col items-center text-center group"
          >
            <div
              className="w-48 h-48 organic-shape bg-card flex items-center justify-center mb-10 soft-shadow border border-border transition-transform group-hover:scale-105"
              style={{ borderRadius: "40% 60% 30% 70% / 50% 40% 60% 50%" }}
            >
              <span className="material-symbols-outlined text-5xl text-accent">
                mic
              </span>
            </div>
            <div className="mb-4 px-3 py-1 rounded-full bg-highlight/20 text-highlight text-[10px] font-black tracking-widest">
              STEP 02
            </div>
            <h3 className="text-3xl font-bold text-primary mb-5 font-serif">
              {t("step_speak")}
            </h3>
            <p className="text-muted-foreground serif-body leading-relaxed max-w-[240px] font-serif">
              No need for robot voice. Whisper captures every nuance with
              precision.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 flex-1 flex flex-col items-center text-center group"
          >
            <div
              className="w-40 h-40 organic-shape bg-card flex items-center justify-center mb-10 soft-shadow border border-border transition-transform group-hover:scale-105"
              style={{ borderRadius: "70% 30% 50% 50% / 30% 60% 40% 70%" }}
            >
              <span className="material-symbols-outlined text-4xl text-highlight">
                auto_fix_high
              </span>
            </div>
            <div className="mb-4 px-3 py-1 rounded-full bg-highlight/20 text-highlight text-[10px] font-black tracking-widest">
              STEP 03
            </div>
            <h3 className="text-3xl font-bold text-primary mb-5 font-serif">
              {t("step_done")}
            </h3>
            <p className="text-muted-foreground serif-body leading-relaxed max-w-[240px] font-serif">
              Let go of the key and watch as your words are typed perfectly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
