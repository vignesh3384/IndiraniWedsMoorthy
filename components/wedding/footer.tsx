"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { KolamPattern } from "./decorative-elements";

export function Footer() {
  const { language } = useLanguage();
  const { couple, weddingDate } = weddingConfig;

  return (
    <footer className="relative py-16 px-4 bg-primary text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-4 left-4 opacity-10">
        <KolamPattern size={60} />
      </div>
      <div className="absolute bottom-4 right-4 opacity-10">
        <KolamPattern size={60} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Couple Names */}
        <h2 className={`mb-4 ${language === "tamil" ? "font-kavivanar font-medium text-3xl md:text-4xl" : "font-vibes font-normal text-4xl md:text-5xl tracking-normal"}`}>
          {language === "tamil" ? couple.groom.nameTamil : couple.groom.name} <span className="font-sans text-xl md:text-2xl px-2">&</span> {language === "tamil" ? couple.bride.nameTamil : couple.bride.name}
        </h2>

        {/* Wedding Date */}
        <p className="text-primary-foreground font-semibold mb-8">
          {weddingDate.toLocaleDateString(language === "tamil" ? "ta-IN" : "en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        {/* Thank You Message */}
        <p className="text-primary-foreground/90 font-medium text-sm max-w-md mx-auto mb-8">
          {language === "tamil"
            ? "எங்கள் சிறப்பு தினத்தில் எங்களுடன் இணைந்ததற்கு நன்றி"
            : "Thank you for being a part of our special day"}
        </p>

        {/* Divider */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-12 h-px bg-primary-foreground/30" />
          <div className="w-2 h-2 rounded-full bg-primary-foreground/30" />
          <div className="w-12 h-px bg-primary-foreground/30" />
        </div>

        {/* Copyright */}
        <p className="text-xs text-primary-foreground/70 font-medium">
          {language === "tamil"
            ? `© ${new Date().getFullYear()} | அன்புடன் உருவாக்கப்பட்டது`
            : `© ${new Date().getFullYear()} | Made with 🤍 by Harish & Aishu`}
        </p>
      </div>
    </footer>
  );
}
