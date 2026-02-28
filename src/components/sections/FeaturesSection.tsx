"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const t = useTranslations("features");

  const featureList = [
    {
      icon: "translate",
      titleKey: "languages_title",
      descKey: "languages_desc",
    },
    {
      icon: "language",
      titleKey: "translation_title",
      descKey: "translation_desc",
    },
    {
      icon: "history",
      titleKey: "history_title",
      descKey: "history_desc",
    },
    {
      icon: "speed",
      titleKey: "metal_title",
      descKey: "metal_desc",
    },
  ];

  return (
    <section className="py-40 bg-card" id="features">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-black text-primary mb-6 font-serif">
            {t("headline").split(".")[0]}.
          </h2>
          <p className="text-xl text-muted-foreground serif-body italic font-serif">
            Powerful features wrapped in a simple experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {featureList.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-muted rounded-[32px] hover:bg-[var(--accent-light)] transition-all group border border-transparent hover:border-accent/20"
            >
              <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center mb-10 soft-shadow group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary">
                  {feature.icon}
                </span>
              </div>
              <h4 className="text-primary text-xl font-bold mb-4 serif-body font-serif">
                {t(feature.titleKey)}
              </h4>
              <p className="text-sm text-muted-foreground serif-body leading-relaxed font-serif">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
