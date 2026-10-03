import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check, Sparkles, LockKeyhole } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import {
  CLEANUP_ORIGINAL_IMAGE_URL,
  CLEANUP_RESULT_IMAGE_URL,
} from "@/lib/constants";

export default function CleanupSection() {
  const t = useTranslations("cleanup");
  const r = useTranslations("redesign");
  return (
    <section className="section-space cleanup-section" id="cleanup">
      <div className="page-shell">
        <Reveal className="detail-grid cleanup-intro">
          <div>
            <p className="eyebrow">
              <Sparkles size={15} aria-hidden="true" />
              {t("headline")}
            </p>
            <h2>{r("cleanup_title")}</h2>
          </div>
          <div>
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
          </div>
        </Reveal>
        <div className="cleanup-proof">
          {[
            {
              src: CLEANUP_ORIGINAL_IMAGE_URL,
              label: "before_label",
              alt: "original_image_alt",
            },
            {
              src: CLEANUP_RESULT_IMAGE_URL,
              label: "after_label",
              alt: "cleaned_image_alt",
            },
          ].map(({ src, label, alt }, i) => (
            <Reveal key={label} delay={i * 0.15}>
              <figure>
                <figcaption className="eyebrow">{t(label)}</figcaption>
                <div className="cleanup-native-crop">
                  <Image
                    src={src}
                    alt={t(alt)}
                    width={1824}
                    height={1324}
                    sizes="(max-width: 767px) 160vw, 960px"
                  />
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
