"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeToMotion = (onChange: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const motionSnapshot = () => window.matchMedia(motionQuery).matches;
const serverMotionSnapshot = () => false;

type AnimationPreferences = {
  paused: boolean;
  reducedMotion: boolean;
  togglePaused: () => void;
};

const AnimationContext = createContext<AnimationPreferences | null>(null);

export function AnimationPreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  // The server snapshot also supplies the first hydration render. Subscribe to
  // OS changes so a preference changed while the page is open takes effect.
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    motionSnapshot,
    serverMotionSnapshot,
  );

  useEffect(() => {
    document.documentElement.dataset.animationsPaused = String(paused);
    return () => {
      delete document.documentElement.dataset.animationsPaused;
    };
  }, [paused]);

  return (
    <AnimationContext.Provider
      value={{ paused, reducedMotion, togglePaused: () => setPaused((value) => !value) }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationPreferences() {
  const preferences = useContext(AnimationContext);
  if (!preferences) {
    throw new Error("Animation preferences require AnimationPreferencesProvider");
  }
  return preferences;
}
