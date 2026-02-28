"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function PrivacySection() {
  const t = useTranslations("privacy_section");

  return (
    <section className="py-40 bg-card" id="privacy">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-black text-highlight uppercase tracking-[0.3em] mb-8 block"
        >
          Your Privacy is Native
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black mb-12 text-primary font-serif"
        >
          {t("headline")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl text-muted-foreground serif-body mb-24 max-w-2xl mx-auto leading-relaxed italic font-serif"
        >
          "{t("quote")} Unlike cloud dictation tools, Verba processes everything
          on your Mac's Neural Engine. We physically cannot see your data."
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-8 p-10 rounded-[40px] bg-muted hover:bg-card border border-transparent hover:border-border transition-all soft-shadow"
          >
            <span className="material-symbols-outlined text-5xl text-primary/40">
              no_accounts
            </span>
            <h3 className="font-bold text-2xl text-primary serif-body font-serif">
              {t("no_account_title")}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-8 p-10 rounded-[40px] bg-muted hover:bg-card border border-transparent hover:border-border transition-all soft-shadow"
          >
            <span className="material-symbols-outlined text-5xl text-primary/40">
              wifi_off
            </span>
            <h3 className="font-bold text-2xl text-primary serif-body font-serif">
              {t("offline_title")}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-8 p-10 rounded-[40px] bg-muted hover:bg-card border border-transparent hover:border-border transition-all soft-shadow"
          >
            <span className="material-symbols-outlined text-5xl text-primary/40">
              memory
            </span>
            <h3 className="font-bold text-2xl text-primary serif-body font-serif">
              {t("local_storage_title")}
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
