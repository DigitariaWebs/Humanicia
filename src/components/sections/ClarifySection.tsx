"use client";

import { motion } from "framer-motion";

export default function ClarifySection() {
  return (
    <section aria-label="Ce que c'est / Ce que ça n'est pas" className="pt-6 md:pt-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl md:rounded-[2rem] ring-1 ring-black/5 shadow-sm"
          style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}
        >
          <div className="absolute -inset-px rounded-[inherit] pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px var(--color-border)" }} />

          <div className="grid md:grid-cols-2 gap-0">
            {/* Ce que c'est */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 text-lg">✅</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--color-brand)" }}>
                  Ce que c’est
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-[15px] md:text-base" style={{ color: "var(--color-text)" }}>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-green-600">•</span>
                  <span>Compagnie humaine</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-green-600">•</span>
                  <span>Écoute bienveillante</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-green-600">•</span>
                  <span>Activités partagées</span>
                </li>
              </ul>
            </div>

            {/* Ce que ça n'est pas */}
            <div className="p-6 sm:p-8 lg:p-10 bg-gray-50/60">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-700 text-lg">❌</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#b91c1c" }}>
                  Ce que ça n’est pas
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-[15px] md:text-base" style={{ color: "var(--color-text)" }}>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-600">•</span>
                  <span>Thérapie</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-600">•</span>
                  <span>Soins médicaux</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-red-600">•</span>
                  <span>Rencontres amoureuses</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



