"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "The Fabric Remembers.",
  "Tension Holds the Form.",
  "Built, Not Just Made.",
];

export default function TextRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll<HTMLElement>(".text-line").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 55 },
          {
            opacity: 1, y: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reset",
            },
          }
        );
      });

      gsap.to(".phrases-inner", {
        opacity: 0, y: -40,
        ease: "power2.in",
        scrollTrigger: {
          trigger: section,
          start: "bottom 70%",
          end: "bottom 10%",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="phrases" ref={sectionRef} className="w-full bg-black">

      {/* ── Mobile layout — photo top, text overlaid ── */}
      <div className="md:hidden relative">
        <div className="relative w-full" style={{ height: "420px" }}>
          <Image
            src="/images/phrases-side.jpg"
            alt="Designer fitting the white spiked garment"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* gradient fade to black */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

          {/* CONCEPT label */}
          <span className="absolute top-6 left-6 text-white/45 text-[9px] tracking-[0.28em] uppercase">
            CONCEPT
          </span>
        </div>

        {/* Text below the image */}
        <div className="px-6 pt-6 pb-10 flex flex-col gap-4">
          {lines.map((text, i) => (
            <p
              key={i}
              className="text-line text-white font-bold"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "clamp(1.3rem, 5.5vw, 1.7rem)",
                lineHeight: 1.1,
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* ── Desktop layout — side by side ── */}
      <div className="phrases-inner hidden md:flex mx-auto max-w-screen-xl items-center gap-16 px-8 min-h-screen py-12 md:px-16 lg:px-24">

        {/* Left — text */}
        <div className="flex flex-1 flex-col gap-4">
          {lines.map((text, i) => (
            <p
              key={i}
              className="text-line text-white"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "clamp(1.4rem, 3.2vw, 3.8rem)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Right — image */}
        <div
          className="relative w-[38%] shrink-0 overflow-hidden rounded-2xl"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src="/images/phrases-side.jpg"
            alt="Designer fitting the white spiked garment"
            fill
            className="object-cover object-center"
            sizes="38vw"
          />
        </div>
      </div>

    </section>
  );
}
