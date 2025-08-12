"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Agents", href: "/agents" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b" style={{ borderColor: "var(--color-border)" }}>
      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="h-20 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Left spacer to aid centering on larger screens */}
          <div className="w-24 hidden md:block" />

          {/* Centered nav */}
          <nav className="flex-1 flex items-center justify-center overflow-x-auto">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <MotionLink
                    href={item.href}
                    className={["text-base transition-colors", isActive(item.href) ? "font-semibold" : ""].join(" ")}
                    style={{
                      color: isActive(item.href)
                        ? "var(--color-brand)"
                        : "color-mix(in oklab, var(--color-brand) 60%, white)",
                    }}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  >
                    {item.label}
                  </MotionLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA button */}
          <div className="w-24 flex justify-end">
            <MotionLink
              href="/rejoindre"
              className="inline-flex items-center rounded-full px-4 py-2 text-white text-sm font-semibold shadow-sm focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: "var(--color-cta)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Rejoindre
            </MotionLink>
          </div>
        </motion.div>
      </div>
    </header>
  );
}


