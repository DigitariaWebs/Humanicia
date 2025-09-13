"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ServiceModal from "@/components/models/ServiceModal";

function FooterLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className="block text-[13px] md:text-sm leading-6 text-white/70 hover:text-white transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  children,
  ...props
}: {
  href: string;
  label: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  const handleServiceClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedServiceId(null);
  };

  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-12">
          {/* Brand + blurb */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/Logo.png"
                alt="Humanicia Logo"
                width={428}
                height={428}
                className="h-8 w-auto"
              />
            </div>
            <p className="mt-3 text-[12px] md:text-[13px] leading-6 text-white/70 max-w-[22rem]">
              Offrir une présence humaine, bienveillante
              <br className="hidden sm:block" />
              et authentique, là où vous en avez besoin.
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <p className="text-sm font-semibold mb-3">Liens rapides</p>
            <nav className="space-y-2">
              <FooterLink href="#">Accueil</FooterLink>
              <FooterLink href="#services">Services</FooterLink>
              <FooterLink href="#agents">Agents</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </nav>
          </div>

          {/* Column 2 */}
          <div>
            <p className="text-sm font-semibold mb-3">Services</p>
            <nav className="space-y-2">
              <button
                onClick={() => handleServiceClick("audio")}
                className="block text-[13px] md:text-sm leading-6 text-white/70 hover:text-white transition-colors text-left w-full cursor-pointer"
              >
                Appels vocaux
              </button>
              <button
                onClick={() => handleServiceClick("visio")}
                className="block text-[13px] md:text-sm leading-6 text-white/70 hover:text-white transition-colors text-left w-full cursor-pointer"
              >
                Appels visio
              </button>
              <button
                onClick={() => handleServiceClick("presence")}
                className="block text-[13px] md:text-sm leading-6 text-white/70 hover:text-white transition-colors text-left w-full cursor-pointer"
              >
                Activités en présence
              </button>
              <button
                onClick={() => handleServiceClick("anonymous")}
                className="block text-[13px] md:text-sm leading-6 text-white/70 hover:text-white transition-colors text-left w-full cursor-pointer"
              >
                Anonymous Calls
              </button>
            </nav>
          </div>

          {/* Column 3 */}
          <div>
            <p className="text-sm font-semibold mb-3">Ressources</p>
            <nav className="space-y-2">
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Témoignages</FooterLink>
              <FooterLink href="#">Comment ça marche</FooterLink>
            </nav>
          </div>

          {/* Column 4 - Assistance aligned in same row */}
          <div className="md:col-span-1">
            <p className="text-sm font-semibold mb-3">Assistance</p>
            <nav className="space-y-2">
              <FooterLink href="#contact">Nous contacter</FooterLink>
              <FooterLink href="https://wa.me/15145188251" target="_blank" rel="noopener noreferrer">WhatsApp</FooterLink>
              <FooterLink href="#">Reporter un problème</FooterLink>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t" style={{ borderColor: "#2a2a2a" }} />

        {/* Bottom bar */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-white/60">2025 - Humanicia</p>
          <div className="flex items-center gap-2">
            {/* Facebook */}
            <SocialIcon href="https://www.facebook.com/profile.php?id=61579868228310&locale=fr_CA" label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceId={selectedServiceId}
      />
    </footer>
  );
}


