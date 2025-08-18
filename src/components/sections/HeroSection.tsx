"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useModal } from "@/components/providers/ModalProvider";

export default function HeroSection() {
  const { openModal } = useModal();
  const images = [
    {
      src: "/heroSection/AutumnParkReflection.png",
      alt: "Jeune femme souriante",
    },
    {
      src: "/heroSection/SunlitMemoriesWithGrandma.png",
      alt: "Jeune homme avec lunettes",
    },
    {
      src: "/heroSection/ElderlyCoupleRelaxing.png",
      alt: "Jeune femme asiatique",
    },
    {
      src: "/heroSection/SunlitCafeConversation.png",
      alt: "Jeune femme rousse",
    },
    {
      src: "/heroSection/CoffeeShopConversation.png",
      alt: "Jeune homme souriant",
    },
  ];

  // Background color mapping by logical image order and mirrored counterpart
  const getLeftBg = (colIdx: number, itemIdx: number): string => {
    if (colIdx === 0 && itemIdx === 0) return "#94A3B8"; // 1st
    if (colIdx === 1 && itemIdx === 0) return "#F4B840"; // 2nd
    if (colIdx === 1 && itemIdx === 1) return "#60D3D959"; // 3rd
    if (colIdx === 2 && itemIdx === 0) return "#D2EBBE"; // 4th
    if (colIdx === 2 && itemIdx === 1) return "#A5BD92"; // 5th
    return "var(--color-lavender)";
  };

  const getRightBg = (colIdx: number, itemIdx: number): string => {
    if (colIdx === 2 && itemIdx === 0) return "#94A3B8"; // mirror of 1st
    if (colIdx === 1 && itemIdx === 1) return "#F4B840"; // mirror of 2nd
    if (colIdx === 1 && itemIdx === 0) return "#60D3D959"; // mirror of 3rd
    if (colIdx === 0 && itemIdx === 1) return "#D2EBBE"; // mirror of 4th
    if (colIdx === 0 && itemIdx === 0) return "#A5BD92"; // mirror of 5th
    return "var(--color-mint)";
  };

  // Column structures for perfect mirrored symmetry
  // Heights chosen so that single = sum(pair) + gap for perfect bottom alignment
  // mobile: A=10rem, B=12rem, gap=1rem  -> single=23rem
  // md:     A=12rem, B=16rem, gap=1.25rem -> single=29.25rem
  const leftStructure = [
    { count: 1, heights: ["h-[16rem] md:h-[22rem]"] },
    { count: 2, heights: ["h-[10rem] md:h-[18rem]", "h-[12rem] md:h-[10rem]"] },
    { count: 2, heights: ["h-[12rem] md:h-[10rem]", "h-[10rem] md:h-[18rem]"] },
  ];
  const rightStructure = [...leftStructure].reverse();

  // Helper to distribute images across columns, repeating when needed
  function buildColumns(structure: { count: number; heights: string[] }[]) {
    const cols: { src: string; alt: string; heightClass: string }[][] = [];
    let i = 0;
    for (const col of structure) {
      const items: { src: string; alt: string; heightClass: string }[] = [];
      for (let j = 0; j < col.count; j++) {
        const img = images[i % images.length];
        const heightClass = col.heights[j] ?? col.heights[col.heights.length - 1];
        items.push({ src: img.src, alt: img.alt, heightClass });
        i++;
      }
      cols.push(items);
    }
    return cols;
  }

  const leftColumns = buildColumns(leftStructure);
  // Mirror the images: right side uses the same images as the mirrored left columns.
  // For 2-item columns, swap the heights between the two items so that
  // the inverted position gets the counterpart's height (pic1 <-> pic2 heights).
  const rightColumns = leftColumns.map((_, colIdx) => {
    const mirroredLeftCol = leftColumns[leftColumns.length - 1 - colIdx];
    const isPair = mirroredLeftCol.length === 2;
    const reordered = isPair ? [...mirroredLeftCol].reverse() : mirroredLeftCol;
    const leftHeights = mirroredLeftCol.map((it) => it.heightClass);

    return reordered.map((item, itemIdx) => ({
      src: item.src,
      alt: item.alt,
      heightClass: isPair
        ? leftHeights[leftHeights.length - 1 - itemIdx]
        : (rightStructure[colIdx].heights[itemIdx] ?? rightStructure[colIdx].heights[rightStructure[colIdx].heights.length - 1]),
    }));
  });

  return (
    <section className="relative mb-16 md:mb-24 lg:mb-28">
      {/* Heading */}
      <div className="max-w-4xl mx-auto pt-8 sm:pt-10 md:pt-14 text-center px-4">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
          style={{ color: "var(--color-brand)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Humanicia
        </motion.h1>
        <motion.p
          className="mt-4 text-sm sm:text-[15px] md:text-base leading-relaxed"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          Nous croyons qu’un échange sincère peut illuminer une journée et
          réchauffer le cœur. Que ce soit par un appel vocal anonyme, une
          visioconférence conviviale ou une rencontre en personne autour d’un
          café ou d’une balade, nous créons des instants authentiques pour
          partager, écouter et se sentir véritablement connecté.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          className="mt-6 sm:mt-8 flex flex-row items-center justify-center gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
        >
          <button
            type="button"
            onClick={() => openModal("consultation")}
            className="px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-white text-sm sm:text-base shadow hover:-translate-y-0.5 transition-transform"
            style={{
              background:
                "linear-gradient(90deg, var(--color-cta), var(--color-cta-hover))",
            }}
            aria-label="Réserver un moment"
          >
            <span className="sm:hidden">Réserver</span>
            <span className="hidden sm:inline">Réserver un moment</span>
          </button>

          <Link
            href="#agents"
            className="px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold ring-1 ring-black/5 text-gray-900 text-sm sm:text-base hover:-translate-y-0.5 transition-transform shadow"
            style={{ background: "var(--color-mint)" }}
            aria-label="Parler avec un agent"
          >
            <span className="sm:hidden">Parler</span>
            <span className="hidden sm:inline">Parler avec un agent</span>
          </Link>

          <Link
            href="#contact"
            className="px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold ring-1 ring-black/5 text-gray-900 text-sm sm:text-base hover:-translate-y-0.5 transition-transform shadow"
            style={{ background: "var(--color-sky)" }}
            aria-label="Planifier une rencontre"
          >
            <span className="sm:hidden">Rencontre</span>
            <span className="hidden sm:inline">Planifier une rencontre</span>
          </Link>
        </motion.div>
      </div>

      {/* Symmetric mirrored masonry */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Left half */}
          <div className="grid grid-cols-3 gap-4 md:gap-5 order-2 md:order-1">
            {leftColumns.map((col, colIdx) => (
              <motion.div
                key={`left-col-${colIdx}`}
                className={`flex flex-col gap-4 md:gap-5 ${
                  col.length === 1
                    ? "h-[23rem] md:h-[29.25rem] justify-center"
                    : ""
                } ${colIdx % 2 === 0 ? "motion-up" : "motion-down"}`}
                style={
                  {
                    // Staggered durations and delays per column
                    // col 0: slower, col 1: medium, col 2: faster (and with unique delays)
                    "--motion-duration":
                      colIdx === 0 ? "9s" : colIdx === 1 ? "7.5s" : "6s",
                    "--motion-delay":
                      colIdx === 0 ? "0.2s" : colIdx === 1 ? "0.8s" : "1.4s",
                  } as CSSProperties &
                    Record<"--motion-duration" | "--motion-delay", string>
                }
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {col.map((item, itemIdx) => (
                  <motion.figure
                    key={`left-${colIdx}-${itemIdx}`}
                    className={`group relative w-full ${item.heightClass} rounded-[4rem] overflow-hidden shadow-sm ring-1 ring-black/5 bg-[color:var(--color-lavender)]`}
                    style={{ backgroundColor: getLeftBg(colIdx, itemIdx) }}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02] rotate-180"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 560px"
                      priority={colIdx === 0 && itemIdx === 0}
                    />
                  </motion.figure>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Right half (mirrored) */}
          <div className="grid grid-cols-3 gap-4 md:gap-5 order-1 md:order-2">
            {rightColumns.map((col, colIdx) => (
              <motion.div
                key={`right-col-${colIdx}`}
                className={`flex flex-col gap-4 md:gap-5 ${
                  col.length === 1
                    ? "h-[23rem] md:h-[29.25rem] justify-center"
                    : ""
                } ${colIdx % 2 === 0 ? "motion-up" : "motion-down"}`}
                style={
                  {
                    "--motion-duration":
                      colIdx === 0 ? "8.5s" : colIdx === 1 ? "7s" : "6.25s",
                    "--motion-delay":
                      colIdx === 0 ? "0.5s" : colIdx === 1 ? "0.1s" : "1.1s",
                  } as CSSProperties &
                    Record<"--motion-duration" | "--motion-delay", string>
                }
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {col.map((item, itemIdx) => (
                  <motion.figure
                    key={`right-${colIdx}-${itemIdx}`}
                    className={`group relative w-full ${item.heightClass} rounded-[4rem] overflow-hidden shadow-sm ring-1 ring-black/5 bg-[color:var(--color-mint)]`}
                    style={{ backgroundColor: getRightBg(colIdx, itemIdx) }}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 560px"
                    />
                  </motion.figure>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


