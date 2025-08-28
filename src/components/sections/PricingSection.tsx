"use client";

import React from "react";
import { useModal } from "../providers/ModalProvider";

// Small inline icons to avoid extra dependencies
const IconHeart = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M12 21s-7.5-4.738-10-8.01C-0.5 8.38 3.2 4 7 6.5 8.8 7.9 12 11 12 11s3.2-3.1 5-4.5c3.8-2.5 7.5 1.88 5 6.49C19.5 16.262 12 21 12 21z" />
  </svg>
);

const IconSparkles = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M12 2l1.5 3.5L17 7l-3.5 1.5L12 12l-1.5-3.5L7 7l3.5-1.5L12 2zM4 14l1 2 2 1-2 1-1 2-1-2L1 18l2-1 1-2zM20 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
  </svg>
);

const IconStar = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const IconUsers = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5C23 14.17 18.33 13 16 13z" />
  </svg>
);

type Plan = {
  name: string;
  price: string;
  frequency?: string;
  description: string;
  features: string[];
  badge?: string;
};

const plans: Plan[] = [
  {
    name: "Forfait Sérénité",
    price: "$120",
    frequency: "/ mois",
    description:
      "Un rendez-vous doux et régulier, juste pour souffler et garder le contact.",
    features: [
      "1 appel (vocal ou visio) par semaine",
      "Environ 4 appels par mois",
      "Support par message",
      "Flexibilité d'horaire",
    ],
  },
  {
    name: "Forfait Compagnie",
    price: "$280",
    frequency: "/ mois",
    description:
      "Pour briser la solitude de façon continue et bâtir une vraie relation.",
    badge: "Le plus populaire",
    features: [
      "2 à 3 appels (vocaux ou visio) chaque semaine",
      "Environ 10 appels par mois",
      "Support prioritaire",
      "Suivi personnalisé",
      "Activités suggérées",
    ],
  },
  {
    name: "Forfait Présence",
    price: "$360",
    frequency: "/ mois",
    description:
      "L'équilibre parfait entre la chaleur d'une voix et la force d'une présence réelle.",
    features: [
      "8 appels (vocaux ou visio) par mois",
      "1 rencontre en personne (1h)",
      "Support premium",
      "Plan personnalisé",
      "Accès aux événements",
    ],
  },
  {
    name: "Rôle sur mesure",
    price: "À partir de $500",
    description:
      "Un service haut de gamme assuré par un membre de l'équipe Humanicia pour occasions spéciales.",
    features: [
      "Demi‑journée (4 h) — $500",
      "Journée (8 h) — $900",
      "Demande spéciale / forfait personnalisé — tarif sur mesure",
      "Personnel sélectionné et de confiance",
      "Service construit avec le client selon ses besoins",
    ],
  },
];

