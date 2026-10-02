import { useTranslations } from "next-intl";
import { Mail, MessageSquare, FileText } from "lucide-react";
import WorkflowDemo from "@/components/home/WorkflowDemo";
import { DEMO_VIDEO_URL, DEMO_POSTER_URL } from "@/lib/constants";
import Reveal from "@/components/home/Reveal";

export default function DemoSection() {
  const t = useTranslations("redesign");
  return (
    <section className="section-space use-cases-section" id="how-it-works">
      <div className="page-shell">
        <Reveal className="use-case-demo">
          <div>
            <h2>{t("video_title")}</h2>
            <p id="video-description" className="section-description">
              {t("video_description")}
            </p>
            <ul className="writing-uses">
              {[
                { icon: Mail, key: "use_emails" },
                { icon: MessageSquare, key: "use_prompts" },
                { icon: FileText, key: "use_notes" },
              ].map(({ icon: Icon, key }) => (
                <li key={key}>
                  <Icon size={16} aria-hidden="true" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
          <video
            controls
            playsInline
            preload="none"
            poster={DEMO_POSTER_URL}
            aria-label={t("video_accessible_label")}
          >
            <source src={DEMO_VIDEO_URL} type="video/mp4" />
          </video>
        </Reveal>
        <WorkflowDemo />
      </div>
    </section>
  );
}
