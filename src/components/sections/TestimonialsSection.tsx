"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  meta: string;
  avatarSrc: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "marie",
    quote:
      "Une présence chaleureuse quand j’en avais le plus besoin. L’échange m’a vraiment fait du bien.",
    author: "Marie C.",
    meta: "Montréal",
    avatarSrc: "/slide/RedHead.png",
  },
  {
    id: "luc",
    quote:
      "Simple, humain, authentique. J’ai eu une conversation qui a illuminé ma journée.",
    author: "Luc T.",
    meta: "Québec",
    avatarSrc: "/slide/WhiteMan.png",
  },
  {
    id: "amina",
    quote:
      "On se sent écouté sans jugement. Je recommande à tous ceux qui veulent briser la solitude.",
    author: "Amina R.",
    meta: "Laval",
    avatarSrc: "/slide/BlackGirl.png",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={i} className="text-lg" style={{ color: "#F4B840" }}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="temoignages" aria-label="Témoignages" className="relative py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold" style={{ color: "var(--color-cta)" }}>
            Preuve sociale
          </p>
          <h2
            className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            style={{ color: "var(--color-brand)" }}
          >
            Témoignages
          </h2>
          <p className="mt-4 text-[15px] md:text-base max-w-2xl mx-auto" style={{ color: "var(--color-muted)" }}>
            Ils ont vécu un moment d’échange qui compte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {TESTIMONIALS.map((t, idx) => (
            <motion.figure
              key={t.id}
              className="rounded-2xl p-6 ring-1 ring-black/5 shadow-sm bg-white h-full flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.05 }}
            >
              <Stars />
              <blockquote className="mt-3 text-[15px] md:text-base leading-relaxed flex-1" style={{ color: "var(--color-text)" }}>
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden ring-1 ring-black/5">
                  <Image src={t.avatarSrc} alt={t.author} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <div className="font-semibold" style={{ color: "var(--color-brand)" }}>{t.author}</div>
                  <div className="text-sm" style={{ color: "var(--color-muted)" }}>{t.meta}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}


