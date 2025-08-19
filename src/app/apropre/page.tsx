"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Video, Hand } from "lucide-react";

export default function AproprePage() {
  const PILLARS: { id: string; title: string; description: string }[] = [
    {
      id: "01",
      title: "Écouter",
      description:
        "Une oreille attentive pour vous accompagner dans vos moments de solitude ou simplement partager votre journée. Ici, vous êtes entendu, sans jugement.",
    },
    {
      id: "02",
      title: "Parler",
      description:
        "Des conversations authentiques par appel vocal ou visioconférence, pour échanger, rire, se confier ou discuter de ce qui vous passionne.",
    },
    {
      id: "03",
      title: "Rencontrer",
      description:
        "Des moments simples et chaleureux en personne: autour d’un café, d’une promenade ou d’une activité qui vous plaît.",
    },
    {
      id: "04",
      title: "Créer du lien",
      description:
        "Des échanges qui laissent une empreinte positive, nourrissent le cœur et rappellent l’importance d’être connecté aux autres.",
    },
  ];

  return (
    <main>
      <Header />
      <section
        id="about"
        aria-label="À propos"
        className="relative pt-8 md:pt-12 lg:pt-16 pb-4 md:pb-6 lg:pb-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-center">
            {/* Image block with framed accent */}
            <div className="relative w-full md:max-w-[460px] lg:max-w-[520px] justify-self-center md:justify-self-start order-2 md:order-1 mb-8 md:mb-0">
              {/* Accent rounded frame behind the image */}
              <div
                className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-[2.25rem] md:rounded-[3.5rem] border-[6px] sm:border-[8px] md:border-[10px] opacity-60"
                style={{ borderColor: "var(--color-clay)" }}
                aria-hidden="true"
              />

              <motion.figure
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: 0 }}
                className="group relative z-10 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-sm ring-1 ring-black/5 will-change-transform"
              >
                <Image
                  src="/AboutPage/EricAboutPage.jpg"
                  alt="Portrait d'Éric Thomas devant une cathédrale"
                  width={400}
                  height={560}
                  className="w-full h-auto object-cover object-center origin-center transition-transform duration-300 group-hover:scale-105 will-change-transform"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              </motion.figure>
            </div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="relative order-1 md:order-2"
            >
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4"
                style={{ color: "var(--color-brand)" }}
              >
                À propos
              </h2>
              <div
                className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6 md:p-8 space-y-5 text-[16px] md:text-lg leading-relaxed text-justify"
                style={{
                  color: "var(--color-muted)",
                  background:
                    "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
                }}
              >
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-cta)" }}
                >
                  Je m’appelle Éric Thomas.
                </p>
                <p>
                  Après avoir parcouru 1 250 km en solitaire sur le Chemin de
                  Compostelle, j’ai découvert la beauté… mais aussi le poids de
                  la solitude. C’est de cette expérience qu’est née Humanicia :
                  l’envie de transformer ce vécu en quelque chose de positif, en
                  créant un service qui ramène du lien humain là où il en
                  manque.
                </p>
                <p>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-brand)" }}
                  >
                    Humanicia, c’est bien plus qu’un service : c’est une
                    mission.
                  </span>
                  <br />
                  Dans un monde où tout va vite et où les échanges sont souvent
                  superficiels, je veux remettre l’essentiel au centre — une
                  présence réelle, une oreille attentive, des moments partagés
                  qui comptent vraiment.
                </p>
              </div>
              <svg
                className="pointer-events-none absolute -bottom-4 right-0 w-40 md:w-56 opacity-25"
                viewBox="0 0 200 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10 60 C 40 10, 80 110, 110 30 C 130 -10, 160 120, 190 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: "var(--color-muted)" }}
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional content container */}
      <section className="relative pt-4 md:pt-6 lg:pt-8 pb-8 md:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div
              className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6 md:p-8 space-y-5 text-[16px] md:text-lg leading-relaxed text-justify"
              style={{
                color: "var(--color-muted)",
                background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
              }}
            >
              <div>
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-cta)" }}
                >
                  Concrètement, Humanicia propose :
                </span>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    des appels vocaux pour discuter simplement, comme avec un
                    ami,
                  </li>
                  <li>
                    des appels visio pour retrouver la chaleur d&apos;un vrai
                    face-à-face,
                  </li>
                  <li>
                    des rencontres en personne pour vivre des moments
                    authentiques.
                  </li>
                </ul>
              </div>
              <p>
                Aujourd&apos;hui, je suis le premier visage et la voix de
                Humanicia. Mais au-delà de mon histoire, Humanicia a pour
                vocation de grandir et d&apos;accueillir d&apos;autres personnes
                passionnées par une même mission : réduire la solitude et
                recréer du lien, du vrai.
              </p>
              <p>
                Mon parcours, mon futur livre et mes conférences à venir
                s&apos;inscrivent dans cette même vision : inspirer les gens à
                ne jamais sous-estimer la force d&apos;une présence humaine.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inline feature cards (no section) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14 lg:mt-16 mb-16 md:mb-24 lg:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PILLARS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-5 md:p-6 lg:p-7 shadow-sm border transition-transform hover:-translate-y-0.5"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--color-clay) 40%, white)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: "#F4B840" }}
                  aria-hidden="true"
                >
                  {item.id}
                </span>
                <h3
                  className="text-base md:text-lg font-semibold"
                  style={{ color: "var(--color-brand)" }}
                >
                  {item.title}
                </h3>
              </div>
              <p
                className="mt-3 text-[13px] md:text-sm leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* "Qu’est Ce Qu’on Fait ?" - inline block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 lg:mt-20 mb-16 md:mb-24 lg:mb-28">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left copy */}
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-cta)" }}
            >
              Humancia
            </p>
            <h2
              className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              style={{ color: "var(--color-brand)" }}
            >
              Qu’est Ce Qu’on Fait ?
            </h2>
            <p
              className="mt-4 text-[15px] md:text-base leading-7 md:leading-8 text-justify"
              style={{ color: "var(--color-muted)" }}
            >
              Chez Humanicia, nous créons du lien humain là où il manque. Notre
              mission est simple : vous offrir une présence attentive et
              bienveillante, que ce soit à travers un appel vocal anonyme, une
              visioconférence conviviale ou une rencontre en personne autour
              d’une activité simple. Nous écoutons, nous partageons, nous
              échangeons, toujours dans un esprit d’authenticité et de respect.
              Parce qu’un moment de vraie connexion peut changer toute une
              journée.
            </p>
          </div>

          {/* Right collage */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hidden md:block relative rounded-[28px] bg-white/90 backdrop-blur shadow-xl ring-1 ring-black/5 p-5 md:p-6 overflow-hidden"
          >
            {/* Faux window chrome */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: "#FECACA" }}
              />
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: "#FDE68A" }}
              />
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: "#86EFAC" }}
              />
            </div>
            <div className="absolute left-0 right-0 top-7 h-[3px] bg-black/5" />

            <div className="relative mt-2 h-[380px] md:h-[440px] lg:h-[480px]">
              {/* Decorative dots (subtle) */}
              <div
                className="absolute -left-8 -top-10 hidden md:block h-24 w-24 rounded-full opacity-60"
                style={{ background: "var(--color-mint)" }}
              />
              <div
                className="absolute -right-10 -bottom-12 hidden md:block h-28 w-28 rounded-full opacity-80"
                style={{ background: "var(--color-peach)" }}
              />
              <div
                className="absolute left-1/2 -top-4 hidden md:block h-4 w-4 rounded-full"
                style={{ background: "#FACC15" }}
              />

              {/* Main tile */}
              <div className="absolute left-[2%] md:left-[3%] top-1/2 -translate-y-1/2 w-[46%] aspect-square rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 bg-white">
                <Image
                  src="/AboutPage/BrunetWoman.jpg"
                  alt="Agent en communication"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 60vw, 90vw"
                  priority
                />
                {/* Removed overlay labels by request */}
              </div>

              {/* Right column tiles */}
              {/* Top right square (Adam) */}
              <div className="absolute right-[6%] top-[10%] w-[26%] aspect-square rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.07)] ring-1 ring-black/5 bg-white">
                <Image
                  src="/AboutPage/WhiteMan.png"
                  alt="Interlocuteur"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>

              {/* Center-right square (Tamara) */}
              <div className="absolute right-[34%] top-[14%] w-[20%] aspect-square rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.07)] ring-1 ring-black/5 bg-white">
                <Image
                  src="/AboutPage/WhiteGirl.png"
                  alt="Interlocutrice"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>

              {/* Middle-right landscape (Humbert) */}
              <div className="absolute right-[38%] top-[48%] w-[24%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.09)] ring-1 ring-black/5 bg-white">
                <Image
                  src="/AboutPage/WhiteManGlasses.png"
                  alt="Interlocuteur"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>

              {/* Bottom-right large (Patricia) */}
              <div className="absolute right-[6%] bottom-[8%] w-[34%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.1)] ring-1 ring-black/5 bg-white">
                <Image
                  src="/AboutPage/BlackGirl.png"
                  alt="Interlocutrice"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>

              {/* Raise-hand floating badge */}
              <div className="absolute right-[30%] top-[52%] h-16 w-16 rounded-full grid place-items-center shadow-[0_12px_24px_rgba(0,0,0,0.12)] ring-1 ring-black/5 bg-white">
                <div
                  className="h-12 w-12 rounded-full grid place-items-center"
                  style={{
                    background: "linear-gradient(135deg, #FFE8D6, #FFD3BA)",
                  }}
                >
                  <Hand
                    className="h-7 w-7"
                    style={{ color: "var(--color-cta)" }}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="absolute left-[2%] md:left-[3%] bottom-[6%] flex gap-4">
                <button
                  className="px-6 py-3 rounded-2xl text-white text-sm font-semibold shadow-[0_8px_18px_rgba(21,128,61,0.35)] inline-flex items-center gap-2"
                  style={{ background: "var(--color-brand)" }}
                >
                  <Video className="h-4 w-4" />
                  Vidéo
                </button>
                <button
                  className="px-6 py-3 rounded-2xl text-sm font-semibold shadow-sm inline-flex items-center gap-2 ring-1 ring-black/5"
                  style={{
                    background: "rgba(166,193,142,0.45)",
                    color: "#064E3B",
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Appel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}


