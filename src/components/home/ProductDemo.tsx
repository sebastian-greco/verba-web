"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DEMO_VIDEO_URL, DEMO_POSTER_URL } from "@/lib/constants";

export default function ProductDemo() {
  const t = useTranslations("redesign");
  const video = useRef<HTMLVideoElement>(null);
  const started = useRef(false);
  const visible = useInView(video, { amount: 0.5 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    // Media preferences are only known in the browser. Apply looping after
    // hydration so the server and the first client render have identical markup.
    player.loop = reducedMotion === false;
    if (!visible || reducedMotion) {
      player.pause();
    } else if (reducedMotion === false && !started.current) {
      started.current = true;
      // Autoplay may be blocked by the browser or Low Power Mode; controls remain usable.
      void player.play().catch(() => {});
    }
  }, [visible, reducedMotion]);

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
    >
      <source src={DEMO_VIDEO_URL} type="video/mp4" />
    </video>
  );
}
