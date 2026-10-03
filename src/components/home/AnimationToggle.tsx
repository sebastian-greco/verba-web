"use client";

import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAnimationPreferences } from "@/components/home/AnimationPreferences";

export default function AnimationToggle() {
  const t = useTranslations("redesign");
  const { paused, togglePaused } = useAnimationPreferences();
  const Icon = paused ? Play : Pause;

  return (
    <button
      type="button"
      className="footer-animation-toggle"
      onClick={togglePaused}
    >
      <Icon size={12} aria-hidden="true" />
      {t(paused ? "resume_animation" : "pause_animation")}
    </button>
  );
}
