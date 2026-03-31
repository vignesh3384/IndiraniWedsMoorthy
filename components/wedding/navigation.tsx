"use client";

import { useState, useEffect } from "react";
import { LanguageToggle, useLanguage } from "./language-provider";
import { weddingConfig } from "@/lib/wedding-config";
import { Menu, X } from "lucide-react";

const navItems = {
  english: [
    { href: "#home", label: "Home" },
    { href: "#events", label: "Events" },
    { href: "#gallery", label: "Gallery" },
    { href: "#venue", label: "Venue" },
    { href: "#contact", label: "Contact" },
  ],
  tamil: [
    { href: "#home", label: "முகப்பு" },
    { href: "#events", label: "நிகழ்வுகள்" },
    { href: "#gallery", label: "கேலரி" },
    { href: "#venue", label: "இடம்" },
    { href: "#contact", label: "தொடர்பு" },
  ],
};

export function Navigation() {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentNavItems = navItems[language];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "glass-panel bg-white/70 dark:bg-black/70 py-2 border-b-0"
            : "bg-transparent py-4 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Couple Initials */}
            <a
              href="#home"
              className={`font-serif text-2xl text-primary hover:text-primary/80 transition-colors ${language === "tamil" ? "font-tamil-thin font-light" : "font-serif"}`}
            >
              {language === "tamil" 
                ? `${weddingConfig.couple.groom.nameTamil[0]} & ${weddingConfig.couple.bride.nameTamil[0]}`
                : `${weddingConfig.couple.groom.name[0]} & ${weddingConfig.couple.bride.name[0]}`
              }
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {currentNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Language Toggle & Mobile Menu */}
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <button
                className="md:hidden p-2 text-foreground font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="px-4 py-4 space-y-2">
              {currentNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-foreground font-medium hover:text-primary transition-colors border-b border-primary/10 last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
