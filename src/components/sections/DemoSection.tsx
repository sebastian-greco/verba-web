import { useTranslations } from "next-intl";
import WorkflowDemo from "@/components/home/WorkflowDemo";
import { DEMO_VIDEO_URL, DEMO_POSTER_URL } from "@/lib/constants";
import Reveal from "@/components/home/Reveal";

export default function DemoSection() {
  const t = useTranslations("demo");
  const r = useTranslations("redesign");
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
        <WorkflowDemo />
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
