"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export type ServiceInfo = {
  id: string;
  title: string;
  imageSrc: string;
  pricing: string;
  description: string;
  features: string[];
};

const SERVICE_DETAILS: ServiceInfo[] = [
  {
    id: "audio",
    title: "Appels vocaux",
    imageSrc: "/ServiceSection/AppelsVocaux.jpg",
    pricing: "20 $ / 30 min · 35 $ / 1 h",
    description: "Une voix qui t'écoute vraiment, sans jugement.",
    features: [
      "Raconte ta journée après le boulot.",
      "Brise la solitude, comme un café avec un ami.",
    ],
  },
  {
    id: "anonymous",
    title: "Appels anonymes",
    imageSrc: "/ServiceSection/AnonymousCalls.png",
    pricing: "20 $ / 30 min · 35 $ / 1 h",
    description: "Parle librement, en toute discrétion.",
    features: [
      "Confie un secret sans jamais dire ton nom.",
      "Vide ton sac, sans filtre ni gêne.",
    ],
  },
  {
    id: "visio",
    title: "Appels visio",
    imageSrc: "/ServiceSection/AppelVisio.jpg",
    pricing: "25 $ / 30 min · 45 $ / 1 h",
    description: "Parce que voir un visage change tout.",
    features: [
      "Un café virtuel qui ressemble à un vrai.",
      "Sourires, regards, une vraie présence à distance.",
    ],
  },
  {
    id: "presence",
    title: "Activités en personne",
    imageSrc: "/ServiceSection/ActivitesPresence.jpg",
    pricing: "dès 90 $ / h",
    description: "Une présence dédiée, pensée pour toi.",
      features: [
      "Être accompagné à un mariage ou une sortie.",
      "Partager une marche, un café ou un repas.",
      "Service haut de gamme sur mesure, construit avec le client selon ses besoins.",
    ],
  },
];

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string | null;
}

export default function ServiceModal({
  isOpen,
  onClose,
  serviceId,
}: ServiceModalProps) {
  const service = SERVICE_DETAILS.find((s) => s.id === serviceId);

  // Handle ESC key press and prevent body scroll
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (isOpen) {
      // Prevent body scroll when modal is open
      const scrollY = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";

      document.addEventListener("keydown", handleEscKey);
      document.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        // Restore body scroll when modal closes
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);

        document.removeEventListener("keydown", handleEscKey);
        document.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [isOpen, onClose]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[65]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-[70] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="relative p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {service.title}
                    </h2>
                    <p className="text-lg font-semibold text-orange-600 mt-1">
                      {service.pricing}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600 leading-relaxed">{feature}</p>
                    </li>
                  ))}
                </ul>

                {/* Special note for in-person activities */}
                {service.id === "presence" && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-blue-800 text-sm leading-relaxed">
                      <strong>
                        Ce prix inclut un accompagnement personnalisé, une
                        présence 100 % dédiée et un cadre sûr.
                      </strong>{" "}
                      Plus qu&apos;une simple sortie, c&apos;est un vrai moment
                      humain, pensé pour vous.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => {
                      // Close modal first, then scroll to contact section
                      onClose();
                      // Use setTimeout to ensure modal closes before scrolling
                      setTimeout(() => {
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors cursor-pointer"
                  >
                    Réserver maintenant
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
