"use client";

import { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!hasEntered) return;

    const autoScrollCancelledRef = { current: false } as { current: boolean };
    const animationRef = { current: 0 } as { current: number | null };
    const timeoutRef = { current: 0 } as { current: number | null };
    const lastTimeRef = { current: 0 } as { current: number | null };

    const cancelAutoScroll = () => {
      autoScrollCancelledRef.current = true;
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      lastTimeRef.current = null;
    };

    const handleUserInteraction = () => {
      if (!autoScrollCancelledRef.current) {
        cancelAutoScroll();
      }
    };

    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction, { passive: true });

    const animatePageScroll = () => {
      const pixelsPerSecond = 130;

      const step = (timestamp: number) => {
        if (autoScrollCancelledRef.current) return;

        if (!lastTimeRef.current) {
          lastTimeRef.current = timestamp;
        }

        const delta = Math.min(timestamp - lastTimeRef.current, 50);
        lastTimeRef.current = timestamp;

        const currentY = window.scrollY;
        const pageHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
        );
        const maxY = pageHeight - window.innerHeight;
        const nextY = Math.min(currentY + (pixelsPerSecond * delta) / 1000, maxY);

        window.scrollTo(0, nextY);

        if (nextY + 1 < maxY) {
          animationRef.current = window.requestAnimationFrame(step);
        }
      };

      animationRef.current = window.requestAnimationFrame(step);
    };

    timeoutRef.current = window.setTimeout(() => {
      if (!autoScrollCancelledRef.current) {
        animatePageScroll();
      }
    }, 5000);

    return () => {
      cancelAutoScroll();
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [hasEntered]);

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
