"use client";

import { motion } from "framer-motion";

export default function WhyWhoSection() {
  return (
    <section className="relative pt-16 md:pt-20 lg:pt-24 pb-40 md:pb-52 lg:pb-64 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative dashed arcs */}
        <motion.svg
          className="pointer-events-none absolute -top-20 left-[25%] w-[680px] md:w-[760px] lg:w-[880px] opacity-30 origin-center"
          viewBox="0 0 880 240"
          fill="none"
          initial={{ rotate: 15 }}
          animate={{ rotate: [15, 19, 15] }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        >
          <defs>
            <marker id="arcArrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>
          <motion.path
            d="M40 220C120 80 260 20 380 20C500 20 640 80 720 220"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, -64] }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            style={{ color: "var(--color-cta)" }}
          />
        </motion.svg>

        <motion.svg
          className="pointer-events-none absolute -bottom-40 left-[15%] w-[680px] md:w-[760px] lg:w-[880px] opacity-30 origin-center"
          viewBox="0 0 880 240"
          fill="none"
          initial={{ rotate: 15 }}
          animate={{ rotate: [15, 11, 15] }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        >
          <motion.path
            d="M40 20C120 160 260 220 380 220C500 220 640 160 720 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, 64] }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            style={{ color: "var(--color-cta)" }}
          />
        </motion.svg>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Pourquoi */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-[560px] justify-self-start"
          >
            <p className="text-sm font-semibold" style={{ color: "var(--color-cta)" }}>
              Pourquoi ?
            </p>
            <h3
              className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              style={{ color: "var(--color-brand)" }}
            >
              Humanicia Existe
            </h3>
            <div
              className="mt-5 text-[15px] md:text-base leading-relaxed text-justify"
              style={{ color: "var(--color-muted)" }}
            >
              <p>
                Parce que la solitude n’épargne personne. Qu’elle soit choisie ou subie, elle
                peut parfois peser lourd sur le cœur. Un mot gentil, une écoute attentive ou un
                moment partagé peuvent suffire à alléger ce fardeau.
              </p>
              <p className="mt-4">
                Humanicia est né de cette conviction : offrir une présence humaine, bienveillante
                et authentique, à travers des échanges simples mais profonds. Ici, pas de faux-semblants —
                juste du lien, du vrai.
              </p>
            </div>
          </motion.div>

          {/* Pour qui */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="max-w-[560px] justify-self-start md:mt-33 lg:mt-45 "
          >
            <p className="text-sm font-semibold" style={{ color: "var(--color-cta)" }}>
              Pour qui ?
            </p>
            <h3
              className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              style={{ color: "var(--color-brand)" }}
            >
              Humanicia Pour
            </h3>
            <div
              className="mt-5 text-[15px] md:text-base leading-relaxed text-justify"
              style={{ color: "var(--color-muted)" }}
            >
              <p>
                Humanicia s’adresse à toutes celles et ceux qui ressentent le besoin d’un moment d’écoute et de partage. Aux personnes
                âgées en quête de chaleur humaine, aux personnes isolées par la distance ou les circonstances, à celles qui traversent un
                moment difficile ou simplement à ceux qui ont envie de parler avec quelqu’un qui prend vraiment le temps d’écouter.
              </p>
              <p className="mt-4">
                Que vous soyez chez vous, en voyage ou dans un café, Humanicia est là pour
                vous accompagner, où que vous soyez.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


