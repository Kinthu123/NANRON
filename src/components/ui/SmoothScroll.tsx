"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip Lenis on any touch-capable device — it intercepts touchmove and breaks 1-finger scroll
    if (navigator.maxTouchPoints > 0 || "ontouchstart" in window) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

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
