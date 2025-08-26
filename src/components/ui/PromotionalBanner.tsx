"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true);

  // The banner is positioned fixed at the bottom and should overlay content.
  // No body padding adjustments are needed to avoid layout shifts when it opens/closes.

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      id="promotional-banner"
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-700/60 text-white overflow-hidden z-[60] backdrop-blur-md"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-10 -translate-y-10 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 -translate-y-16 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/4 w-16 h-16 bg-white/10 rounded-full translate-y-8 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Main content */}
          <div className="flex items-center space-x-4">
            {/* Launch badge */}
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/90 ring-1 ring-white/10">
              🚀 Lancement Officiel
            </div>

            {/* Main message */}
            <div className="flex items-center space-x-2 text-sm sm:text-base">
              <span className="font-semibold">🎉 OFFRE EXCLUSIVE :</span>
              <span className="font-bold text-indigo-300">25% de rabais</span>
              <span>pour les 100 premiers clients !</span>
            </div>
          </div>

          {/* CTA Button and flexible close button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white/90 transition-colors cursor-pointer shadow-sm"
            >
              Réserver maintenant
            </button>
            <button
              onClick={() => setIsVisible(false)}
              aria-label="Close promotional banner"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shadow-sm cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-2 text-center">
          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white/90 transition-colors cursor-pointer shadow-sm"
          >
            Réserver maintenant
          </button>
        </div>
      </div>

      {/* Close button will be rendered inside the main row (flex) so it flows responsively */}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "75%" }}
          transition={{ duration: 30, ease: "linear" }}
          className="h-full bg-indigo-400/80"
        />
      </div>
    </motion.div>
  );
}