import { useTranslations } from "next-intl";
import { ArrowDownToLine } from "lucide-react";
import { DOWNLOAD_URL } from "@/lib/constants";
import Reveal from "@/components/home/Reveal";

export default function CtaSection() {
  const t = useTranslations("cta_block");
  const r = useTranslations("redesign");
  return (
    <section className="closing-section">
      <Reveal className="page-shell">
        <p className="eyebrow">{r("closing_eyebrow")}</p>
        <h2>{t("headline")}</h2>
        <a className="button-primary" href={DOWNLOAD_URL}>
          <ArrowDownToLine size={18} aria-hidden="true" />
          {t("button")}
        </a>
        <p className="hero-note">{t("note")}</p>
      </Reveal>
    </section>
  );
}
