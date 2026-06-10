"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home",       href: "#home" },
  { label: "Collection", href: "#collection" },
  { label: "Info",       href: "#info" },
];

const BRAND = "NANG RON";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STEPS = 8;

function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);

  const run = () => {
    cancelAnimationFrame(rafRef.current);
    const chars = text.split("");
    const revealed = new Array(chars.length).fill(0);
    const tick = () => {
      const next = chars.map((ch, i) => {
        if (ch === " " || ch === ",") return ch;
        if (revealed[i] >= STEPS) return ch;
        revealed[i]++;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(next.join(""));
      if (next.join("") !== text) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const t = setTimeout(run, 300);
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { display, run };
}

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active,   setActive]     = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { display: brand, run: scramble } = useScramble(BRAND);

  useEffect(() => {
    const ids = ["home", "gallery", "phrases", "collection", "info"];
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
      const midY = window.innerHeight * 0.9;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= midY) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [collectionProgress, setCollectionProgress] = useState(0);
  useEffect(() => {
    const collEl = document.getElementById("collection");
    if (!collEl) return;
    const update = () => {
      const scrollable = collEl.offsetHeight - window.innerHeight;
      const p = scrollable > 0
        ? Math.max(0, Math.min(1, (window.scrollY - collEl.offsetTop) / scrollable))
        : 0;
      setCollectionProgress(p);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  const isGallery         = active === "gallery";
  const isCollection      = active === "collection";
  const isCollectionLight = isCollection && collectionProgress > 0.18;
  const isLight           = isGallery || isCollectionLight;
  const textColor         = isLight ? "text-black" : "text-white";

  const navBg = mobileOpen
    ? "bg-black"
    : isLight
    ? "bg-white/90 backdrop-blur-sm"
    : scrolled || isCollection
    ? "bg-black/90 backdrop-blur-sm"
    : "bg-transparent";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center px-6 md:px-8 py-6 md:py-7 transition-colors duration-300 ${navBg}`}>

        {/* Left — desktop nav links */}
        <div className={`hidden md:flex gap-8 text-sm tracking-wider ${textColor}`}>
          {navLinks.map(({ label, href }) => (
            <button key={label}
              onClick={() => scrollToSection(href)}
              className={`transition-opacity duration-200 hover:opacity-60 bg-transparent border-0 p-0 ${
                active === href.replace("#", "") ? "font-bold" : "font-normal"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger — colour tracks navbar text so it's always visible */}
        <button
          className={`md:hidden ml-auto flex flex-col gap-[5px] cursor-pointer p-1 ${mobileOpen ? "text-white" : textColor}`}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-[1.5px] bg-current origin-center transition-all duration-300 ${mobileOpen ? "translate-y-[3.3px] rotate-45" : ""}`} />
          <span className={`block w-[22px] h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-[22px] h-[1.5px] bg-current origin-center transition-all duration-300 ${mobileOpen ? "-translate-y-[3.3px] -rotate-45" : ""}`} />
        </button>

        {/* Centre — brand */}
        <span
          className={`absolute left-1/2 -translate-x-1/2 text-sm tracking-widest transition-colors duration-300 cursor-pointer ${
            mobileOpen ? "text-white" : textColor
          }`}
          style={{ minWidth: "8rem", textAlign: "center", display: "inline-block" }}
          onMouseEnter={scramble}
        >
          {brand}
        </span>

        {/* Right — language (desktop only) */}
        <div className={`ml-auto hidden md:flex items-center gap-2 text-sm tracking-wider ${textColor}`}>
          <a href="#" className="hover:opacity-60 transition-opacity">Eng</a>
          <span className="opacity-40">·</span>
          <a href="#" className="hover:opacity-60 transition-opacity">Thai</a>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`fixed inset-0 z-40 bg-black flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <nav className="flex flex-col gap-2 mt-16">
          {navLinks.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => { scrollToSection(href); setMobileOpen(false); }}
              className="text-white leading-none tracking-tight transition-opacity hover:opacity-50 bg-transparent border-0 p-0 text-left"
              style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(3.5rem, 18vw, 5.5rem)" }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-16 flex gap-6 text-white/50 text-sm tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Eng</a>
          <a href="#" className="hover:text-white transition-colors">Thai</a>
        </div>
      </div>
    </>
  );
}
