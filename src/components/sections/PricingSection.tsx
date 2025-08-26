import React from "react";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {plans.map((plan, idx) => (
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
                  ) : idx === 2 ? (
                    <IconUsers className="w-6 h-6 text-[var(--color-brand-muted)]" />
                  ) : (
                    <IconSparkles className="w-6 h-6 text-[var(--color-brand-muted)]" />
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

              <a
                href="#contact"
                className="w-full mt-2 inline-block text-center bg-[var(--color-cta)] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[var(--color-cta-hover)] active:bg-[var(--color-cta-active)]"
                aria-label={`Choisir ${plan.name}`}
              >
                Choisir
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
