"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { SectionDivider } from "./decorative-elements";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

// ─── Carousel Card ────────────────────────────────────────────────────────────
function CarouselCard({
  src,
  alt,
  isActive,
  isSide,
  onClick,
}: {
  src: string;
  alt: string;
  isActive: boolean;
  isSide: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      animate={{
        scale: isActive ? 1 : isSide ? 0.84 : 0.72,
        opacity: isActive ? 1 : isSide ? 0.55 : 0.3,
        rotateY: isActive ? 0 : 0,
        zIndex: isActive ? 20 : isSide ? 10 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer select-none group"
      style={{
        boxShadow: isActive
          ? "0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)"
          : "0 10px 30px rgba(0,0,0,0.15)",
      }}
      role="button"
      aria-label={`View ${alt}`}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        draggable={false}
      />

      {/* Overlay gradient – only on active */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="flex items-center gap-2 text-white text-sm font-semibold tracking-widest uppercase backdrop-blur-md bg-white/10 px-5 py-2.5 rounded-full border border-white/30 shadow-lg">
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
            View
          </span>
        </div>
      )}

      {/* Active card badge */}
      {isActive && (
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse" />
      )}
    </motion.div>
  );
}

// ─── Main Gallery Section ─────────────────────────────────────────────────────
export function GallerySection() {
  const { language } = useLanguage();
  const { gallery } = weddingConfig;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
    containScroll: false,
  });

  // ── Sync Embla scroll with selectedIndex ─────────────────────────────────
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // ── Nav helpers ────────────────────────────────────────────────────────────
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo   = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  // ── Keyboard support (arrow keys) ─────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft")  setLightboxIndex(i => i !== null ? (i - 1 + gallery.length) % gallery.length : null);
        if (e.key === "ArrowRight") setLightboxIndex(i => i !== null ? (i + 1) % gallery.length : null);
        if (e.key === "Escape")     closeLightbox();
      } else {
        if (e.key === "ArrowLeft")  scrollPrev();
        if (e.key === "ArrowRight") scrollNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, scrollPrev, scrollNext, gallery.length]);

  // ── Lightbox ──────────────────────────────────────────────────────────────
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="gallery" className="py-14 px-4 bg-card relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/images/gallery-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
            {language === "tamil" ? "புகைப்படத் தொகுப்பு" : "Photo Gallery"}
          </h2>
          <p className="text-foreground font-medium drop-shadow-sm">
            {language === "tamil"
              ? "எங்கள் அழகான தருணங்கள்"
              : "Our beautiful moments together"}
          </p>

          {/* Swipe hint */}
          <motion.p
            className="mt-3 text-xs text-muted-foreground tracking-widest uppercase flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>←</span>
            {language === "tamil" ? "இழுக்கவும் / வழுக்கவும்" : "drag or swipe to explore"}
            <span>→</span>
          </motion.p>
        </motion.div>

        {/* ── Embla Carousel ─────────────────────────────────────────────── */}
        <div className="relative">
          {/* Arrow: Left */}
          <button
            onClick={scrollPrev}
            aria-label="Previous photo"
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-30
                       w-10 h-10 md:w-12 md:h-12 rounded-full
                       bg-background/80 backdrop-blur border border-primary/30
                       text-primary hover:bg-primary hover:text-primary-foreground
                       shadow-lg transition-all duration-200 flex items-center justify-center
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Viewport */}
          <div
            ref={emblaRef}
            className="overflow-hidden px-[12%] md:px-[18%] py-8"
            style={{ perspective: "1200px" }}
          >
            <div className="flex touch-pan-y gap-4">
              {gallery.map((image, idx) => {
                const distance = Math.abs(idx - selectedIndex);
                // account for loop wrap-around
                const wrappedDistance = Math.min(distance, gallery.length - distance);
                const isActive = idx === selectedIndex;
                const isSide   = wrappedDistance === 1;

                return (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-[72vw] sm:w-[56vw] md:w-[40vw] lg:w-[34vw]"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <CarouselCard
                      src={image.src}
                      alt={image.alt}
                      isActive={isActive}
                      isSide={isSide}
                      onClick={() => {
                        if (isActive) {
                          openLightbox(idx);
                        } else {
                          scrollTo(idx);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrow: Right */}
          <button
            onClick={scrollNext}
            aria-label="Next photo"
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-30
                       w-10 h-10 md:w-12 md:h-12 rounded-full
                       bg-background/80 backdrop-blur border border-primary/30
                       text-primary hover:bg-primary hover:text-primary-foreground
                       shadow-lg transition-all duration-200 flex items-center justify-center
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ── Pagination Dots ─────────────────────────────────────────────── */}
        <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Gallery pagination">
          {gallery.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === selectedIndex}
              aria-label={`Go to photo ${idx + 1}`}
              onClick={() => scrollTo(idx)}
              className="transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                width:  idx === selectedIndex ? "28px" : "8px",
                height: "8px",
                background: idx === selectedIndex
                  ? "hsl(var(--primary))"
                  : "hsl(var(--primary) / 0.3)",
              }}
            />
          ))}
        </div>

        {/* Counter label */}
        <p className="text-center text-xs text-muted-foreground mt-3 tracking-wider">
          {selectedIndex + 1} / {gallery.length}
        </p>

        <SectionDivider className="mt-16" />
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(i => i !== null ? (i - 1 + gallery.length) % gallery.length : null);
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -20 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="max-w-5xl max-h-[90vh] p-4 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={gallery[lightboxIndex].src}
                  alt={gallery[lightboxIndex].alt}
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(i => i !== null ? (i + 1) % gallery.length : null);
              }}
              aria-label="Next photo"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Lightbox dots */}
            <div className="absolute bottom-6 flex gap-2">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                  aria-label={`Photo ${idx + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  idx === lightboxIndex ? "24px" : "8px",
                    height: "8px",
                    background: idx === lightboxIndex ? "white" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
