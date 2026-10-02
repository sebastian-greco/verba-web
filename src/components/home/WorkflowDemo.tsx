"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowDownLeft,
  AudioLines,
  CornerDownLeft,
  Pause,
  Play,
} from "lucide-react";
import MacOverlaySimulator from "@/components/ui/MacOverlaySimulator";
import Reveal from "@/components/home/Reveal";

export default function WorkflowDemo() {
  const t = useTranslations("demo");
  const r = useTranslations("redesign");
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [complete, setComplete] = useState(false);
  const animated = visible && !paused && !reducedMotion;
  useEffect(() => {
    if (!animated) return;
    const timer = window.setTimeout(
      () => setComplete((value) => !value),
      complete ? 1700 : 2300,
    );
    return () => window.clearTimeout(timer);
  }, [animated, complete]);
  const icons = [ArrowDownLeft, AudioLines, CornerDownLeft];

  return (
    <div ref={ref} className="workflow-demo">
      <div className="workflow-grid">
        {["hold", "speak", "done"].map((key, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={key} className="workflow-step" delay={i * 0.08}>
              <div className="step-top">
                <span className="step-number">{`0${i + 1}`}</span>
                <Icon size={20} aria-hidden="true" />
              </div>
              <div
                className={`step-visual native-step step-visual-${i}`}
                aria-hidden="true"
              >
                <MacOverlaySimulator
                  state={
                    i === 0
                      ? "idle"
                      : i === 1
                        ? "recording"
                        : complete || reducedMotion
                          ? "success"
                          : "processing"
                  }
                  animated={animated}
                />
                {i === 0 && (
                  <kbd>
                    {"fn"}
                    <span>↙</span>
                  </kbd>
                )}
                {i === 2 && (
                  <span className="typed-sample">
                    {r("step_sample")}
                    <i />
                  </span>
                )}
              </div>
              <h3>{t(`step_${key}`)}</h3>
              <p>{t(`step_0${i + 1}_desc`)}</p>
            </Reveal>
          );
        })}
      </div>
      {!reducedMotion && (
        <div className="workflow-motion-control">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
          >
            {paused ? (
              <Play size={12} aria-hidden="true" />
            ) : (
              <Pause size={12} aria-hidden="true" />
            )}
            {r(paused ? "resume_animation" : "pause_animation")}
          </button>
        </div>
      )}
    </div>
  );
}
