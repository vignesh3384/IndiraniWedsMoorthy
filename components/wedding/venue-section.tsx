"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { SectionDivider } from "./decorative-elements";
import { MapPin, Phone, Navigation } from "lucide-react";

export function VenueSection() {
  const { language } = useLanguage();
  const { venue } = weddingConfig;

  return (
    <section id="venue" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
            {language === "tamil" ? "திருமண இடம்" : "Wedding Venue"}
          </h2>
          <p className="text-muted-foreground">
            {language === "tamil"
              ? "எங்களை எங்கே கண்டுபிடிப்பது"
              : "Where to find us"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-border h-[400px]">
            <iframe
              src={venue.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Map"
            />
          </div>

          {/* Venue Details */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-serif text-2xl text-primary mb-4">
                {language === "tamil" ? venue.nameTamil : venue.name}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">
                    {language === "tamil" ? venue.addressTamil : venue.address}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <a
                    href={`tel:${venue.phone}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {venue.phone}
                  </a>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                {language === "tamil" ? "வழிகள் பெறுக" : "Get Directions"}
              </a>
            </div>

            {/* Directions List */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h4 className="font-serif text-lg text-primary mb-4">
                {language === "tamil" ? "எப்படி அடைவது" : "How to Reach"}
              </h4>
              <ul className="space-y-3">
                {(language === "tamil" ? venue.directionsTamil : venue.directions).map(
                  (direction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-muted-foreground text-sm">{direction}</p>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        <SectionDivider className="mt-16" />
      </div>
    </section>
  );
}
