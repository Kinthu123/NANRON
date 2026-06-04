"use client";

export default function HeroTitle() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
      <span className="absolute bottom-8 text-white/60 text-xs tracking-widest">
        Fashion Design Student · Rangsit University · Bangkok
      </span>

      <h1
        className="text-white leading-none tracking-[-0.01em]"
        style={{
          fontFamily: "var(--font-anton)",
          fontSize: "clamp(80px, 18vw, 260px)",
          display: "flex",
          gap: "0.2em",
        }}
      >
        {["NANG", "RON"].map((word, i) => (
          <span key={word} style={{ overflow: "hidden", display: "inline-block" }}>
            <span className="animate-word-up" style={{ animationDelay: `${i * 0.18}s` }}>
              {word}
            </span>
          </span>
        ))}
      </h1>

      <div className="flex flex-col items-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <span className="text-white text-[10px] tracking-[0.35em] font-light opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          SCROLL DOWN TO SEE
        </span>
        <div className="h-10 w-px bg-white/60" />
      </div>
    </div>
  );
}
