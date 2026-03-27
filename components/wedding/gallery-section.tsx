"use client";

import { useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { SectionDivider } from "./decorative-elements";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
    <section id="gallery" className="py-20 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
            {language === "tamil" ? "புகைப்படத் தொகுப்பு" : "Photo Gallery"}
          </h2>
          <p className="text-muted-foreground">
            {language === "tamil"
              ? "எங்கள் அழகான தருணங்கள்"
              : "Our beautiful moments together"}
          </p>
        </div>

        {/* Complex Gallery Layout */}
        <div className="relative bg-secondary p-2 md:p-4 rounded-xl overflow-hidden mt-8">
          {/* Left Gradient Overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-secondary via-secondary/80 to-transparent z-10 pointer-events-none" />
          
          {/* Right Gradient Overlay */}
          <div className="absolute top-0 right-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-secondary via-secondary/80 to-transparent z-10 pointer-events-none" />



          {/* Masonry Columns */}
          <div className="flex gap-2 md:gap-4 h-[500px] md:h-[700px]">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-2 md:gap-4 flex-1">
              <GalleryItem index={0} className="h-[30%]" onClick={() => openLightbox(0)} />
              <GalleryItem index={1} className="flex-1" onClick={() => openLightbox(1)} />
              <GalleryItem index={2} className="h-[30%]" onClick={() => openLightbox(2)} />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2 md:gap-4 flex-1 -mt-4 mb-4">
              <GalleryItem index={3} className="flex-1" onClick={() => openLightbox(3)} />
              <GalleryItem index={4} className="h-[25%]" onClick={() => openLightbox(4)} />
              <GalleryItem index={5} className="flex-1" onClick={() => openLightbox(5)} />
            </div>

            {/* Column 3 (Center) */}
            <div className="flex flex-col gap-2 md:gap-4 flex-1 pt-8 pb-8">
              <GalleryItem index={0} className="flex-1" onClick={() => openLightbox(0)} />
              <GalleryItem index={1} className="flex-1" onClick={() => openLightbox(1)} />
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-2 md:gap-4 flex-1 mt-4 -mb-4">
              <GalleryItem index={2} className="h-[25%]" onClick={() => openLightbox(2)} />
              <GalleryItem index={3} className="flex-1" onClick={() => openLightbox(3)} />
              <GalleryItem index={4} className="h-[35%]" onClick={() => openLightbox(4)} />
            </div>

            {/* Column 5 */}
            <div className="flex flex-col gap-2 md:gap-4 flex-1">
              <GalleryItem index={5} className="h-[35%]" onClick={() => openLightbox(5)} />
              <GalleryItem index={0} className="flex-1" onClick={() => openLightbox(0)} />
              <GalleryItem index={1} className="h-[25%]" onClick={() => openLightbox(1)} />
            </div>
          </div>
        </div>

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
    <button
      onClick={onClick}
      className={`relative overflow-hidden group cursor-pointer bg-primary/5 rounded-sm md:rounded-md flex-shrink-0 ${className}`}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url('${image.src}')` }}
      />
      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-primary-foreground text-xs md:text-sm font-medium">
          {language === "tamil" ? "பார்க்க" : "View"}
        </span>
      </div>
    </button>
  );
}
