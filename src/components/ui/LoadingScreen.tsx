"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "name" | "line" | "counter" | "exit" | "done";

export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("name");
  const lineRef = useRef<HTMLDivElement>(null);

  // counter tick
  useEffect(() => {
    if (phase !== "counter") return;
    if (count >= 100) {
      const t = setTimeout(() => setPhase("exit"), 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => Math.min(c + 3, 100)), 20);
    return () => clearTimeout(t);
  }, [phase, count]);

  // phase sequencing
  useEffect(() => {
    if (phase === "name") {
      const t = setTimeout(() => setPhase("line"), 800);
      return () => clearTimeout(t);
    }
    if (phase === "line") {
      const t = setTimeout(() => setPhase("counter"), 700);
      return () => clearTimeout(t);
    }
    if (phase === "exit") {
      const t = setTimeout(() => setPhase("done"), 600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // lock scroll during load
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  }, []);

  // explicitly release scroll lock — returning null does NOT unmount the component
  // so the cleanup function above never fires; we must release it manually
  useEffect(() => {
    if (phase === "exit") window.scrollTo(0, 0);
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  const words = ["NANG", "RON"];
  const nameVisible = phase === "name" || phase === "line" || phase === "counter" || phase === "exit";
  const lineVisible = phase === "line" || phase === "counter" || phase === "exit";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
      style={{
        transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition: phase === "exit" ? "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
      }}
    >
      {/* Name */}
      <div className="flex gap-[0.2em] mb-6">
        {words.map((word, i) => (
          <span key={word} className="overflow-hidden inline-block" style={{ fontFamily: "var(--font-anton)" }}>
            <span
              className="inline-block text-white leading-none"
              style={{
                fontSize: "clamp(72px, 16vw, 220px)",
                transform: nameVisible ? "translateY(0)" : "translateY(110%)",
                opacity: nameVisible ? 1 : 0,
                transition: `transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.12}s, opacity 0.4s ease ${i * 0.12}s`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </div>

      {/* Line */}
      <div className="relative w-[clamp(240px,40vw,560px)] h-px bg-white/20">
        <div
          ref={lineRef}
          className="absolute inset-y-0 left-0 bg-white"
          style={{
            width: lineVisible
              ? phase === "line" ? "100%" : `${count}%`
              : "0%",
            transition: phase === "line"
              ? "width 0.65s cubic-bezier(0.22, 1, 0.36, 1)"
              : phase === "counter"
              ? "width 0.05s linear"
              : "none",
          }}
        />
      </div>

      {/* Counter */}
      <div
        className="mt-4 text-white/50 text-[10px] tracking-[0.4em]"
        style={{
          opacity: phase === "counter" || phase === "exit" ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {String(count).padStart(3, "0")}
      </div>
    </div>
  );
}
