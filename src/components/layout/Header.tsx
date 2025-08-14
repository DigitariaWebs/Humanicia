"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { useModal } from "@/components/providers/ModalProvider";

const MotionLink = motion.create(Link);

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/apropre" },
  { label: "Services", href: "/#services" },
  { label: "Agents", href: "/agent" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { openModal } = useModal();

  // Track which in-page section is active on the homepage
  const [activeSectionId, setActiveSectionId] = React.useState<string | null>(null);

  const sectionIds = React.useMemo(
    () => NAV_ITEMS.filter((i) => i.href.startsWith("/#")).map((i) => i.href.split("#")[1] || ""),
    []
  );

  React.useEffect(() => {
    // Only observe sections on the homepage
    if (pathname !== "/") {
      setActiveSectionId(null);
      return;
    }

    const elements = sectionIds
      .map((id) => (typeof document !== "undefined" ? document.getElementById(id) : null))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          intersecting.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );
          setActiveSectionId(intersecting[0].target.id);
        } else {
          // If no observed section is in view, keep homepage highlighted
          setActiveSectionId(null);
        }
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: [0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observer.observe(el));

    // Initialize from current hash if present
    if (typeof window !== "undefined" && window.location.hash) {
      setActiveSectionId(window.location.hash.replace("#", ""));
    }

    return () => observer.disconnect();
  }, [pathname, sectionIds]);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      // On home, highlight Accueil only when no section is active
      return pathname === "/" && !activeSectionId;
    }
    if (href.startsWith("/#")) {
      if (pathname !== "/") return false;
      const id = href.split("#")[1] || "";
      return activeSectionId === id;
    }
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b" style={{ borderColor: "var(--color-border)" }}>
      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="h-20 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
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
                    className={[
                      "text-base rounded-md px-2 py-1 transition-colors",
                      isActive(item.href) ? "font-semibold" : "",
                    ].join(" ")}
                    style={{
                      color: isActive(item.href)
                        ? "var(--color-brand)"
                        : "color-mix(in oklab, var(--color-brand) 60%, white)",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => {
                      if (item.href === "/") {
                        setActiveSectionId(null);
                      } else if (item.href.startsWith("/#")) {
                        const id = item.href.split("#")[1] || "";
                        setActiveSectionId(id);
                      }
                    }}
                    whileHover={{
                      y: -2,
                      color: "var(--color-cta)",
                      backgroundColor:
                        "color-mix(in oklab, var(--color-cta) 14%, white)",
                    }}
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
            <button
              onClick={() => openModal("consultation")}
              className="inline-flex items-center rounded-full px-4 py-2 text-white text-sm font-semibold shadow-sm focus:outline-none focus-visible:ring-2"
              style={{ backgroundColor: "var(--color-cta)" }}
            >
              Rejoindre
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}


