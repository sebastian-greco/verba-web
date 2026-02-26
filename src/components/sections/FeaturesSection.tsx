"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  Globe,
  Keyboard,
  History,
  Zap,
  Languages,
  Sparkles,
  ShieldOff,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function FeaturesSection() {
  const t = useTranslations("features");
  const tCleanup = useTranslations("cleanup");

  const features = [
    {
      icon: Mic,
      titleKey: "transcription_title",
      descKey: "transcription_desc",
      experimental: false,
    },
    {
      icon: Globe,
      titleKey: "languages_title",
      descKey: "languages_desc",
      experimental: false,
    },
    {
      icon: Keyboard,
      titleKey: "push_to_talk_title",
      descKey: "push_to_talk_desc",
      experimental: false,
    },
    {
      icon: History,
      titleKey: "history_title",
      descKey: "history_desc",
      experimental: false,
    },
    {
      icon: Zap,
      titleKey: "metal_title",
      descKey: "metal_desc",
      experimental: false,
    },
    {
      icon: Languages,
      titleKey: "translation_title",
      descKey: "translation_desc",
      experimental: false,
    },
    {
      icon: Sparkles,
      titleKey: "cleanup_title",
      descKey: "cleanup_desc",
      experimental: true,
    },
    {
      icon: ShieldOff,
      titleKey: "telemetry_title",
      descKey: "telemetry_desc",
      experimental: false,
    },
  ] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full mix-blend-multiply filter blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-serif text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
            {t("headline")}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div variants={itemVariants} key={feature.titleKey}>
                <div className="glass-panel h-full flex flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 group">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                      <Icon
                        className="w-6 h-6 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>
                    {feature.experimental && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] uppercase tracking-wider bg-accent/20 text-accent-foreground border-none px-2 py-0.5 mt-1 rounded-full"
                      >
                        {tCleanup("badge")}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2">
                    <h3 className="font-semibold text-base mb-2 text-foreground">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
