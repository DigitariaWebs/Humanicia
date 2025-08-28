"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { useModal } from "@/components/providers/ModalProvider";
import { ChevronDown, Sparkles } from "lucide-react";

const MotionLink = motion.create(Link);

type NavItem = {
  label: string;
  href: string;
  isDropdown?: boolean;
  dropdownItems?: { label: string; href: string; description: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/apropre" },
  {
    label: "Services",
    href: "/#services",
    isDropdown: true,
    dropdownItems: [
      {
        label: "Nos 4 Services",
        href: "/#services",
        description: "Découvrez nos services de compagnie",
      },
      {
        label: "Les Forfaits Mensuels",
        href: "/#pricing",
        description: "Tarifs et abonnements",
      },
    ],
  },
  { label: "Agents", href: "/agent" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Track which in-page section is active on the homepage
  const [activeSectionId, setActiveSectionId] = React.useState<string | null>(
    null
  );

  const sectionIds = React.useMemo(
    () =>
      NAV_ITEMS.filter((i) => i.href.startsWith("/#")).map(
        (i) => i.href.split("#")[1] || ""
      ),
    []
  );

  React.useEffect(() => {
    // Only observe sections on the homepage
    if (pathname !== "/") {
      setActiveSectionId(null);
      return;
    }

    const elements = sectionIds
      .map((id) =>
        typeof document !== "undefined" ? document.getElementById(id) : null
      )
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

  React.useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Ensure header is anchored to the top and remove any leftover top padding added by other scripts
  React.useEffect(() => {
    const headerEl = document.querySelector("header");
    try {
      if (headerEl) {
        headerEl.style.top = "0px";
      }
      if (typeof document !== "undefined" && document.body) {
        // Clear any stray top padding that might push content down
        document.body.style.paddingTop = "0px";
      }
    } catch {
      // ignore DOM manipulation errors in non-browser environments
    }
    // Intentionally not reverting changes on unmount to keep header at top
  }, []);

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
    <>
      <header
        className="fixed top-0 z-50 w-full bg-white backdrop-blur supports-[backdrop-filter]:bg-white border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        {/* Main navigation row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="h-20 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Logo - Left */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/Logo.png"
                  alt="Humanicia Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Centered nav - Desktop only */}
            <nav className="hidden md:flex flex-1 items-center justify-center overflow-x-auto mx-8">
              <ul className="flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href} className="relative">
                    {item.isDropdown ? (
                      <div
                        className="relative"
                        onMouseEnter={() => {
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current);
                          }
                          setServicesDropdownOpen(true);
                        }}
                        onMouseLeave={() => {
                          dropdownTimeoutRef.current = setTimeout(() => {
                            setServicesDropdownOpen(false);
                          }, 200);
                        }}
                      >
                        <motion.button
                          className={[
                            "text-base rounded-md px-3 py-2 transition-all duration-300 flex items-center gap-1 font-semibold relative overflow-hidden",
                            isActive(item.href) ? "font-bold" : "",
                          ].join(" ")}
                          style={{
                            color: isActive(item.href)
                              ? "var(--color-brand)"
                              : "color-mix(in oklab, var(--color-brand) 60%, white)",
                            backgroundColor: servicesDropdownOpen
                              ? "var(--color-cta)"
                              : "transparent",
                          }}
                          whileHover={{
                            y: -2,
                            color: "white",
                            backgroundColor: "var(--color-cta)",
                            scale: 1.05,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                          }}
                        >
                          <Sparkles className="w-4 h-4" />
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              servicesDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                          {/* Animated background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0"
                            animate={{
                              opacity: servicesDropdownOpen ? 0.1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      </div>
                    ) : (
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
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 18,
                        }}
                      >
                        {item.label}
                      </MotionLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA button - Right (Desktop) */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <button
                onClick={() => openModal("consultation")}
                className="inline-flex items-center rounded-full px-4 py-2 text-white text-sm font-semibold shadow-sm focus:outline-none focus-visible:ring-2"
                style={{ backgroundColor: "var(--color-cta)" }}
              >
                Rejoindre
              </button>
            </div>

            {/* Mobile menu toggle - Right (Mobile only) */}
            <div className="flex md:hidden ml-auto">
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-md ring-1 ring-black/5 bg-white/70 backdrop-blur"
              >
                {mobileOpen ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div
            className="md:hidden fixed top-20 inset-x-0 z-50 border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white"
            style={{ borderColor: "var(--color-border)" }}
          >
            <nav className="max-w-7xl mx-auto px-4 py-3">
              <ul className="grid gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    {item.isDropdown ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileServicesOpen(!mobileServicesOpen)
                          }
                          className="w-full flex items-center justify-between rounded-md px-3 py-2 text-base font-semibold"
                          style={{
                            color: isActive(item.href)
                              ? "var(--color-brand)"
                              : "color-mix(in oklab, var(--color-brand) 70%, white)",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            {item.label}
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-1"
                          >
                            {item.dropdownItems?.map((dropdownItem, index) => (
                              <motion.div
                                key={dropdownItem.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Link
                                  href={dropdownItem.href}
                                  className="block rounded-md px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
                                  style={{ color: "var(--color-brand)" }}
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileServicesOpen(false);
                                    if (dropdownItem.href.startsWith("/#")) {
                                      const id =
                                        dropdownItem.href.split("#")[1] || "";
                                      setActiveSectionId(id);
                                    }
                                  }}
                                >
                                  <div className="font-medium">
                                    {dropdownItem.label}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {dropdownItem.description}
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base"
                        style={{
                          color: isActive(item.href)
                            ? "var(--color-brand)"
                            : "color-mix(in oklab, var(--color-brand) 70%, white)",
                        }}
                        onClick={() => {
                          setMobileOpen(false);
                          if (item.href === "/") {
                            setActiveSectionId(null);
                          } else if (item.href.startsWith("/#")) {
                            const id = item.href.split("#")[1] || "";
                            setActiveSectionId(id);
                          }
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li className="pt-1">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openModal("consultation");
                    }}
                    className="w-full inline-flex items-center justify-center rounded-full px-4 py-2 text-white text-sm font-semibold shadow-sm"
                    style={{ backgroundColor: "var(--color-cta)" }}
                  >
                    Rejoindre
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Services dropdown - positioned outside header */}
      {servicesDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="fixed w-56 bg-white rounded-lg shadow-lg border border-gray-200"
          style={{
            zIndex: 9999,
            top: "88px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onMouseEnter={() => {
            if (dropdownTimeoutRef.current) {
              clearTimeout(dropdownTimeoutRef.current);
            }
            setServicesDropdownOpen(true);
          }}
          onMouseLeave={() => {
            dropdownTimeoutRef.current = setTimeout(() => {
              setServicesDropdownOpen(false);
            }, 200);
          }}
        >
          <div className="py-2">
            <Link
              href="/#services"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => {
                setServicesDropdownOpen(false);
                setActiveSectionId("services");
              }}
            >
              <div className="font-medium">Nos 4 Services</div>
              <div className="text-sm text-gray-500 mt-1">
                Découvrez nos services
              </div>
            </Link>

            <Link
              href="/#pricing"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => {
                setServicesDropdownOpen(false);
                setActiveSectionId("pricing");
              }}
            >
              <div className="font-medium">Les Forfaits Mensuels</div>
              <div className="text-sm text-gray-500 mt-1">
                Tarifs et abonnements
              </div>
            </Link>
          </div>
        </motion.div>
      )}

      <div aria-hidden className="h-20 w-full" />
    </>
  );
}


