"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

function Star({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden
      className="inline-block"
      style={{ color: filled ? "#F4B840" : "#E5E7EB" }}
    >
      <path
        fill="currentColor"
        d="M12 2.75l2.9 5.88 6.5.95-4.7 4.57 1.1 6.45L12 17.97 6.2 20.6l1.1-6.45-4.7-4.57 6.5-.95L12 2.75z"
      />
    </svg>
  );
}

type Member = { id: string; src: string; alt: string; name: string; bio: string };

const MEMBERS: Member[] = [
  {
    id: "wm",
    src: "/OurTeamSection/WhiteMan.jpg",
    alt: "Photo de Jean, agent Humanicia",
    name: "Jean",
    bio: "Passionné de randonnées et de jazz, Jean aime écouter et échanger calmement pour apaiser les esprits.",
  },
  {
    id: "bg",
    src: "/OurTeamSection/BlondeGirl.jpg",
    alt: "Photo de Clara, agente Humanicia",
    name: "Clara",
    bio: "Souriante et empathique, Clara adore parler de voyages, de cuisine et des petites joies du quotidien.",
  },
  {
    id: "cg",
    src: "/OurTeamSection/ChineseGuy.jpg",
    alt: "Photo de Minh, agent Humanicia",
    name: "Minh",
    bio: "Curieux et bienveillant, Minh trouve toujours les mots pour rendre une conversation plus légère.",
  },
];

export default function OurTeamSection() {
  const [activeIndex, setActiveIndex] = React.useState<number>(1); // center by default

  const getSlot = (index: number): "left" | "center" | "right" => {
    if (index === activeIndex) return "center";
    const rightIndex = (activeIndex + 1) % MEMBERS.length;
    return index === rightIndex ? "right" : "left";
  };

  const getMotionForSlot = (slot: "left" | "center" | "right") => {
    // Positions tuned for mobile; media queries handled with relative values
    switch (slot) {
      case "left":
        return { x: -120, y: 24, rotate: -8, zIndex: 10, scale: 0.96 };
      case "right":
        return { x: 120, y: 36, rotate: 6, zIndex: 10, scale: 0.96 };
      default:
        return { x: 0, y: 0, rotate: 3, zIndex: 30, scale: 1 };
    }
  };

  const spring = { type: "spring" as const, stiffness: 320, damping: 26 };

  return (
    <section id="agents" className="relative py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-cta)" }}>
              Notre équipe
            </p>
            <h2
              className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              style={{ color: "var(--color-brand)" }}
            >
              Humanicia Agents
            </h2>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i < 4} />
                ))}
              </div>
              <span className="text-sm" style={{ color: "var(--color-muted)" }}>4/5</span>
            </div>

            <div className="mt-6 text-base md:text-lg leading-relaxed text-justify" style={{ color: "var(--color-text)" }}>
              <p>
                Chez Humanicia, chaque agent est bien plus qu’une voix ou un visage à l’écran. Ce sont des personnes passionnées
                par l’échange humain, choisies pour leur écoute, leur bienveillance et leur authenticité. Chacun apporte sa
                personnalité et ses centres d’intérêt, afin que chaque conversation soit unique et sincère.
              </p>
              <p className="mt-4">
                Que vous cherchiez à discuter de voyages, à partager un souvenir ou à apprendre quelque chose de nouveau, nos
                agents sont là pour vous offrir une présence chaleureuse, adaptée à vos envies.
              </p>
            </div>
          </div>

          {/* Right collage - interactive with bios */}
          <div className="relative h-[420px] md:h-[460px] lg:h-[500px] grid place-items-center">
            {MEMBERS.map((member, index) => {
              const slot = getSlot(index);
              const pose = getMotionForSlot(slot);
              const isCenter = slot === "center";
              const widthClass = isCenter
                ? "w-[220px] md:w-[260px] lg:w-[300px]"
                : "w-[190px] md:w-[220px] lg:w-[240px]";
              return (
                <motion.button
                  key={member.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`absolute aspect-[3/4] ${widthClass} rounded-xl overflow-hidden ring-1 ring-black/5 bg-white shadow-md focus:outline-none focus-visible:ring-2`}
                  initial={pose}
                  animate={pose}
                  transition={spring}
                  whileHover={{ scale: isCenter ? 1.03 : 1.05, y: pose.y - 4 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Choisir cet agent"
                  style={{ cursor: "pointer" }}
                >
                  <Image src={member.src} alt={member.alt} fill className="object-cover" sizes="(min-width: 1024px) 300px, (min-width: 768px) 260px, 220px" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                    <div className="font-semibold text-sm md:text-base">{member.name}</div>
                    {isCenter && (
                      <p className="mt-1 text-xs md:text-sm leading-snug opacity-95">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Banner heading */}
        <div
          className="mt-16 md:mt-20 lg:mt-24 rounded-2xl px-4 py-10 md:py-14 text-center"
          style={{ backgroundColor: "var(--color-mint)" }}
        >
          <h3
            className="font-extrabold leading-snug text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
          >
            <span
              className="rounded inline-block px-3 py-1"
              style={{
                background: "rgba(166, 193, 142, 0.9)",
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              La Meilleure Compagnie Pour
            </span>
            <br />
            <span
              className="rounded inline-block px-3 py-1"
              style={{
                background: "rgba(166, 193, 142, 0.9)",
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              Vos Moments De Solitude
            </span>
          </h3>
          <p className="mt-6 text-sm sm:text-base md:text-lg font-medium max-w-3xl mx-auto" style={{ color: "var(--color-text)" }}>
            Parce que chacun mérite une oreille attentive et une présence bienveillante, Humanicia vous accompagne dans les
            instants où le lien humain fait toute la différence.
          </p>
        </div>
      </div>
    </section>
  );
}


