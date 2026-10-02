"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, Sparkles, LockKeyhole } from "lucide-react";
import Reveal from "@/components/home/Reveal";

export default function CleanupSection() {
  const t = useTranslations("cleanup");
  const r = useTranslations("redesign");
  const example = useRef<HTMLDivElement>(null);
  const visible = useInView(example, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  return (
    <section className="section-space cleanup-section" id="cleanup">
      <div className="page-shell detail-grid">
        <Reveal>
          <p className="eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            {t("headline")}
          </p>
          <h2>{r("cleanup_title")}</h2>
          <p className="section-description">{t("subheadline")}</p>
          <ul className="benefit-list">
            {["feature_fillers", "feature_grammar"].map((key) => (
              <li key={key}>
                <Check size={17} aria-hidden="true" />
                {t(key)}
              </li>
            ))}
          </ul>
          <p className="small-note">
            <LockKeyhole size={14} aria-hidden="true" />
            {t("note")}
          </p>
        </Reveal>
        <div
          ref={example}
          className="cleanup-comparison"
          data-reveal={visible && !reducedMotion ? "animate" : "static"}
        >
          <div className="cleanup-before">
            <span className="eyebrow">{t("before_label")}</span>
            <p>
              {t.rich("before_annotated", {
                filler: (chunks) => <span className="filler">{chunks}</span>,
              })}
            </p>
          </div>
          <div className="cleanup-connector" aria-hidden="true">
            <ArrowDown size={20} />
            <span />
            <Sparkles size={17} />
          </div>
          <div className="cleanup-after">
            <span className="eyebrow">{t("after_label")}</span>
            <p>{t("after_text")}</p>
            <div className="cleanup-local">
              <LockKeyhole size={12} aria-hidden="true" />
              {r("on_your_mac")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
