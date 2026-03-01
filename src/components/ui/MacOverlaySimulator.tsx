"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Pause, X } from "lucide-react";

type OverlayState =
  | "idle"
  | "recording"
  | "paused"
  | "processing"
  | "success"
  | "resetting"
  | "error";

export default function MacOverlaySimulator({
  isFinished = false,
}: {
  isFinished?: boolean;
}) {
  const [state, setState] = useState<OverlayState>("recording");
  const [audioLevel, setAudioLevel] = useState(0.5);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Simulate audio level changes when recording
  useEffect(() => {
    if (state !== "recording") return;

    const interval = setInterval(() => {
      // Random bouncy audio levels between 0.1 and 1.0
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
      timeout = setTimeout(() => setState("success"), 2000); // 2 seconds processing
    }

    if (state === "success") {
      timeout = setTimeout(() => setState("resetting"), 1000); // 1s green success -> resetting
    }

    if (state === "resetting") {
      timeout = setTimeout(() => setState("recording"), 600); // 0.6s white full height -> back to active recording
    }

    if (!isFinished) {
      setHasTriggered(false);
      if (state !== "recording" && state !== "resetting") {
        setState("recording"); // Reset if user scrolls back up
      }
    }

    return () => clearTimeout(timeout);
  }, [state, isFinished, hasTriggered]);

  return (
    <div className="relative inline-flex items-center gap-2.5 px-1.5 py-0.5 bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl transition-all duration-300">
      {/* Cancel Button */}
      <button
        className="transition-colors disabled:opacity-50"
        disabled={state !== "recording" && state !== "paused"}
      >
        <div className="w-[18px] h-[18px] rounded-full bg-[#ff453a] flex items-center justify-center hover:opacity-80">
          <X size={10} className="text-white fill-current" strokeWidth={3} />
        </div>
      </button>

      {/* Animated Bars */}
      <AnimatedBars state={state} audioLevel={audioLevel} />

      {/* Pause/Play Button */}
      <button
        className="transition-opacity disabled:opacity-50"
        disabled={state !== "recording" && state !== "paused"}
      >
        <div className="w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center hover:opacity-80">
          {state === "paused" ? (
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-black/30 translate-x-[1px]"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-black/30"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

function AnimatedBars({
  state,
  audioLevel,
}: {
  state: OverlayState;
  audioLevel: number;
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
      // Simulate the distinct frequencies logic from Swift
      const frequencies = [1.1, 1.6, 1.2, 1.8, 1.5];
      const time = Date.now() / 1000;
      const sineOffset =
        Math.sin(time * frequencies[index] * 2.0 * Math.PI) * 0.3;
      const sensitivity = 0.2 + 0.5 + sineOffset;
      const adjustedLevel = Math.max(0, audioLevel * sensitivity * 1.5);
      return baseHeight + adjustedLevel * maxAmp;
    }

    return baseHeight;
  };

  const getBarColor = () => {
    switch (state) {
      case "success":
        return "bg-[#34c759]"; // macOS system green
      case "processing":
        return "bg-[#ffcc00]"; // macOS system yellow
      case "paused":
        return "bg-[#ff9500]"; // macOS system orange
      case "error":
        return "bg-[#ff3b30]"; // macOS system red
      case "resetting":
      default:
        return "bg-white";
    }
  };

  return (
    <div className="flex items-center justify-center gap-[3px] w-[40px] h-[24px]">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-1 rounded-sm ${getBarColor()}`}
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
