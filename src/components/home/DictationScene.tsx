"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Check, LockKeyhole, Mic, RotateCcw } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

// Deliberately fictional content: never load recordings or personal screenshots.
export default function DictationScene() {
  const t = useTranslations("redesign");
  const [stage, setStage] = useState<"ready" | "speaking" | "done">("ready");
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setStage("speaking"), 600);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);
  useEffect(() => {
    if (stage !== "speaking") return;
    const timer = window.setTimeout(() => setStage("done"), 2800);
    return () => window.clearTimeout(timer);
  }, [stage]);

  return (
    <div className="dictation-scene" data-stage={stage}>
      <div className="scene-orbit scene-orbit-one" aria-hidden="true" />
      <div className="scene-orbit scene-orbit-two" aria-hidden="true" />
      <div className="scene-label">
        <span className="status-dot" />
        {t("on_your_mac")}
      </div>
      <div className="note-window">
        <div className="window-toolbar">
          <div className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>{t("demo_app")}</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </div>
        <div className="note-paper">
          <span className="eyebrow">{t("demo_date")}</span>
          <h2>{t("demo_title")}</h2>
          <div className="note-rule" />
          <p>{t("demo_intro")}</p>
          <div className="demo-output" aria-live="polite" aria-atomic="true">
            {stage === "done" ? (
              <p className="written-text">{t("demo_text")}</p>
            ) : (
              <div className="writing-placeholder" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
          <div className="note-footer">
            <LockKeyhole size={13} aria-hidden="true" />
            {t("never_uploaded")}
          </div>
        </div>
      </div>
      <div className="recording-pill" aria-hidden="true">
        <span className="pill-brand">{APP_NAME}</span>
        <div className="waveform">
          {Array.from({ length: 27 }, (_, i) => (
            <i
              key={i}
              style={{
                height: `${8 + ((i * 13) % 25)}px`,
                animationDelay: `${i * 47}ms`,
              }}
            />
          ))}
        </div>
        {stage === "done" ? <Check size={18} /> : <Mic size={18} />}
      </div>
      <div className="scene-control">
        <button
          type="button"
          className="demo-play"
          disabled={stage === "speaking"}
          onClick={() => setStage("speaking")}
        >
          {stage === "done" ? (
            <RotateCcw size={15} aria-hidden="true" />
          ) : (
            <Mic size={15} aria-hidden="true" />
          )}
          {t(
            stage === "speaking"
              ? "demo_speaking"
              : stage === "done"
                ? "demo_replay"
                : "demo_play",
          )}
        </button>
        <span>{t("demo_caption")}</span>
      </div>
    </div>
  );
}
