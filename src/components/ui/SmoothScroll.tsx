"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouchDevice = navigator.maxTouchPoints > 0 || "ontouchstart" in window;

    const lenis = new Lenis({
      lerp: isTouchDevice ? 1 : 0.08,   // no lerp on touch = no lag behind finger
      smoothWheel: true,
      syncTouch: isTouchDevice,          // sync Lenis to native touch so animations stay smooth
      syncTouchLerp: 0.075,             // fast deceleration after finger lifts = feels native
    });

    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
