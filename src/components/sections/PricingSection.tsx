"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function PricingSection() {
  const t = useTranslations("pricing");

  return (
    <section className="py-40 bg-muted" id="pricing">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black text-primary mb-8 font-serif">
            {t("headline").split(".")[0]}.
          </h2>
          <p className="text-2xl text-muted-foreground serif-body max-w-2xl mx-auto leading-relaxed font-serif">
            {t("subheadline")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-[48px] p-14 border border-border soft-shadow relative overflow-hidden group"
          >
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/5 organic-shape transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-primary mb-8 serif-body font-serif">
                {t("paid_label")}
              </h3>
              <div className="flex items-baseline gap-3 mb-12">
                <span className="text-8xl font-black text-primary serif-body font-serif">
                  {t("paid_price")}
                </span>
                <span className="text-muted-foreground font-bold text-xl">
                  {t("paid_period")}
                </span>
              </div>
              <ul className="space-y-8 mb-14">
                <li className="flex items-center gap-5 text-muted-foreground text-lg serif-body font-serif">
                  <span className="material-symbols-outlined text-highlight">
                    task_alt
                  </span>
                  3 Device Activations
                </li>
                <li className="flex items-center gap-5 text-muted-foreground text-lg serif-body font-serif">
                  <span className="material-symbols-outlined text-highlight">
                    task_alt
                  </span>
                  All future updates included
                </li>
                <li className="flex items-center gap-5 text-muted-foreground text-lg serif-body font-serif">
                  <span className="material-symbols-outlined text-highlight">
                    task_alt
                  </span>
                  Lifetime local AI models
                </li>
              </ul>
              <a
                className="btn-warm block w-full text-center py-6 rounded-full font-bold text-2xl"
                href="https://verbaspeech.app/buy"
              >
                {t("paid_cta")}
              </a>
              <p className="mt-10 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                {t("guarantee")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-6"
          >
            <h3 className="text-4xl font-black text-primary mb-12 serif-body italic leading-tight font-serif">
              Better for you, <br />
              and your wallet.
            </h3>

            <div className="space-y-10">
              <div className="flex items-center justify-between py-6 border-b border-border">
                <span className="text-muted-foreground font-bold text-sm tracking-widest uppercase">
                  Cost
                </span>
                <div className="text-right">
                  <div className="text-accent font-black text-2xl serif-body font-serif">
                    {t("paid_price")} {t("paid_period")}
                  </div>
                  <div className="text-xs text-muted-foreground line-through opacity-40">
                    $120/year
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-6 border-b border-border">
                <span className="text-muted-foreground font-bold text-sm tracking-widest uppercase">
                  Data Privacy
                </span>
                <span className="text-primary font-black text-xl serif-body font-serif">
                  100% Private
                </span>
              </div>

              <div className="flex items-center justify-between py-6 border-b border-border">
                <span className="text-muted-foreground font-bold text-sm tracking-widest uppercase">
                  Account
                </span>
                <span className="text-primary font-black text-xl serif-body font-serif">
                  Not Needed
                </span>
              </div>

              <div className="flex items-center justify-between py-6">
                <span className="text-muted-foreground font-bold text-sm tracking-widest uppercase">
                  Offline
                </span>
                <span className="text-primary font-black text-xl serif-body font-serif">
                  Full support
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
