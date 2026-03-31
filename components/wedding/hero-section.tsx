"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { CountdownTimer } from "./countdown-timer";
import { KolamPattern } from "./decorative-elements";
import { motion } from "framer-motion";

export function HeroSection() {
  const { language } = useLanguage();
  const { couple, tagline, taglineTamil, weddingDate } = weddingConfig;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/temple-background.jpg')" }}
      />

      {/* Gradient & Texture Overlays (Increased opacity for better text visibility) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/100 z-0" />
      <div className="absolute inset-0 bg-[url('/patterns/floral-bg.svg')] bg-repeat opacity-5 pointer-events-none" />
      
      {/* Decorative Kolam Corners */}
      <div className="absolute top-8 left-8 opacity-20">
        <KolamPattern size={80} />
      </div>
      <div className="absolute top-8 right-8 opacity-20 rotate-90">
        <KolamPattern size={80} />
      </div>
      <div className="absolute bottom-8 left-8 opacity-20 -rotate-90">
        <KolamPattern size={80} />
      </div>
      <div className="absolute bottom-8 right-8 opacity-20 rotate-180">
        <KolamPattern size={80} />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center px-4 py-20 w-full max-w-4xl mx-auto mt-16"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Decorative Top Element */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-px bg-[var(--golden-green)] drop-shadow-sm" />
          <div className="mx-4 drop-shadow-sm">
            <JasmineIcon />
          </div>
          <div className="w-24 h-px bg-[var(--golden-green)] drop-shadow-sm" />
        </div>

        {/* Tagline */}
        <motion.p 
          className="text-foreground text-sm md:text-base tracking-widest uppercase mb-4 font-bold drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {language === "tamil" ? taglineTamil : tagline}
        </motion.p>

        {/* Couple Names */}
        <motion.h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
        >
          <span className={`block text-primary drop-shadow-lg ${language === "tamil" ? "font-tamil-thin font-light tracking-wide" : "font-serif font-light tracking-wide"}`}>
            {language === "tamil" ? couple.groom.nameTamil : couple.groom.name}
          </span>
          <span className="text-[var(--golden-green)] text-3xl md:text-5xl font-light drop-shadow-md inline-block mx-4">
            &
          </span>
          <span className={`block text-primary drop-shadow-lg ${language === "tamil" ? "font-tamil-thin font-light tracking-wide" : "font-serif font-light tracking-wide"}`}>
            {language === "tamil" ? couple.bride.nameTamil : couple.bride.name}
          </span>
        </motion.h1>

        {/* Wedding Date */}
        <div className="mt-8 mb-12">
          <p className="font-serif text-xl md:text-2xl text-foreground font-bold drop-shadow-md">
            {weddingDate.toLocaleDateString(language === "tamil" ? "ta-IN" : "en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer targetDate={weddingDate} />

        {/* Decorative Bottom Element */}
        <div className="flex justify-center mt-12">
          <div className="w-16 h-px bg-[var(--golden-green)]" />
          <div className="mx-4">
            <TempleMotif />
          </div>
          <div className="w-16 h-px bg-[var(--golden-green)]" />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            className="w-8 h-8 text-primary shadow-sm"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function JasmineIcon() {
  return (
    <svg
      className="w-8 h-8 text-[var(--golden-green)]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C12 2 9 5 9 8C9 9.5 10 11 12 11C14 11 15 9.5 15 8C15 5 12 2 12 2Z" />
      <path d="M12 13C12 13 9 16 9 19C9 20.5 10 22 12 22C14 22 15 20.5 15 19C15 16 12 13 12 13Z" />
      <path d="M2 12C2 12 5 9 8 9C9.5 9 11 10 11 12C11 14 9.5 15 8 15C5 15 2 12 2 12Z" />
      <path d="M13 12C13 12 16 9 19 9C20.5 9 22 10 22 12C22 14 20.5 15 19 15C16 15 13 12 13 12Z" />
    </svg>
  );
}

function TempleMotif() {
  return (
    <svg
      className="w-12 h-8 text-primary/60"
      viewBox="0 0 48 32"
      fill="currentColor"
    >
      <path d="M24 0L28 8H20L24 0Z" />
      <rect x="20" y="8" width="8" height="4" />
      <rect x="16" y="12" width="16" height="4" />
      <rect x="12" y="16" width="24" height="16" />
      <rect x="20" y="22" width="8" height="10" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
