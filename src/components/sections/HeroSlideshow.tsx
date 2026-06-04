"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "/images/hero/lola-1.jpg",
  "/images/hero/lola-2.jpg",
  "/images/hero/lola-3.jpg",
  "/images/hero/lola-4.jpg",
  "/images/hero/lola-5.jpg",
  "/images/hero/lola-6.jpg",
  "/images/hero/lola-7.jpg",
  "/images/hero/lola-8.jpg",
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        let next: number;
        do {
          next = Math.floor(Math.random() * images.length);
        } while (next === prev);
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Image
            src={images[index]}
            alt="Nang Ron collection"
            fill
            className="object-cover object-top"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}
