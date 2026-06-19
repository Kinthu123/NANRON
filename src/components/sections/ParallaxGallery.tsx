"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-6.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-8.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-10.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-11.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-7.jpg",
  "/images/gallery/gallery-9.jpg",
  "/images/gallery/gallery-12.jpg",
];

export default function ParallaxGallery() {
  const gallery = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const y  = useTransform(scrollYProgress, [0, 1], [0, height * 1.4]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2.2]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.9]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 1.8]);

  // mobile: reduced parallax intensity, less top offset so images show immediately
  const ym1 = useTransform(scrollYProgress, [0, 1], [0, height * 0.4]);
  const ym2 = useTransform(scrollYProgress, [0, 1], [0, height * 0.7]);

  useEffect(() => {
    const update = () => {
      setHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="gallery" className="w-full bg-[#f5f0eb]">
      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden p-[2vw]"
        style={{ transform: "translateZ(0)" }}
      >
        {isMobile ? (
          // Mobile: 2 columns, staggered
          <>
            <MobileColumn images={[images[0], images[1], images[2], images[4]]} y={ym1} offset="-15%" />
            <MobileColumn images={[images[5], images[6], images[7], images[8]]} y={ym2} offset="-30%" />
          </>
        ) : (
          // Desktop: 4 columns
          <>
            <Column images={[images[0],  images[1],  images[2]]}  y={y}  />
            <Column images={[images[3],  images[4],  images[5]]}  y={y2} />
            <Column images={[images[6],  images[7],  images[8]]}  y={y3} />
            <Column images={[images[9],  images[10], images[11]]} y={y4} />
          </>
        )}
      </div>
    </section>
  );
}

type ColumnProps = { images: string[]; y: MotionValue<number> };

function Column({ images, y }: ColumnProps) {
  return (
    <motion.div
      className="relative flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw]
        first:top-[-10%] [&:nth-child(2)]:top-[-45%]
        [&:nth-child(3)]:top-[-10%] [&:nth-child(4)]:top-[-35%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <Image src={src} alt="Nang Ron collection" fill
            className="object-cover object-top" sizes="25vw" loading="lazy" />
        </div>
      ))}
    </motion.div>
  );
}

function MobileColumn({ images, y, offset }: ColumnProps & { offset: string }) {
  return (
    <motion.div
      className="relative flex h-full w-1/2 flex-col gap-[3vw]"
      style={{ y, top: offset, willChange: "transform" }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <Image src={src} alt="Nang Ron collection" fill
            className="object-cover object-top" sizes="50vw" loading="lazy" />
        </div>
      ))}
    </motion.div>
  );
}
