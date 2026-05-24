"use client";

import { useState } from "react";
import { LanguageProvider } from "@/components/wedding/language-provider";
import { Navigation } from "@/components/wedding/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/wedding/hero-section";
import { EventsSection } from "@/components/wedding/events-section";
import { GallerySection } from "@/components/wedding/gallery-section";
import { VenueSection } from "@/components/wedding/venue-section";
import { ContactSection } from "@/components/wedding/contact-section";
import { Footer } from "@/components/wedding/footer";
import { MusicPlayer } from "@/components/wedding/music-player";
import { WhatsAppButton } from "@/components/wedding/whatsapp-button";
import { LandingGate } from "@/components/wedding/landing-gate";

export default function WeddingPage() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      {/* ── Sci-Fi Landing Gate ── */}
      <AnimatePresence>
        {!hasEntered && (
          <LandingGate onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* ── Full Wedding Website (revealed after gate) ── */}
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <LanguageProvider>
              <motion.main
                className="min-h-screen bg-background text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <Navigation />
                <HeroSection />
                <EventsSection />
                <GallerySection />
                <VenueSection />
                <ContactSection />
                <Footer />
                <MusicPlayer autoPlay={true} />
                <WhatsAppButton />
              </motion.main>
            </LanguageProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
