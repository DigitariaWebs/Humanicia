"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true);

  // Add effect to adjust body padding and header position when banner is visible
  React.useEffect(() => {
    const header = document.querySelector('header');
    
    if (isVisible) {
      document.body.style.paddingTop = '95px'; // Adjust based on banner + header height
      if (header) {
        header.style.top = '55px'; // Move header below banner
      }
    } else {
      document.body.style.paddingTop = '80px'; // Just header height
      if (header) {
        header.style.top = '0px'; // Move header back to top
      }
    }

    return () => {
      document.body.style.paddingTop = '80px'; // Reset to header height only
      if (header) {
        header.style.top = '0px'; // Reset header position
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden z-[60]"
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
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
              🚀 Lancement Officiel
            </div>
            
            {/* Main message */}
            <div className="flex items-center space-x-2 text-sm sm:text-base">
              <span className="font-semibold">🎉 OFFRE EXCLUSIVE :</span>
              <span className="font-bold text-yellow-300">25% de rabais</span>
              <span>pour les 100 premiers clients !</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-yellow-100 transition-colors cursor-pointer"
            >
              Réserver maintenant
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-2 text-center">
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-yellow-100 transition-colors cursor-pointer"
          >
            Réserver maintenant
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "75%" }}
          transition={{ duration: 30, ease: "linear" }}
          className="h-full bg-yellow-300"
        />
      </div>
    </motion.div>
  );
} 