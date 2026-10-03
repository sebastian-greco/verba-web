import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { useTranslations } from "next-intl";
import {
  AudioLines,
  FileText,
  LockKeyhole,
  WifiOff,
  ScanEye,
} from "lucide-react";
import Reveal from "@/components/home/Reveal";

export default function PrivacySection() {
  const t = useTranslations("redesign");
  return (
    <section className="privacy-section" id="privacy">
      <div className="page-shell">
        <Reveal className="privacy-layout">
          <div className="privacy-copy">
            <p className="eyebrow">{t("privacy_eyebrow")}</p>
            <h2>
              {t("privacy_title_1")}
              <br />
              <em>{t("privacy_title_2")}</em>
            </h2>
            <p className="section-description">{t("privacy_description")}</p>
          </div>
          <div
            className="local-diagram"
            role="img"
            aria-label={t("diagram_alt")}
          >
            <div className="device-frame">
              <span className="device-camera" aria-hidden="true" />
              <div className="device-screen">
                <div className="device-top">
                  <span>{t("on_your_mac")}</span>
                  <LockKeyhole size={14} aria-hidden="true" />
                </div>
                <div className="device-content">
                  <div className="local-flow">
                    <AudioLines size={28} aria-hidden="true" />
                    <span className="flow-line" />
                    <div className="local-core">
                      <Image
                        src="/verba-logo.svg"
                        alt=""
                        width={46}
                        height={37}
                      />
                    </div>
                    <span className="flow-line" />
                    <FileText size={28} aria-hidden="true" />
                  </div>
                  <div className="flow-labels">
                    <span>{t("flow_voice")}</span>
                    <span>{APP_NAME}</span>
                    <span>{t("flow_words")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="device-base" aria-hidden="true" />
          </div>
        </Reveal>
        <div className="privacy-principles">
          {[
            { icon: LockKeyhole, key: "audio" },
            { icon: ScanEye, key: "tracking" },
            { icon: WifiOff, key: "offline" },
          ].map(({ icon: Icon, key }, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <Icon size={22} aria-hidden="true" />
              <h3>{t(`${key}_title`)}</h3>
              <p>{t(`${key}_description`)}</p>
            </Reveal>
          ))}
        </div>
        <p className="privacy-footnote">{t("connection_note")}</p>
      </div>
    </section>
  );
}
