"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AgentPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl md:text-5xl font-extrabold"
            style={{ color: "var(--color-brand)" }}
          >
            Rencontrez notre équipe
          </h1>
          <p
            className="mt-4 text-lg md:text-xl text-justify md:text-center max-w-3xl mx-auto"
            style={{ color: "var(--color-muted)" }}
          >
            Des personnes attentionnées, formées pour créer du lien avec chaleur
            et bienveillance. Découvrez Éric, fondateur, et Maxyme, notre
            présence rassurante.
          </p>
        </div>
      </section>

      {/* Profiles - alternating layout */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Éric - left image */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 items-stretch gap-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:col-span-4 flex justify-center">
              <div
                className="rounded-3xl shadow-lg p-1 md:max-w-[420px] w-full"
                style={{ border: "6px solid var(--color-clay)" }}
              >
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/AgentPage/PhotoPrincipale.jpg"
                    alt="Éric - Fondateur"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-8 h-full">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm ring-1 ring-black/5 h-full flex flex-col justify-center">
                <h2
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "var(--color-brand)" }}
                >
                  Éric – Fondateur
                </h2>
                <p
                  className="mt-4 text-lg md:text-lg leading-relaxed text-justify"
                  style={{ color: "var(--color-muted)" }}
                >
                  « Voyageur passionné, je crois en la force du lien humain et
                  c’est ce qui m’a inspiré à créer Humanicia. »
                </p>
              </div>
            </div>
          </motion.div>

          {/* Maxyme - right image (alternating) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 items-stretch gap-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="md:col-span-8 order-2 md:order-1 h-full">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm ring-1 ring-black/5 h-full flex flex-col justify-center">
                <h2
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "var(--color-brand)" }}
                >
                  Maxyme
                </h2>
                <p
                  className="mt-4 text-lg md:text-lg leading-relaxed text-justify"
                  style={{ color: "var(--color-muted)" }}
                >
                  Passionnée d’automobile, de gaming et de photographie, j’aime
                  découvrir et partager de nouvelles expériences. Je suis une
                  personne au grand cœur, toujours prête à écouter et à offrir
                  une présence sincère.
                </p>
                <p
                  className="mt-4 text-lg md:text-lg leading-relaxed text-justify"
                  style={{ color: "var(--color-muted)" }}
                >
                  Avec Humanicia, je souhaite mettre cette sensibilité au
                  service des autres : être une présence rassurante, une oreille
                  attentive et créer de vrais moments de connexion. Ce qui me
                  motive, c’est d’accompagner chaque personne avec chaleur,
                  bienveillance et authenticité.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 order-1 md:order-2 flex justify-center">
              <div
                className="rounded-3xl shadow-lg p-1 md:max-w-[420px] w-full"
                style={{ border: "6px solid var(--color-clay)" }}
              >
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/AgentPage/PhotoSecondaire.png"
                    alt="Maxyme"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