export default function PricingSection() {
  const { openModal } = useModal();
  const regularPlans = plans.slice(0, 3);
  const premiumPlan = plans[3];

  return (
    <section id="pricing" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-6xl font-cinzel font-extrabold text-[var(--color-brand)]">
            Nos Offres
          </h2>
          <p className="text-[var(--color-cta)] mt-2 text-md font-semibold">
            Choisissez le soutien qui vous ressemble.
          </p>
        </div>

        {/* Regular Monthly Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {regularPlans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 border shadow-lg flex flex-col bg-[var(--color-background)] border-[var(--color-border)]`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--color-cta)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-4">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[var(--color-border)] flex items-center justify-center border border-[var(--color-brand-muted)]">
                  {idx === 0 ? (
                    <IconHeart className="w-6 h-6 text-[var(--color-brand)]" />
                  ) : idx === 1 ? (
                    <IconStar className="w-6 h-6 text-[var(--color-brand)]" />
                  ) : (
                    <IconUsers className="w-6 h-6 text-[var(--color-brand-muted)]" />
                  )}
                </div>

                <h3 className="font-cinzel text-xl font-bold text-[var(--color-brand)]">
                  {plan.name}
                </h3>
                <p className="text-sm text-[var(--color-muted)] mt-1 h-12 flex items-center justify-center">
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-cinzel font-bold text-[var(--color-text)]">
                  {plan.price}
                  {plan.frequency && (
                    <span className="text-base font-medium text-[var(--color-muted)] ml-1">
                      {plan.frequency}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-grow text-sm text-[var(--color-text)]">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start">
                    <IconSparkles className="w-4 h-4 mr-3 text-[var(--color-brand-muted)] mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openModal("service", { serviceName: plan.name })}
                className="w-full mt-2 inline-block text-center bg-[var(--color-cta)] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[var(--color-cta-hover)] active:bg-[var(--color-cta-active)]"
                aria-label={`Choisir ${plan.name}`}
              >
                Choisir
              </button>
            </div>
          ))}
        </div>

        {/* Premium Service Section */}
        <div className="relative mt-24">
          <div className="max-w-6xl mx-auto">
            {/* Premium Header */}
            <div className="text-center mb-16">
              <div className="inline-block">
                <span className="text-xs font-semibold text-[var(--color-cta)] uppercase tracking-wider mb-2 block">
                  Service exclusif
                </span>
                <h3 className="text-4xl font-cinzel font-extrabold text-[var(--color-brand)] mb-4">
                  Rôle sur mesure
                </h3>
                <div className="w-16 h-px bg-[var(--color-border)] mx-auto"></div>
              </div>
              <p className="text-[var(--color-muted)] text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
                Pour les moments qui comptent vraiment. Un accompagnement
                personnalisé, pensé et réalisé selon vos besoins les plus
                spécifiques.
              </p>
            </div>

            {/* Premium Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Description */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-2xl font-cinzel font-bold text-[var(--color-brand)] mb-4">
                    Une expérience unique
                  </h4>
                  <p className="text-[var(--color-muted)] leading-relaxed mb-6">
                    Chaque projet est une création originale. Nous prenons le
                    temps de comprendre votre vision, vos attentes, et concevons
                    un service qui vous ressemble parfaitement.
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-[var(--color-text)] mb-3">
                    Ce qui vous attend :
                  </h5>
                  <div className="space-y-3">
                    {premiumPlan.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-brand-muted)] mt-2 flex-shrink-0"></div>
                        <span className="text-[var(--color-text)] text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing Cards */}
              <div className="space-y-6">
                {/* Main Pricing Card */}
                <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-cinzel font-bold text-[var(--color-text)] mb-2">
                      À partir de $500
                    </div>
                    <p className="text-[var(--color-muted)] text-sm">
                      Tarif adapté à votre projet
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {premiumPlan.features.slice(3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <IconSparkles className="w-4 h-4 text-[var(--color-brand-muted)] flex-shrink-0" />
                        <span className="text-[var(--color-text)] text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      openModal("service", { serviceName: "Rôle sur mesure" })
                    }
                    className="w-full block text-center bg-[var(--color-cta)] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[var(--color-cta-hover)] active:bg-[var(--color-cta-active)] transition-colors duration-200"
                    aria-label={`Choisir ${premiumPlan.name}`}
                  >
                    Discuter de mon projet
                  </button>
                </div>

                {/* Additional Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-4 text-center">
                    <div className="font-semibold text-[var(--color-text)] mb-1">
                      Demi-journée
                    </div>
                    <div className="text-lg font-cinzel font-bold text-[var(--color-brand)]">
                      $500
                    </div>
                    <div className="text-xs text-[var(--color-muted)]">
                      4 heures
                    </div>
                  </div>
                  <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-4 text-center">
                    <div className="font-semibold text-[var(--color-text)] mb-1">
                      Journée
                    </div>
                    <div className="text-lg font-cinzel font-bold text-[var(--color-brand)]">
                      $900
                    </div>
                    <div className="text-xs text-[var(--color-muted)]">
                      8 heures
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-[var(--color-muted)]">
                    Chaque devis est établi sur mesure • Réponse sous 48h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
