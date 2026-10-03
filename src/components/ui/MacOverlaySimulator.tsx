"use client";

import { X, Pause, Play } from "lucide-react";

export type OverlayState =
  | "idle"
  | "recording"
  | "paused"
  | "processing"
  | "success"
  | "resetting"
  | "error";

type OverlayTheme = "light" | "dark";

/**
 * The original native-style mock, now controlled by its surrounding demo.
 * Colors and proportions follow OverlayController.swift. Decorative controls
 * are deliberately not focusable: this illustration never accesses the mic.
 * CSS transforms keep waveforms deterministic during server rendering.
 */
export default function MacOverlaySimulator({
  state = "recording",
  theme = "dark",
  animated = true,
}: {
  state?: OverlayState;
  theme?: OverlayTheme;
  animated?: boolean;
}) {
  return (
    <div
      className="mac-overlay"
      data-state={state}
      data-theme={theme}
      data-animated={animated}
      aria-hidden="true"
    >
      <span className="mac-overlay-cancel">
        <X size={10} strokeWidth={3} />
      </span>
      <span className="mac-overlay-bars">
        {Array.from({ length: 5 }, (_, i) => (
          <i key={i} style={{ animationDelay: `${i * -0.17}s` }} />
        ))}
      </span>
      <span className="mac-overlay-pause">
        {state === "paused" ? (
          <Play size={9} fill="currentColor" />
        ) : (
          <Pause size={9} fill="currentColor" />
        )}
      </span>
    </div>
  );
}
