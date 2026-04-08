"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

type OverlayState =
  | "idle"
  | "recording"
  | "paused"
  | "processing"
  | "success"
  | "resetting"
  | "error";

type OverlayTheme = "light" | "dark";

/**
 * Theme tokens — sourced from OverlayController.swift (OverlayTheme.Colors).
 *
 * light: frosted glass on bright backgrounds (original web look)
 * dark:  matches native macOS HUD (.hudWindow NSVisualEffectView, dark appearance)
 */
const themes: Record<
  OverlayTheme,
  {
    background: string;
    border: string;
    boxShadow: string;
    backdropFilter: string;
    pauseButtonBg: string;
    pauseIconColor: string;
  }
> = {
  light: {
    background: "rgba(255, 255, 255, 0.20)",
    border: "1px solid rgba(255, 255, 255, 0.30)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    backdropFilter: "blur(16px) saturate(160%)",
    pauseButtonBg: "rgba(255, 255, 255, 1)",
    pauseIconColor: "rgba(0,0,0,0.30)",
  },
  dark: {
    // rgba(28,28,30) = macOS dark windowBackgroundColor
    background: "rgba(28, 28, 30, 0.85)",
    border: "1px solid rgba(255, 255, 255, 0.18)", // OverlayTheme.Colors.borderNormal
    boxShadow:
      "0 4px 20px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px) saturate(180%)", // approximates .hudWindow material
    pauseButtonBg: "rgba(255, 255, 255, 0.85)",
    pauseIconColor: "rgba(0,0,0,0.60)",
  },
};

export default function MacOverlaySimulator({
  isFinished = false,
  theme = "dark",
}: {
  isFinished?: boolean;
  /** Visual theme. "dark" matches the native macOS HUD; "light" is the frosted-glass look. Defaults to "dark". */
  theme?: OverlayTheme;
}) {
  const [state, setState] = useState<OverlayState>("recording");
  const [audioLevel, setAudioLevel] = useState(0.5);
  const [hasTriggered, setHasTriggered] = useState(false);

  const t = themes[theme];

  // Simulate audio level changes when recording
  useEffect(() => {
    if (state !== "recording") return;

    const interval = setInterval(() => {
      setAudioLevel(0.1 + Math.random() * 0.9);
    }, 150);

    return () => clearInterval(interval);
  }, [state]);

  // Handle triggered state transitions
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isFinished && !hasTriggered && state === "recording") {
      setHasTriggered(true);
      setState("processing");
    }

    if (state === "processing") {
      timeout = setTimeout(() => setState("success"), 2000);
    }

    if (state === "success") {
      timeout = setTimeout(() => setState("resetting"), 1000);
    }

    if (state === "resetting") {
      timeout = setTimeout(() => setState("recording"), 600);
    }

    if (!isFinished) {
      setHasTriggered(false);
      if (state !== "recording" && state !== "resetting") {
        setState("recording");
      }
    }

    return () => clearTimeout(timeout);
  }, [state, isFinished, hasTriggered]);

  return (
    <div
      className="relative inline-flex items-center gap-2.5 px-1.5 py-0.5 rounded-2xl shadow-2xl transition-all duration-300"
      style={{
        background: t.background,
        backdropFilter: t.backdropFilter,
        WebkitBackdropFilter: t.backdropFilter,
        border: t.border,
        boxShadow: t.boxShadow,
      }}
    >
      {/* Cancel Button — #ff453a matches OverlayTheme.Colors.red (macOS systemRed dark) */}
      <button
        className="transition-colors disabled:opacity-50"
        disabled={state !== "recording" && state !== "paused"}
      >
        <div
          className="w-[18px] h-[18px] rounded-full flex items-center justify-center hover:opacity-80"
          style={{ backgroundColor: "#ff453a" }}
        >
          <X size={10} className="text-white fill-current" strokeWidth={3} />
        </div>
      </button>

      {/* Animated Bars */}
      <AnimatedBars state={state} audioLevel={audioLevel} theme={theme} />

      {/* Pause/Play Button */}
      <button
        className="transition-opacity disabled:opacity-50"
        disabled={state !== "recording" && state !== "paused"}
      >
        <div
          className="w-[18px] h-[18px] rounded-full flex items-center justify-center hover:opacity-80"
          style={{ backgroundColor: t.pauseButtonBg }}
        >
          {state === "paused" ? (
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: t.pauseIconColor }}
              className="translate-x-px"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: t.pauseIconColor }}
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

/**
 * macOS system colors — dark-appearance variants (from OverlayTheme.Colors in OverlayController.swift).
 * The light theme uses slightly muted equivalents to show up on the frosted glass.
 */
const barColors: Record<OverlayTheme, Record<string, string>> = {
  dark: {
    success: "#30d158", // systemGreen dark
    processing: "#ffd60a", // systemYellow dark
    paused: "#ff9f0a", // systemOrange dark
    error: "#ff453a", // systemRed dark
    default: "rgba(255,255,255,0.9)", // OverlayTheme.Colors.white
  },
  light: {
    success: "#34c759", // systemGreen light
    processing: "#ffcc00", // systemYellow light
    paused: "#ff9500", // systemOrange light
    error: "#ff3b30", // systemRed light
    default: "rgba(255,255,255,1)", // white on frosted glass
  },
};

function AnimatedBars({
  state,
  audioLevel,
  theme,
}: {
  state: OverlayState;
  audioLevel: number;
  theme: OverlayTheme;
}) {
  const bars = 5;
  const baseHeight = 6;
  const maxAmp = 13;

  const [loadingPhase, setLoadingPhase] = useState(0);

  // Loading animation effect
  useEffect(() => {
    if (state !== "processing") return;
    const interval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % bars);
    }, 150);
    return () => clearInterval(interval);
  }, [state]);

  const getBarHeight = (index: number) => {
    if (state === "idle" || state === "error" || state === "resetting")
      return baseHeight;

    if (state === "success") return baseHeight + maxAmp;

    if (state === "processing") {
      return loadingPhase === index ? baseHeight + maxAmp : baseHeight;
    }

    if (state === "paused") {
      const pausedHeights = [0.3, 0.5, 0.7, 0.5, 0.3];
      return baseHeight + pausedHeights[index] * maxAmp;
    }

    if (state === "recording") {
      // Mirrors animationTime + sine logic from AnimatedBarsView.barHeight() in Swift
      const frequencies = [1.1, 1.6, 1.2, 1.8, 1.5];
      const time = Date.now() / 1000;
      const sineOffset =
        Math.sin(time * frequencies[index] * 2.0 * Math.PI) * 0.3;
      const sensitivity = 0.2 + 0.5 + sineOffset; // baseMultiplier=0.2
      const adjustedLevel = Math.max(0, audioLevel * sensitivity * 1.5); // amplificationFactor=1.5
      return baseHeight + adjustedLevel * maxAmp;
    }

    return baseHeight;
  };

  const getBarColor = () => {
    const c = barColors[theme];
    switch (state) {
      case "success":
        return c.success;
      case "processing":
        return c.processing;
      case "paused":
        return c.paused;
      case "error":
        return c.error;
      default:
        return c.default;
    }
  };

  return (
    <div className="flex items-center justify-center gap-[3px] w-[40px] h-[24px]">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-sm"
          style={{ backgroundColor: getBarColor() }}
          animate={{ height: getBarHeight(i) }}
          transition={{
            type: "tween",
            duration: state === "recording" ? 0.15 : 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
