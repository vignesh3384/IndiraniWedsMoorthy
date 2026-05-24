"use client";

import { useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { SectionDivider } from "./decorative-elements";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function GallerySection() {
  const { language } = useLanguage();
  const { gallery } = weddingConfig;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % gallery.length);
    }
  };

  return (
    <section id="gallery" className="py-14 px-4 bg-card relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/images/gallery-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8"
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
        </motion.div>

        {/* Responsive Masonry Gallery Layout */}
        <motion.div 
          className="relative glass-panel bg-white/40 dark:bg-black/40 p-4 md:p-6 rounded-3xl overflow-hidden mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance] box-border">
            {gallery.map((_, idx) => {
              // Alternate aspect ratios beautifully to showcase the couple clearly without cropping faces
              const aspectClass = 
                idx % 3 === 0 ? "aspect-[4/5]" : 
                idx % 3 === 1 ? "aspect-square" : 
                "aspect-[3/2]";

              return (
                <div key={idx} className="break-inside-avoid mb-4 overflow-hidden rounded-md">
                  <GalleryItem 
                    index={idx} 
                    className={`w-full ${aspectClass}`} 
                    onClick={() => openLightbox(idx)} 
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        <SectionDivider className="mt-16" />
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 p-2 text-background hover:text-secondary transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 p-2 text-background hover:text-secondary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            className="absolute right-4 p-2 text-background hover:text-secondary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-5xl max-h-[90vh] p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src={gallery[selectedImage].src} 
                alt={gallery[selectedImage].alt} 
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryItem({ index, className, onClick }: { index: number; className?: string; onClick: () => void }) {
  const { language } = useLanguage();
  const { gallery } = weddingConfig;
  const image = gallery[index % gallery.length];

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden group cursor-pointer bg-primary/5 rounded-md flex-shrink-0 shadow-sm ${className}`}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
      whileHover={{ 
        scale: 1.03, 
        rotateX: 2, 
        rotateY: -2, 
        boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
        zIndex: 10
      }}
    >
      <img 
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ objectPosition: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-primary-foreground text-xs md:text-sm font-semibold tracking-widest uppercase backdrop-blur-md bg-white/10 px-5 py-2.5 rounded-full border border-white/40 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {language === "tamil" ? "பார்க்க" : "View"}
        </span>
      </div>
    </motion.button>
  );
}
