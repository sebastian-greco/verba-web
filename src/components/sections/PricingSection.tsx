import { useTranslations } from "next-intl";
import { ArrowUpRight, Check } from "lucide-react";
import { PRICE, BUY_URL, DOWNLOAD_URL } from "@/lib/constants";
import Reveal from "@/components/home/Reveal";

export default function PricingSection() {
  const t = useTranslations("pricing");
  return (
    <section className="section-space pricing-section" id="pricing">
      <div className="page-shell pricing-grid">
        <Reveal>
          <p className="eyebrow">{t("subheadline")}</p>
          <h2>{t("headline")}</h2>
          <div className="trial-block">
            <h3>{t("trial_label")}</h3>
            <p>{t("trial_desc")}</p>
            <a className="text-link" href={DOWNLOAD_URL}>
              {t("trial_cta")}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
        <Reveal className="price-card">
          <div className="price-card-top">
            <h3>{t("paid_label")}</h3>
            <ArrowUpRight size={24} aria-hidden="true" />
          </div>
          <div className="price-value">
            {PRICE}
            <span>{t("paid_period")}</span>
          </div>
          <p>{t("paid_desc")}</p>
          <ul className="benefit-list">
            {["paid_feature_1", "paid_feature_2", "paid_feature_3"].map(
              (key) => (
                <li key={key}>
                  <Check size={17} aria-hidden="true" />
                  {t(key)}
                </li>
              ),
            )}
          </ul>
          <a className="button-primary" href={BUY_URL}>
            {t("paid_cta")}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <p className="guarantee">{t("guarantee")}</p>
        </Reveal>
      </div>
    </section>
  );
}
