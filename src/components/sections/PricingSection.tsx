"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle, Star, Users, Heart, Zap } from "lucide-react";

type PricingPlan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
  color: string;
  bgColor: string;
};

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "serenite",
    name: "Forfait Sérénité",
    price: "120 $",
    description:
      "Un rendez-vous doux et régulier, juste pour souffler et garder le contact.",
    features: [
      "1 appel (vocal ou visio) par semaine",
      "4 appels par mois",
      "Support par message",
      "Flexibilité d'horaire",
    ],
    icon: Heart,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: "compagnie",
    name: "Forfait Compagnie",
    price: "280 $",
    description:
      "Pour briser la solitude de façon continue et bâtir une vraie relation.",
    features: [
      "2 à 3 appels (vocaux ou visio) chaque semaine",
      "Environ 10 appels par mois",
      "Support prioritaire",
      "Suivi personnalisé",
      "Activités suggérées",
    ],
    icon: Users,
    popular: true,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: "presence",
    name: "Forfait Présence",
    price: "320 $",
    description:
      "L'équilibre parfait entre la chaleur d'une voix et la force d'une présence réelle.",
    features: [
      "8 appels (vocaux ou visio) par mois",
      "1 rencontre en personne (1h)",
      "Support premium",
      "Plan personnalisé",
      "Accès aux événements",
    ],
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "sur-mesure",
    name: "Forfait Sur-Mesure",
    price: "Prix adapté",
    description:
      "On construit ton plan ensemble, selon tes envies et ton rythme.",
    features: [
      "Mélange flexible d'appels, visio et activités",
      "Plan personnalisé selon tes besoins",
      "Support dédié",
      "Flexibilité maximale",
      "Évaluation continue",
    ],
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section
      id="pricing"
      aria-label="Forfaits mensuels"
      className="relative pt-24 md:pt-28 lg:pt-32 pb-24 md:pb-28 lg:pb-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-100/40 to-orange-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-100/40 to-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold"
            style={{ color: "var(--color-cta)" }}
          >
            Forfaits mensuels Humanicia
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            style={{ color: "var(--color-brand)" }}
          >
            Choisis le rythme de lien qui te fait du bien
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Humanicia s&apos;adapte à ton quotidien pour créer des connexions
            authentiques et bienveillantes.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative group ${plan.popular ? "lg:scale-105" : ""}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    🌟 Le plus populaire
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`
                 relative h-full p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col
                 ${
                   plan.popular
                     ? "border-orange-200 bg-white shadow-xl shadow-orange-100/50"
                     : "border-gray-200 bg-white shadow-lg hover:shadow-xl"
                 }
                 ${
                   hoveredPlan === plan.id ? "border-orange-300 shadow-2xl" : ""
                 }
               `}
              >
                {/* Content */}
                <div className="flex-1">
                  {/* Icon */}
                  <div
                    className={`
                     w-12 h-12 rounded-xl flex items-center justify-center mb-6
                     ${plan.bgColor} ${plan.color}
                   `}
                  >
                    <plan.icon className="w-6 h-6" />
                  </div>

                  {/* Plan name */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.id !== "sur-mesure" && (
                      <span className="text-gray-500 ml-1">/mois</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button - Always at bottom */}
                <div className="mt-8">
                  <button
                    className={`
                     w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer
                     ${
                       plan.popular
                         ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
                         : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                     }
                     transform hover:scale-105 active:scale-95
                   `}
                  >
                    {plan.id === "sur-mesure"
                      ? "Nous contacter"
                      : "Choisir ce forfait"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Pas sûr de quel forfait choisir ? Contactez-nous pour une
            consultation gratuite.
          </p>
          <button className="inline-flex items-center px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl cursor-pointer">
            Consultation gratuite
          </button>
        </motion.div>
      </div>
    </section>
  );
}
