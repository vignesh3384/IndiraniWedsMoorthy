"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { SectionDivider } from "./decorative-elements";
import { MapPin, Navigation } from "lucide-react";

export function VenueSection() {
  const { language } = useLanguage();
  const { venues } = weddingConfig;

  return (
    <section id="venue" className="py-20 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/images/venue-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/80" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
            {language === "tamil" ? "திருமண & வரவேற்பு இடங்கள்" : "Wedding & Reception Venues"}
          </h2>
          <p className="text-foreground font-medium drop-shadow-sm">
            {language === "tamil"
              ? "எங்களை எங்கே கண்டுபிடிப்பது"
              : "Where to find us"}
          </p>
        </div>

        <div className="space-y-16">
          {venues.map((venue) => (
            <div key={venue.id} className="space-y-4 bg-card/40 backdrop-blur-sm rounded-2xl border border-border p-6 md:p-8">
              <h3 className="font-serif text-2xl md:text-3xl text-secondary border-b border-border/60 pb-2 mb-6">
                {language === "tamil" 
                  ? (venue.id === "wedding" ? "திருமண மண்டபம்" : "வரவேற்பு மண்டபம்")
                  : (venue.id === "wedding" ? "Wedding Venue" : "Reception Venue")}
              </h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Map */}
                <div className="rounded-xl overflow-hidden border border-border h-[300px] md:h-[350px] bg-muted/20">
                  <iframe
                    src={venue.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${venue.name} Map`}
                  />
                </div>

                {/* Venue Details */}
                <div className="flex flex-col justify-between">
                  <div className="space-y-6">
                    <h4 className="font-serif text-2xl text-primary font-bold">
                      {language === "tamil" ? venue.nameTamil : venue.name}
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <p className="text-foreground text-base md:text-lg">
                          {language === "tamil" ? venue.addressTamil : venue.address}
                        </p>
                      </div>


                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <div className="mt-8">
                    <a
                      href={venue.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg hover:scale-[1.02] duration-200"
                    >
                      <Navigation className="w-4 h-4" />
                      {language === "tamil" ? "வழிகள் பெறுக" : "Get Directions"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionDivider className="mt-16" />
      </div>
    </section>
  );
}
