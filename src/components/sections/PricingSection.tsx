"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const DOWNLOAD_URL = "https://verbaspeech.app/download";
const BUY_URL = "https://verbaspeech.app/buy";

export default function PricingSection() {
  const t = useTranslations("pricing");

  const trialFeatures = [t("trial_desc")];

  const paidFeatures = [t("paid_desc"), t("guarantee")];

  return (
    <section id="pricing" className="pt-24 pb-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="heading-serif text-4xl sm:text-5xl font-medium tracking-tight mb-4">
            {t("headline")}
          </h2>
          <p className="text-xl font-light text-muted-foreground">
            {t("subheadline")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 sm:p-10 flex flex-col relative group"
          >
            <p className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-4">
              {t("trial_label")}
            </p>
            <p className="heading-serif text-5xl font-medium mb-2">Free</p>
            <p className="text-sm text-muted-foreground mb-8 pb-8 border-b border-border/50">
              50 transcriptions
            </p>

            <div className="flex flex-col gap-4 mb-10 flex-1">
              {trialFeatures.map((f) => (
                <div
                  key={f}
                  className="flex gap-3 text-base text-foreground/80"
                >
                  <div className="mt-1 bg-primary/10 p-1 rounded-full h-fit">
                    <Check
                      className="w-3.5 h-3.5 text-primary shrink-0"
                      strokeWidth={3}
                    />
                  </div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-2xl h-14 bg-transparent border-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <a href={DOWNLOAD_URL}>{t("trial_cta")}</a>
            </Button>
          </motion.div>

          {/* Paid Tier */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-8 sm:p-10 flex flex-col relative border-primary/30 shadow-xl shadow-primary/5"
          >
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="text-xs bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider shadow-sm">
                {t("comparison_title")}
              </span>
            </div>
            <p className="text-sm font-semibold tracking-wider uppercase text-primary mb-4">
              {t("paid_label")}
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="heading-serif text-5xl font-medium">
                {t("paid_price")}
              </p>
              <p className="text-base text-muted-foreground">
                {t("paid_period")}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-8 pb-8 border-b border-border/50">
              3 devices · all updates
            </p>

            <div className="flex flex-col gap-4 mb-10 flex-1">
              {paidFeatures.map((f) => (
                <div
                  key={f}
                  className="flex gap-3 text-base text-foreground/80"
                >
                  <div className="mt-1 bg-primary/10 p-1 rounded-full h-fit">
                    <Check
                      className="w-3.5 h-3.5 text-primary shrink-0"
                      strokeWidth={3}
                    />
                  </div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="w-full rounded-2xl h-14 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
            >
              <a href={BUY_URL}>{t("paid_cta")}</a>
            </Button>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-panel overflow-hidden border-glass-border">
            <div className="grid grid-cols-3 bg-secondary/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground px-6 py-4 border-b border-glass-border">
              <span></span>
              <span className="text-center">
                {t("comparison_others_label")}
              </span>
              <span className="text-center text-primary">Verba</span>
            </div>
            {[
              [
                t("comparison_row_price"),
                t("comparison_others_price"),
                t("comparison_verba_price"),
              ],
              [
                t("comparison_row_cloud"),
                t("comparison_others_cloud"),
                t("comparison_verba_cloud"),
              ],
              [
                t("comparison_row_account"),
                t("comparison_others_account"),
                t("comparison_verba_account"),
              ],
            ].map(([label, other, verba], i) => (
              <div
                key={i}
                className="grid grid-cols-3 px-6 py-4 border-b last:border-0 border-glass-border text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span className="font-medium text-foreground/80 flex items-center">
                  {label}
                </span>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <X className="w-4 h-4 text-destructive/70 shrink-0" />
                  <span className="text-center font-medium">{other}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-center font-medium">{verba}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
