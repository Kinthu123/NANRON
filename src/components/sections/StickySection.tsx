"use client";

import CurvedLoop from "@/components/ui/CurvedLoop";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const cards = [
  { id: 1, src: "/images/sticky/sticky-1.jpg", title: "Teal Collection", subtitle: "AW 2025" },
  { id: 2, src: "/images/sticky/sticky-2.jpg", title: "White Series",    subtitle: "AW 2025" },
  { id: 3, src: "/images/sticky/sticky-3.jpg", title: "Avant-Garde",     subtitle: "SS 2025" },
];

const TOTAL = cards.length;

export default function StickySection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // single fade: black → warm off-white over the first ~40% of the section scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["#000000", "#f5f0eb"]
  );

  // flip marquee text dark once background is light enough
  const [lightBg, setLightBg] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setLightBg(p > 0.18);
  });

  return (
    <motion.section
      id="collection"
      ref={container}
      className="relative"
      style={{ height: `${TOTAL * 100 + 80}vh`, backgroundColor }}
    >
      {/* ── Title — CurvedLoop marquee ── */}
      <div
        className="flex h-[22vh] md:h-[28vh] items-center justify-center"
        style={{ color: lightBg ? "#111111" : "#ffffff", transition: "color 0.5s ease" }}
      >
        <CurvedLoop
          marqueeText="AW 2025 ✦ Rangsit University ✦ Bangkok ✦ Fashion Design ✦"
          speed={2}
          curveAmount={0}
          direction="left"
          interactive={true}
        />
      </div>

      {/* ── Cards ── */}
      {cards.map((card, i) => (
        <Card
          key={card.id}
          card={card}
          index={i}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </motion.section>
  );
}

type CardProps = {
  card: (typeof cards)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
};

function Card({ card, index, scrollYProgress }: CardProps) {
  const isLast = index === TOTAL - 1;

  const step        = 1 / (TOTAL + 1);
  const shrinkStart = (index + 2) * step;
  const shrinkEnd   = isLast ? 1 : (index + 3) * step;

  const scale  = useTransform(scrollYProgress, [shrinkStart, shrinkEnd], [1, isLast ? 1 : 0.85]);
  const rotate = useTransform(scrollYProgress, [shrinkStart, shrinkEnd], [0, isLast ? 0 : index % 2 === 0 ? -3 : 3]);
  const dim    = useTransform(scrollYProgress, [shrinkStart, shrinkEnd], ["brightness(1)", isLast ? "brightness(1)" : "brightness(0.6)"]);

  return (
    <div
      className="sticky top-0 flex h-screen w-full items-center justify-center"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="relative w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-4xl overflow-hidden rounded-2xl md:rounded-3xl"
        style={{ scale, rotate, filter: dim, height: "78vh" }}
      >
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
          priority={index === 0}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
          <p className="mb-1 md:mb-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/60"
            style={{ fontFamily: "Roc Grotesk, Arial, sans-serif" }}>
            {card.subtitle}
          </p>
          <h3 className="text-2xl md:text-4xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-anton)" }}>
            {card.title}
          </h3>
        </div>

        <div className="absolute right-6 top-6 md:right-10 md:top-10 text-5xl md:text-7xl font-bold text-white/40"
          style={{ fontFamily: "var(--font-anton)" }}>
          0{card.id}
        </div>
      </motion.div>
    </div>
  );
}
