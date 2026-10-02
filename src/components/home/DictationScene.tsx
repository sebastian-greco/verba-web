"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Mail,
  LockKeyhole,
  Mic,
  RotateCcw,
  Paperclip,
  ArrowUp,
} from "lucide-react";
import MacOverlaySimulator, {
  type OverlayState,
} from "@/components/ui/MacOverlaySimulator";

// This email is fictional. Never load personal messages or recordings here.
export default function DictationScene() {
  const t = useTranslations("redesign");
  const [stage, setStage] = useState<OverlayState>("idle");
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setStage("recording"), 600);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);
  useEffect(() => {
    if (stage !== "recording" && stage !== "processing") return;
    const timer = window.setTimeout(
      () => setStage(stage === "recording" ? "processing" : "success"),
      stage === "recording" ? 2300 : 1200,
    );
    return () => window.clearTimeout(timer);
  }, [stage]);
  const busy = stage === "recording" || stage === "processing";

  return (
    <div className="dictation-scene email-scene" data-stage={stage}>
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
          <div className="demo-output" aria-live="polite" aria-atomic="true">
            {stage === "success" ? (
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
        <MacOverlaySimulator state={stage} animated={!reducedMotion} />
      </div>
      <div className="scene-control">
        <button
          type="button"
          className="demo-play"
          disabled={busy}
          onClick={() => setStage("recording")}
        >
          {stage === "success" ? (
            <RotateCcw size={15} aria-hidden="true" />
          ) : (
            <Mic size={15} aria-hidden="true" />
          )}
          {t(
            stage === "processing"
              ? "demo_processing"
              : stage === "recording"
                ? "demo_speaking"
                : stage === "success"
                  ? "demo_replay"
                  : "demo_play",
          )}
        </button>
        <span>{t("demo_caption")}</span>
        <span className="scene-privacy">
          <LockKeyhole size={11} aria-hidden="true" />
          {t("never_uploaded")}
        </span>
      </div>
    </div>
  );
}
