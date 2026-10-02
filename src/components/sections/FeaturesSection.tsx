import { useTranslations } from "next-intl";
import { Languages, History, Zap } from "lucide-react";
import Reveal from "@/components/home/Reveal";

export default function FeaturesSection() {
  const t = useTranslations("features");
  return (
    <section className="features-section section-space" id="features">
      <div className="page-shell">
        <Reveal className="section-heading">
          <p className="eyebrow">{t("subheadline")}</p>
          <h2>{t("headline")}</h2>
        </Reveal>
        <div className="feature-list">
          {[
            { icon: Languages, key: "languages" },
            { icon: History, key: "history" },
            { icon: Zap, key: "metal" },
          ].map(({ icon: Icon, key }, i) => (
            <Reveal key={key} className="feature-item" delay={i * 0.08}>
              <Icon size={27} strokeWidth={1.4} aria-hidden="true" />
              <h3>{t(`${key}_title`)}</h3>
              <p>{t(`${key}_desc`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
