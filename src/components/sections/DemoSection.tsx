import { useTranslations } from "next-intl";
import { ArrowDownLeft, AudioLines, CornerDownLeft } from "lucide-react";
import { DEMO_VIDEO_URL, DEMO_POSTER_URL } from "@/lib/constants";
import Reveal from "@/components/home/Reveal";

export default function DemoSection() {
  const t = useTranslations("demo");
  const r = useTranslations("redesign");
  const icons = [ArrowDownLeft, AudioLines, CornerDownLeft];
  return (
    <section className="section-space" id="how-it-works">
      <div className="page-shell">
        <Reveal className="section-heading split-heading">
          <div>
            <p className="eyebrow">{r("workflow_eyebrow")}</p>
            <h2>{t("headline")}</h2>
          </div>
          <p className="section-description">{r("workflow_description")}</p>
        </Reveal>
        <div className="workflow-grid">
          {["hold", "speak", "done"].map((key, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={key} className="workflow-step" delay={i * 0.08}>
                <div className="step-top">
                  <span className="step-number">{`0${i + 1}`}</span>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div
                  className={`step-visual step-visual-${i}`}
                  aria-hidden="true"
                >
                  {i === 0 ? (
                    <kbd>
                      {"fn"}
                      <span>↙</span>
                    </kbd>
                  ) : i === 1 ? (
                    <div className="static-wave">
                      {Array.from({ length: 23 }, (_, n) => (
                        <i key={n} style={{ height: 10 + ((n * 17) % 57) }} />
                      ))}
                    </div>
                  ) : (
                    <span className="typed-sample">
                      {r("step_sample")}
                      <i />
                    </span>
                  )}
                </div>
                <h3>{t(`step_${key}`)}</h3>
                <p>{t(`step_0${i + 1}_desc`)}</p>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="real-demo">
          <div>
            <p className="eyebrow">{r("video_eyebrow")}</p>
            <h3>{r("video_title")}</h3>
            <p id="video-description">{r("video_description")}</p>
          </div>
          <video
            controls
            playsInline
            preload="none"
            poster={DEMO_POSTER_URL}
            aria-label={r("video_title")}
            aria-describedby="video-description"
          >
            <source src={DEMO_VIDEO_URL} type="video/mp4" />
          </video>
        </Reveal>
      </div>
    </section>
  );
}
