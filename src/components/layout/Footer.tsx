"use client";

import Link from "next/link";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-[13px] md:text-sm leading-6 text-white/70 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-12">
          {/* Brand + blurb */}
          <div className="md:col-span-2">
            <h4 className="text-xl font-semibold">Humanicia</h4>
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
              <FooterLink href="#">Appels vocaux</FooterLink>
              <FooterLink href="#">Visioconférences</FooterLink>
              <FooterLink href="#">Rencontres</FooterLink>
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
              <FooterLink href="#">WhatsApp</FooterLink>
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
            {/* X */}
            <SocialIcon href="#" label="X">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M18.9 3H21l-6.9 7.9L22 21h-6.9l-4.5-5.4L4.6 21H3l7.4-8.5L2 3h7l4 4.8L18.9 3zM8.2 4.5H5.7l10.1 12.1h2.5L8.2 4.5z" />
              </svg>
            </SocialIcon>
            {/* LinkedIn */}
            <SocialIcon href="#" label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zM8.5 8h3.8v2.05h.05C13.1 8.76 15 8 16.9 8 21.1 8 23 10.6 23 15.1V23h-4v-6.5c0-1.55-.03-3.55-2.17-3.55-2.17 0-2.5 1.7-2.5 3.43V23h-4V8z" />
              </svg>
            </SocialIcon>
            {/* GitHub */}
            <SocialIcon href="#" label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.78-.25.78-.56v-2.1c-3.18.69-3.85-1.37-3.85-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.57-2.54-.29-5.2-1.27-5.2-5.66 0-1.25.44-2.27 1.16-3.07-.12-.29-.5-1.48.11-3.08 0 0 .96-.31 3.15 1.17.91-.25 1.87-.38 2.84-.39.96.01 1.93.13 2.84.39 2.18-1.48 3.14-1.17 3.14-1.17.61 1.6.23 2.8.11 3.08.72.8 1.15 1.82 1.15 3.07 0 4.39-2.67 5.36-5.22 5.65.42.36.8 1.07.8 2.17v3.22c0 .31.2.67.79.56A11.5 11.5 0 0 0 12 .5Z" />
              </svg>
            </SocialIcon>
            {/* Instagram */}
            <SocialIcon href="#" label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}


