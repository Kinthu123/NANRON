"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/lola_9lola9/" },
  { label: "Email",     href: "mailto:ronkhambwar@gmail.com" },
];

export default function InfoSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".info-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="info" ref={ref} className="w-full bg-black text-white">

      {/* top rule */}
      <div className="mx-auto max-w-screen-xl px-8 md:px-16 lg:px-24">
        <div className="h-px w-full bg-white/15" />
      </div>

      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-12 px-6 py-16 md:gap-20 md:grid-cols-2 md:px-16 md:py-32 lg:px-24 md:items-start">

        {/* Left — about */}
        <div className="flex flex-col gap-10">
          <h2
            className="info-reveal leading-none tracking-tight text-white"
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
            }}
          >
            NANG RON
          </h2>

          <div className="info-reveal flex flex-col gap-4 text-white/70" style={{ maxWidth: "38ch" }}>
            <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)", lineHeight: 1.7 }}>
              Fashion Design Student at Rangsit University, Bangkok.
              Creating sculptural, concept-driven garments that explore
              tension between structure and movement.
            </p>
            <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)", lineHeight: 1.7 }}>
              AW 2025 collection — available for collaboration,
              internships, and creative projects.
            </p>
          </div>
        </div>

        {/* Right — contact + details */}
        <div className="flex flex-col gap-14 md:pt-4">

          {/* Contact links — large */}
          <div className="info-reveal flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Contact</span>
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-t border-white/10 pt-5 pb-2 text-white transition-opacity hover:opacity-50"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)", fontWeight: 300, letterSpacing: "-0.01em" }}
              >
                <span>{label}</span>
                <span className="text-2xl opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            ))}
            <div className="border-t border-white/10" />
          </div>

          {/* Availability */}
          <div className="info-reveal flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">Availability</span>
            <p className="text-white/70" style={{ fontSize: "clamp(0.9rem, 1.3vw, 1rem)", lineHeight: 1.7 }}>
              Open to internships, collaborations,<br />
              and creative projects — 2025.
            </p>
          </div>

          {/* School */}
          <div className="info-reveal flex flex-col gap-2 text-white/25 text-xs tracking-widest uppercase">
            <span>Rangsit University</span>
            <span>Faculty of Art &amp; Design</span>
            <span>Bangkok, Thailand</span>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="mx-auto max-w-screen-xl px-8 pb-10 md:px-16 lg:px-24">
        <div className="flex items-center justify-between text-white/20 text-xs tracking-widest uppercase">
          <span>© 2025 Nang Ron</span>
          <span>All rights reserved</span>
        </div>
      </div>

    </section>
  );
}
