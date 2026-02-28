"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const DOWNLOAD_URL = "https://verbaspeech.app/download";

export default function CtaSection() {
  const t = useTranslations("cta_block");

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-panel p-12 sm:p-20 relative group overflow-hidden"
        >
          <h2 className="heading-serif text-4xl sm:text-5xl lg:text-6xl font-medium mb-8 leading-tight tracking-tight text-foreground">
            {t("headline")}
          </h2>

          <div className="flex flex-col items-center gap-6">
            <Button
              asChild
              size="lg"
              className="rounded-full h-14 text-base font-medium px-10 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
            >
              <a href={DOWNLOAD_URL}>{t("button")}</a>
            </Button>
            <p className="text-sm font-light text-muted-foreground opacity-80">
              {t("note")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
