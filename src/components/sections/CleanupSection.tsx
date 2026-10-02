"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Check, Sparkles, LockKeyhole } from "lucide-react";
import Reveal from "@/components/home/Reveal";

export default function CleanupSection() {
  const t = useTranslations("cleanup");
  const r = useTranslations("redesign");
  const [clean, setClean] = useState(true);
  return (
    <section className="section-space cleanup-section">
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
        <Reveal className="cleanup-example">
          <div className="cleanup-toolbar">
            <span>{t("headline")}</span>
            <button
              type="button"
              className="cleanup-switch"
              role="switch"
              aria-checked={clean}
              aria-label={t("headline")}
              onClick={() => setClean(!clean)}
            >
              <span />
            </button>
          </div>
          <div className="cleanup-text" aria-live="polite">
            <span className="eyebrow">
              {t(clean ? "after_label" : "before_label")}
            </span>
            <p key={String(clean)}>{t(clean ? "after_text" : "before_text")}</p>
          </div>
          <div className="cleanup-status">
            <Sparkles size={15} aria-hidden="true" />
            {t(clean ? "status_active" : "status_inactive")}
          </div>
          <p className="example-caption">{r("example_caption")}</p>
        </Reveal>
      </div>
    </section>
  );
}
