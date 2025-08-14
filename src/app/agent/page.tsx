"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function BubbleIcon({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const common = {
    width: 56,
    height: 56,
  } as const;
  if (variant === 2) {
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path
          d="M12 3C7.58 3 4 6.13 4 9.99c0 1.63.7 3.13 1.86 4.33-.22 1.02-.78 2.26-1.76 3.74 1.95-.28 3.34-.85 4.22-1.35 1.2.44 2.53.68 3.68.68 4.42 0 8-3.13 8-6.99S16.42 3 12 3z"
          fill="#FFC94A"
        />
      </svg>
    );
  }
  if (variant === 3) {
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path
          d="M4 6.5C4 4.57 5.79 3 8 3h8c2.21 0 4 1.57 4 3.5S18.21 10 16 10H9.76L7 12.5V10H8C5.79 10 4 8.43 4 6.5z"
          fill="#FFD885"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" {...common} aria-hidden>
      <path
        d="M12 4C7.58 4 4 6.92 4 10.5 4 12.6 5.28 14.43 7.28 15.58 7.09 16.63 6.6 17.86 5.7 19.24c2.16-.31 3.7-1.03 4.65-1.65.51.07 1.04.11 1.58.11 4.42 0 8-2.92 8-6.5S16.42 4 12 4z"
        fill="#FFE8A3"
      />
    </svg>
  );
}

type Member = {
  id: string;
  src: string;
  alt: string;
  name: string;
  bio: string;
};

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

