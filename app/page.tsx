"use client";

import { LanguageProvider } from "@/components/wedding/language-provider";
import { Navigation } from "@/components/wedding/navigation";
import { HeroSection } from "@/components/wedding/hero-section";
import { EventsSection } from "@/components/wedding/events-section";
import { GallerySection } from "@/components/wedding/gallery-section";
import { VenueSection } from "@/components/wedding/venue-section";
import { ContactSection } from "@/components/wedding/contact-section";
import { Footer } from "@/components/wedding/footer";
import { MusicPlayer } from "@/components/wedding/music-player";
import { WhatsAppButton } from "@/components/wedding/whatsapp-button";

export default function WeddingPage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Navigation />
        <HeroSection />
        <EventsSection />
        <GallerySection />
        <VenueSection />
        <ContactSection />
        <Footer />
        <MusicPlayer />
        <WhatsAppButton />
      </main>
    </LanguageProvider>
  );
}
