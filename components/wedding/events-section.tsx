"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { SectionDivider } from "./decorative-elements";
import { Calendar, Clock, MapPin } from "lucide-react";

export function EventsSection() {
  const { language } = useLanguage();
  const { events } = weddingConfig;

  return (
    <section id="events" className="py-20 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/images/events-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/60" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-primary drop-shadow-sm mb-4">
            {language === "tamil" ? "நிகழ்வுகள்" : "Wedding Events"}
          </h2>
          <p className="text-foreground/80 max-w-xl mx-auto">
            {language === "tamil"
              ? "எங்கள் சிறப்பு தினங்களில் எங்களுடன் இணையுங்கள்"
              : "Join us to celebrate our special days"}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`relative overflow-hidden rounded-xl border border-border bg-card p-8 ${
                index === 0 ? "md:col-span-1" : "md:col-span-1"
              }`}
            >
              {/* Event Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs font-medium rounded-full">
                  {index === 0 
                    ? (language === "tamil" ? "முதல் நிகழ்வு" : "First Event") 
                    : (language === "tamil" ? "முக்கிய நிகழ்வு" : "Main Event")}
                </span>
              </div>

              {/* Event Title */}
              <h3 className="font-serif text-2xl text-primary mb-6">
                {language === "tamil" ? event.titleTamil : event.title}
              </h3>

              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">
                      {language === "tamil" ? event.dateTamil : event.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">
                      {language === "tamil" ? event.timeTamil : event.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">
                      {language === "tamil" ? event.venueTamil : event.venue}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === "tamil" ? event.addressTamil : event.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-6 text-muted-foreground text-sm leading-relaxed border-t border-border pt-6">
                {language === "tamil" ? event.descriptionTamil : event.description}
              </p>

              {/* Map Link */}
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
              >
                <MapPin className="w-4 h-4" />
                {language === "tamil" ? "வரைபடத்தில் காண்க" : "View on Map"}
              </a>
            </div>
          ))}
        </div>

        <SectionDivider className="mt-16" />
      </div>
    </section>
  );
}
