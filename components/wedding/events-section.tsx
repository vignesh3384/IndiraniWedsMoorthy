"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { SectionDivider } from "./decorative-elements";
import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.div 
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary drop-shadow-sm mb-4">
            {language === "tamil" ? "நிகழ்வுகள்" : "Wedding Events"}
          </h2>
          <p className="text-foreground font-medium max-w-xl mx-auto drop-shadow-sm">
            {language === "tamil"
              ? "எங்கள் சிறப்பு தினங்களில் எங்களுடன் இணையுங்கள்"
              : "Join us to celebrate our special days"}
          </p>
        </motion.div>

        {/* Events Timeline */}
        <div className="relative py-10 z-10">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 -translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-24">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary z-20 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 glass-panel p-8 rounded-3xl relative hover:shadow-xl transition-shadow duration-300">
                  {/* Event Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs font-medium rounded-full border border-secondary/30">
                      {index === 0 
                        ? (language === "tamil" ? "முதல் நிகழ்வு" : "First Event") 
                        : (language === "tamil" ? "முக்கிய நிகழ்வு" : "Main Event")}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="font-serif text-3xl text-primary mb-6">
                    {language === "tamil" ? event.titleTamil : event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="mt-1">
                        <p className="font-medium text-foreground text-lg">
                          {language === "tamil" ? event.dateTamil : event.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="mt-1">
                        <p className="font-medium text-foreground text-lg">
                          {language === "tamil" ? event.timeTamil : event.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="mt-1">
                        <p className="font-medium text-foreground text-lg">
                          {language === "tamil" ? event.venueTamil : event.venue}
                        </p>
                        <p className="text-sm text-foreground/80 font-medium mt-1">
                          {language === "tamil" ? event.addressTamil : event.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-6 text-foreground/90 text-sm leading-relaxed border-t border-primary/10 pt-6">
                    {language === "tamil" ? event.descriptionTamil : event.description}
                  </p>

                  {/* Map Link */}
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <MapPin className="w-4 h-4" />
                    {language === "tamil" ? "வரைபடத்தில் காண்க" : "View on Map"}
                  </a>
                </div>
                
                {/* Empty Space for alignment on Desktop */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        <SectionDivider className="mt-16" />
      </div>
    </section>
  );
}
