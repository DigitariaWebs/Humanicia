"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" aria-label="À propos" className="relative py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-0 md:gap-2 lg:gap-4 items-center">
          {/* Image block with framed accent */}
          <div className="relative w-full md:max-w-[420px] lg:max-w-[460px] justify-self-center md:justify-self-start">
            {/* Accent rounded frame behind the image */}
            <div className="absolute -inset-4 rounded-[2.5rem] border-[10px] opacity-60"
                 style={{ borderColor: "var(--color-clay)" }}
                 aria-hidden="true"
            />

            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative z-10 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-sm ring-1 ring-black/5 will-change-transform"
            >
              <Image
                src="/AboutSection.jpg"
                alt="Portrait d'Éric Thomas devant une cathédrale"
                width={1000}
                height={1400}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
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
            className="relative"
          >
            <p className="text-sm font-semibold tracking-wide">
              <span style={{ color: "var(--color-cta)" }}>Humanicia </span>
            </p>
            <h2
              className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              style={{ color: "var(--color-brand)" }}
            >
              Du Lien, Du Vrai
            </h2>

            <div className="mt-4 space-y-3 text-[15px] md:text-base leading-relaxed text-justify" style={{ color: "var(--color-muted)" }}>
              <p>
                Je m’appelle <span className="font-semibold" style={{ color: "var(--color-cta)" }}>Éric Thomas</span>. Après avoir parcouru 1 250 km en
                solitaire sur le Chemin de Compostelle, j’ai compris à quel point la solitude peut être à la fois belle… et lourde à porter.
                Cette expérience m’a inspiré à créer Humanicia , un service qui reconnecte les gens entre eux, à travers des conversations
                authentiques, des appels vidéo et des rencontres réelles.
              </p>
              <p>
                Dans un monde où tout va vite et où les échanges sont souvent superficiels, Humanicia  ramène l’essentiel : une présence
                humaine, une oreille attentive et des moments partagés. Nous travaillons avec des agents passionnés, pour offrir des échanges
                qui comptent vraiment.
              </p>
              <p>
                Que ce soit pour discuter au téléphone, échanger par vidéo ou partager une activité en personne, Humanicia  est là pour recréer
                du lien, du vrai.
              </p>
            </div>

            {/* Decorative signature-like squiggle in the corner */}
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
  );
}


