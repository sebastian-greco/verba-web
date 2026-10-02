import { useTranslations } from "next-intl";
import { ArrowDown, ArrowDownToLine, Check } from "lucide-react";
import { DOWNLOAD_URL } from "@/lib/constants";
import Reveal from "@/components/home/Reveal";
import DictationScene from "@/components/home/DictationScene";

export default function HeroSection() {
  const t = useTranslations("redesign");
  const hero = useTranslations("hero");
  return (
    <section className="home-hero">
      <div className="page-shell hero-grid">
        <Reveal className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            {t("eyebrow")}
          </p>
          <h1>
            {t("hero_line_1")}
            <br />
            {t("hero_line_2")}
            <br />
            <em>{t("hero_line_3")}</em>
          </h1>
          <p className="hero-description">{t("hero_description")}</p>
          <div className="hero-actions">
            <a className="button-primary" href={DOWNLOAD_URL}>
              <ArrowDownToLine size={18} aria-hidden="true" />
              {hero("cta_primary")}
            </a>
            <a className="text-link" href="#how-it-works">
              {t("see_how")}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-note">{hero("note")}</p>
        </Reveal>
        <Reveal className="hero-visual" delay={0.12}>
          <DictationScene />
        </Reveal>
      </div>
      <div className="page-shell">
        <div className="privacy-strip">
          {["promise_local", "promise_tracking", "promise_account"].map(
            (key) => (
              <span key={key}>
                <Check size={16} aria-hidden="true" />
                {t(key)}
              </span>
            ),
          )}
          <a href="#privacy">
            {t("privacy_link")}
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
