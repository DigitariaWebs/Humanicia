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
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                  Mariora
                </h2>
                <p
                  className="mt-4 text-lg md:text-lg leading-relaxed text-justify"
                  style={{ color: "var(--color-muted)" }}
                >
                  Je suis une personne profondément humaine, animée par une
                  passion sincère pour la découverte — qu’elle soit intérieure
                  ou à travers le monde. Le voyage nourrit chez Moi une
                  ouverture à l’autre, un émerveillement constant face à la
                  diversité des cultures, des récits, des émotions. La lecture,
                  quant à elle, est mon refuge et mon outil : elle m&apos;offre
                  des mots pour comprendre, ressentir, et transmettre.
                </p>
                <p
                  className="mt-4 text-lg md:text-lg leading-relaxed text-justify"
                  style={{ color: "var(--color-muted)" }}
                >
                  Ma présence est douce et pleine, marquée par une qualité
                  d’écoute rare. Je sais être là, vraiment là, avec l’autre. Mon
                  empathie m’invite à accueillir sans juger, à comprendre
                  au-delà des mots, à sentir ce qui se vit en silence. Prendre
                  soin n’est pas pour Moi un simple geste, mais une manière
                  d’être : attentive, bienveillante, profondément engagée dans
                  la relation.
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
                    src="/AgentPage/PhotoSecondaire.jpg"
                    alt="Mariora"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/AgentPage/PhotoSecondaireBlur.jpg"
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
