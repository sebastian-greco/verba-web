"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Mail,
  LockKeyhole,
  Pause,
  Play,
  Paperclip,
  ArrowUp,
} from "lucide-react";
import MacOverlaySimulator, {
  type OverlayState,
} from "@/components/ui/MacOverlaySimulator";

// This email is fictional. Never load personal messages or recordings here.
export default function DictationScene() {
  const t = useTranslations("redesign");
  const scene = useRef<HTMLDivElement>(null);
  const visible = useInView(scene, { amount: 0.2 });
  const [stage, setStage] = useState<OverlayState>("idle");
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const animated = visible && reducedMotion === false && !paused;
  const displayStage = reducedMotion ? "success" : stage;

  useEffect(() => {
    if (!animated) return;
    const next: Partial<Record<OverlayState, [OverlayState, number]>> = {
      idle: ["recording", 600],
      recording: ["processing", 2300],
      processing: ["success", 1200],
      success: ["idle", 5000],
    };
    const transition = next[stage];
    if (!transition) return;
    const timer = window.setTimeout(
      () => setStage(transition[0]),
      transition[1],
    );
    return () => window.clearTimeout(timer);
  }, [animated, stage]);

  return (
    <div
      ref={scene}
      className="dictation-scene email-scene"
      data-stage={displayStage}
    >
      <div className="scene-orbit scene-orbit-one" aria-hidden="true" />
      <div className="scene-orbit scene-orbit-two" aria-hidden="true" />
      <div className="note-window email-window">
        <div className="window-toolbar">
          <div className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>
            <Mail size={12} aria-hidden="true" />
            {t("demo_app")}
          </span>
          <span>{t("email_draft")}</span>
        </div>
        <div className="email-fields">
          <div>
            <span>{t("email_to")}</span>
            <span className="email-recipient">{t("email_recipient")}</span>
          </div>
          <div>
            <span>{t("email_subject")}</span>
            <strong>{t("demo_title")}</strong>
          </div>
        </div>
        <div className="email-body">
          <p>{t("demo_intro")}</p>
          <div className="demo-output">
            {displayStage === "success" ? (
              <p className="written-text">{t("demo_text")}</p>
            ) : (
              <div className="writing-placeholder" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </div>
        <div className="email-compose-footer" aria-hidden="true">
          <span className="email-send">
            {t("email_send")}
            <ArrowUp size={13} />
          </span>
          <Paperclip size={16} />
          <span>{t("email_saved")}</span>
        </div>
      </div>
      <div className="hero-native-overlay">
        <MacOverlaySimulator state={displayStage} animated={animated} />
      </div>
      <div className="scene-control hero-loop-control">
        <span className="scene-privacy">
          <LockKeyhole size={11} aria-hidden="true" />
          {t("never_uploaded")}
        </span>
        {!reducedMotion && (
          <button
            type="button"
            className="scene-pause"
            onClick={() => setPaused((value) => !value)}
            aria-label={t(paused ? "resume_animation" : "pause_animation")}
            title={t(paused ? "resume_animation" : "pause_animation")}
          >
            {paused ? (
              <Play size={12} aria-hidden="true" />
            ) : (
              <Pause size={12} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