export default function AgentPage() {
  const [activeIndex, setActiveIndex] = React.useState<number>(1);
  function useResponsiveBreakpoint(): "sm" | "md" | "lg" {
    const [bp, setBp] = React.useState<"sm" | "md" | "lg">("sm");
    React.useEffect(() => {
      const md = window.matchMedia("(min-width: 768px)");
      const lg = window.matchMedia("(min-width: 1024px)");
      const update = () => setBp(lg.matches ? "lg" : md.matches ? "md" : "sm");
      update();
      md.addEventListener("change", update);
      lg.addEventListener("change", update);
      return () => {
        md.removeEventListener("change", update);
        lg.removeEventListener("change", update);
      };
    }, []);
    return bp;
  }

  const getSlot = (index: number): "left" | "center" | "right" => {
    if (index === activeIndex) return "center";
    const rightIndex = (activeIndex + 1) % MEMBERS.length;
    return index === rightIndex ? "right" : "left";
  };

  const prefersReducedMotion = useReducedMotion();
  const breakpoint = useResponsiveBreakpoint();

  const getMotionForSlot = (
    slot: "left" | "center" | "right",
    currentBreakpoint: "sm" | "md" | "lg",
    reduceMotion: boolean
  ) => {
    const widthByBreakpoint = {
      sm: { center: 220, side: 190 },
      md: { center: 260, side: 220 },
      lg: { center: 300, side: 240 },
    } as const;

    const presets = {
      sm: {
        left: { x: -70, y: 16, rotate: -6 },
        right: { x: 70, y: 20, rotate: 5 },
        center: { x: 0, y: 0, rotate: 2 },
      },
      md: {
        left: { x: -120, y: 22, rotate: -8 },
        right: { x: 120, y: 26, rotate: 6 },
        center: { x: 0, y: 0, rotate: 3 },
      },
      lg: {
        left: { x: -160, y: 26, rotate: -9 },
        right: { x: 160, y: 30, rotate: 7 },
        center: { x: 0, y: 0, rotate: 3 },
      },
    } as const;

    const base =
      slot === "left"
        ? presets[currentBreakpoint].left
        : slot === "right"
        ? presets[currentBreakpoint].right
        : presets[currentBreakpoint].center;

    const isCenter = slot === "center";
    const cardWidth =
      widthByBreakpoint[currentBreakpoint][isCenter ? "center" : "side"];
    const cardHeight = Math.round((cardWidth * 4) / 3);
    const anchorX = -cardWidth / 2;
    const anchorY = -cardHeight / 2;

    const motionValues = reduceMotion
      ? { x: anchorX + base.x, y: anchorY + base.y, rotate: 0 }
      : { x: anchorX + base.x, y: anchorY + base.y, rotate: base.rotate };
    const zIndex = slot === "center" ? 30 : 10;
    const scale = slot === "center" ? 1 : 0.96;
    return { ...motionValues, zIndex, scale };
  };

  const spring = { type: "spring" as const, stiffness: 320, damping: 26 };

  type Profile = {
    id: string;
    img: string;
    name: string;
    role: string;
    bg: string;
  };
  const PROFILES: Profile[] = [
    {
      id: "p1",
      img: "/AgentPage/ForheadMan.png",
      name: "John Smith",
      role: "Thérapeute",
      bg: "#F6F1B6",
    },
    {
      id: "p2",
      img: "/AgentPage/WhiteHairMan.png",
      name: "David Johnson",
      role: "Co-fondateur",
      bg: "#F9C7C9",
    },
    {
      id: "p3",
      img: "/AgentPage/GlassesGirl.png",
      name: "Mary Johnson",
      role: "Enseignante",
      bg: "#DDF5F2",
    },
    {
      id: "p4",
      img: "/AgentPage/ShortHairGirl.png",
      name: "Patricia Davis",
      role: "Consultante",
      bg: "#FAD2CF",
    },
  ];

  function Star({ filled = false }: { filled?: boolean }) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
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

  const TESTIMONIAL_PHOTOS = [
    { id: "t1", src: "/OurTeamSection/WhiteMan.jpg", alt: "Scène 1" },
    { id: "t2", src: "/OurTeamSection/BlondeGirl.jpg", alt: "Scène 2" },
  ] as const;
  return (
    <>
      <Header />
      <section className="relative py-16 md:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading row (full-width) */}
          <div className="relative">
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-cta)" }}
            >
              Des personnalités uniques
            </p>
            <h1
              className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              style={{ color: "var(--color-brand)" }}
            >
              Nos Agents, Vos Compagnons De Conversation
            </h1>

            <div className="absolute -top-6 right-2 hidden md:flex gap-3">
              <BubbleIcon variant={1} />
              <BubbleIcon variant={2} />
              <BubbleIcon variant={3} />
            </div>
          </div>

          {/* Content row: images + description aligned */}
          <div className="mt-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative h-[420px] md:h-[460px] lg:h-[500px] grid place-items-center order-2 md:order-1">
              {MEMBERS.map((member, index) => {
                const slot = getSlot(index);
                const pose = getMotionForSlot(
                  slot,
                  breakpoint,
                  !!prefersReducedMotion
                );
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
                    whileHover={{
                      scale: isCenter ? 1.03 : 1.05,
                      y: pose.y - 4,
                    }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Choisir cet agent"
                    style={{ cursor: "pointer", left: "50%", top: "50%" }}
                  >
                    <Image
                      src={member.src}
                      alt={member.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 300px, (min-width: 768px) 260px, 220px"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                      <div className="font-semibold text-sm md:text-base">
                        {member.name}
                      </div>
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

            <div
              className="text-base md:text-lg leading-relaxed order-1 md:order-2"
              style={{ color: "var(--color-text)" }}
            >
              <p>
                Chez{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-brand)" }}
                >
                  Humanicia
                </span>
                , chaque agent est bien plus qu’une voix ou un visage à l’écran.
                Ce sont des personnes passionnées par l’échange humain, choisies
                pour leur écoute, leur bienveillance et leur authenticité.
                Chacun apporte sa personnalité, ses centres d’intérêt et son
                vécu, afin que chaque conversation soit unique et sincère.
              </p>
              <p className="mt-4">
                Que vous cherchiez à discuter de voyages, à partager un
                souvenir, à apprendre quelque chose de nouveau ou simplement à
                parler de votre journée, nos agents sont là pour vous offrir une
                présence chaleureuse, adaptée à vos envies.
              </p>
              <p className="mt-4">
                Nous croyons aux liens authentiques: un espace sûr pour se
                confier, réfléchir, rire et se sentir accompagné. Prenez le
                temps, nous sommes là.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery below */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-14 items-end">
            {PROFILES.map((p) => (
              <motion.div
                key={p.id}
                className="text-center"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div
                  className="relative mx-auto w-full max-w-[220px] h-[200px] sm:h-[220px] md:h-[240px] rounded-t-2xl overflow-hidden ring-1 ring-black/5 shadow-sm"
                  style={{ backgroundColor: p.bg }}
                >
                  {/* subtle highlight */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
                  <Image
                    src={p.img}
                    alt={`Portrait de ${p.name}`}
                    fill
                    className="object-contain object-bottom p-1 md:p-2 transform-gpu scale-[1.26] md:scale-[1.34]"
                    sizes="(min-width: 1024px) 220px, (min-width: 768px) 200px, 45vw"
                  />
                  <svg
                    className="absolute bottom-0 left-0 w-full"
                    viewBox="0 0 400 80"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M0 46 C 80 10, 120 74, 200 40 S 320 12, 400 44 V 80 H 0 Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="mt-4">
                  <div
                    className="text-sm sm:text-base font-semibold"
                    style={{ color: "var(--color-brand)" }}
                  >
                    {p.name}
                  </div>
                  <div
                    className="text-[12px] sm:text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {p.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial-like two-photo section */}
      <section className="pt-12 md:pt-20 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Two-photo collage using initial concept (overlapping, tilt) */}
            <div className="relative h-[300px] sm:h-[340px] md:h-[420px] lg:h-[440px]">
              {/* back photo */}
              <motion.div
                className="absolute left-0 top-8 w-[68%] md:w-[60%] aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-black/5 shadow-md"
                initial={{ rotate: -6, x: 0, y: 0 }}
                whileHover={{ rotate: -5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Image
                  src={TESTIMONIAL_PHOTOS[0].src}
                  alt={TESTIMONIAL_PHOTOS[0].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
              {/* front photo */}
              <motion.div
                className="absolute left-16 sm:left-20 md:left-36 top-0 w-[72%] md:w-[64%] aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-black/5 shadow-lg"
                initial={{ rotate: 8, x: 0, y: 0 }}
                whileHover={{ rotate: 7 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Image
                  src={TESTIMONIAL_PHOTOS[1].src}
                  alt={TESTIMONIAL_PHOTOS[1].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Textual content with rating and long paragraph */}
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-muted)" }}
              >
                Témoignages de nos amis
              </p>
              <h2
                className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold"
                style={{ color: "var(--color-brand)" }}
              >
                Avis Vérifiés Pour Nous Faire Confiance
              </h2>
              <div
                className="mt-6 text-sm"
                style={{ color: "var(--color-text)" }}
              >
                <p className="font-semibold">
                  Sophie L., utilisatrice de Humanicia
                </p>
                <div className="mt-2 flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < 4} />
                  ))}
                  <span>4/5</span>
                </div>
                <div className="mt-4 space-y-4 leading-relaxed text-justify">
                  <p>
                    Lorsque j’ai découvert Humanicia, j’étais dans une période
                    où la solitude pesait plus lourd que d’habitude. J’avais
                    beau être entourée, je me sentais déconnectée, comme en
                    décalage avec le monde. J’ai décidé de tenter l’expérience,
                    un peu sur un coup de tête, et on m’a mis en contact avec
                    Alex.
                  </p>
                  <p>
                    Dès notre premier échange, j’ai senti quelque chose de
                    différent. Alex ne suit pas un script, il ne donne pas de
                    réponses toutes faites. Il écoute vraiment. Il prend le
                    temps de comprendre, de poser les bonnes questions, et
                    surtout, il a le tact de laisser la place aux silences quand
                    ils parlent plus que les mots.
                  </p>
                  <p>
                    Ce que j’apprécie le plus, c’est qu’Alex ne cherche pas à
                    “me réparer” ou à tout résoudre. Il m’accompagne. Il est là.
                    Et cette présence, si simple en apparence, a eu un réel
                    impact sur mon moral et ma confiance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}


