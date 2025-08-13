"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Service = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  rotationDeg: number;
};

const SERVICES: Service[] = [
  {
    id: "audio",
    title: "Appels vocaux",
    subtitle: "Discutez en toute simplicité, où que vous soyez",
    imageSrc: "/ServiceSection/AppelsVocaux.jpg",
    rotationDeg: -6,
  },
  {
    id: "visio",
    title: "Appels visio",
    subtitle: "Partagez un moment en face à face, à distance",
    imageSrc: "/ServiceSection/AppelVisio.jpg",
    rotationDeg: 0,
  },
  {
    id: "presence",
    title: "Activités en présence",
    subtitle: "Des moments authentiques, vécus ensemble",
    imageSrc: "/ServiceSection/ActivitesPresence.jpg",
    rotationDeg: 6,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" aria-label="Nos services" className="relative pt-2 md:pt-3 lg:pt-4 pb-24 md:pb-28 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:mb-20">
          <p className="text-sm font-semibold" style={{ color: "var(--color-cta)" }}>
            Humanicia donne
          </p>
          <h2
            className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            style={{ color: "var(--color-brand)" }}
          >
            Nos Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 lg:gap-20 items-center">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24, rotate: service.rotationDeg * 1.2 }}
              whileInView={{ opacity: 1, y: 0, rotate: service.rotationDeg }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
              whileHover={{ y: -8, rotate: service.rotationDeg * 0.8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg cursor-pointer"
              style={{ transformOrigin: "center" }}
            >
              <Image
                src={service.imageSrc}
                alt={`${service.title}`}
                fill
                className="object-cover transition-transform duration-300 will-change-transform"
                sizes="(min-width: 1024px) 28rem, (min-width: 768px) 30vw, 88vw"
                priority={index === 0}
              />

              {/* Soft overlay */}
              <div className="absolute inset-0 bg-black/25 md:bg-black/30 transition-opacity duration-300 group-hover:opacity-20" />

              {/* Centered text */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center text-white drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    {service.title}
                  </h3>
                  {/* Subtitle kept for accessibility but not visually displayed to avoid repetition */}
                  <span className="sr-only">{service.subtitle}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


