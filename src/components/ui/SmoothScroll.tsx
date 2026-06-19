"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouchDevice = navigator.maxTouchPoints > 0 || "ontouchstart" in window;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      // syncTouch syncs Lenis to native touch velocity — no lag behind finger,
      // but keeps scroll-linked animations (parallax, sticky) running smoothly
      syncTouch: isTouchDevice,
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
