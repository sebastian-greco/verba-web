"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { DEMO_VIDEO_URL, DEMO_POSTER_URL } from "@/lib/constants";
import { useAnimationPreferences } from "@/components/home/AnimationPreferences";

export default function ProductDemo() {
  const t = useTranslations("redesign");
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const automaticPause = useRef(false);
  const visible = useInView(video, { amount: 0.5 });
  const { paused, reducedMotion } = useAnimationPreferences();

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    // Media preferences are only known in the browser. Apply looping after
    // hydration so the server and the first client render have identical markup.
    player.loop = reducedMotion === false;
    if (!visible || reducedMotion || paused) {
      if (!player.paused) {
        automaticPause.current = true;
        player.pause();
      }
    } else if (!manuallyPaused.current) {
      // Autoplay may be blocked by the browser or Low Power Mode; controls remain usable.
      void player.play().catch(() => {});
    }
  }, [visible, reducedMotion, paused]);

  return (
    <video
      ref={video}
      controls
      muted
      playsInline
      preload="none"
      width={1392}
      height={736}
      poster={DEMO_POSTER_URL}
      aria-label={t("video_accessible_label")}
      onPause={() => {
        // Visibility, the shared control, and OS preferences must not be
        // mistaken for the user explicitly pausing the native player.
        if (automaticPause.current) {
          automaticPause.current = false;
        } else {
          manuallyPaused.current = true;
        }
      }}
      onPlay={() => {
        manuallyPaused.current = false;
      }}
    >
      <source src={DEMO_VIDEO_URL} type="video/mp4" />
    </video>
  );
}
