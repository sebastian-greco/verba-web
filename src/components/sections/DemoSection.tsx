"use client";

import { useTranslations } from "next-intl";
import { Keyboard, Mic, CheckCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function DemoSection() {
  const t = useTranslations("demo");

  const steps = [
    { icon: Keyboard, label: t("step_hold") },
    { icon: Mic, label: t("step_speak") },
    { icon: CheckCircle, label: t("step_done") },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="demo" className="py-32 relative overflow-hidden">
      {/* Soft Background Tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="heading-serif text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
            {t("headline")}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-2"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center relative group"
              >
                <div className="glass-panel w-56 h-48 flex flex-col items-center justify-center gap-5 transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <p className="text-base font-medium text-foreground tracking-tight">
                    {step.label}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden sm:flex w-12 items-center justify-center opacity-30 px-2">
                    <div className="w-full h-px bg-foreground" />
                  </div>
                )}
                {i < steps.length - 1 && (
                  <div className="sm:hidden h-12 flex items-center justify-center opacity-30 py-2">
                    <div className="h-full w-px bg-foreground" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
