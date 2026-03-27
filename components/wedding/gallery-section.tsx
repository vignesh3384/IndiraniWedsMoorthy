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

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              {/* Placeholder with decorative pattern */}
              <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-secondary/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {language === "tamil" ? `படம் ${index + 1}` : `Photo ${index + 1}`}
                  </p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">
                  {language === "tamil" ? "பார்க்க" : "View"}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Add Photos Note */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          {language === "tamil"
            ? "உங்கள் படங்களை /public/gallery/ கோப்புறையில் சேர்க்கவும்"
            : "Add your photos to the /public/gallery/ folder"}
        </p>

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
            className="max-w-4xl max-h-[80vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary/10 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-background text-center">
                {language === "tamil"
                  ? `படம் ${selectedImage + 1}`
                  : `Photo ${selectedImage + 1}`}
                <br />
                <span className="text-sm opacity-75">
                  {language === "tamil"
                    ? "உங்கள் படத்தை இங்கே சேர்க்கவும்"
                    : "Your photo will appear here"}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
