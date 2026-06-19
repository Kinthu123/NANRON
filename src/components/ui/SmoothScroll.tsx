"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis adds JS overhead to every touchmove event which lags on mobile CPUs.
    // Native touch scroll is hardware-accelerated. Framer Motion + GSAP work
    // fine with native scroll — they read window.scrollY directly.
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
