"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { SectionDivider, KolamPattern } from "./decorative-elements";
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Helper to format dates for Calendar services (YYYYMMDDTHHmmSSZ)
const formatCalendarDate = (event: any, isEnd: boolean = false) => {
  const year = "2026";
  
  if (event.id === "wedding") {
    // Wedding ceremony - June 17 2026 time 9AM to 10AM
    const month = "06";
    const day = "17";
    const hour = isEnd ? "10" : "09";
    const minute = "00";
    return `${year}${month}${day}T${hour}${minute}00`;
  } else {
    // Reception - June 21 2026 - 6PM onwards (say to 10PM)
    const month = "06";
    const day = "21";
    const hour = isEnd ? "22" : "18";
    const minute = "00";
    return `${year}${month}${day}T${hour}${minute}00`;
  }
};

export function EventsSection() {
  const { language } = useLanguage();
  const { events } = weddingConfig;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleGoogleCalendar = (event: any) => {
    const start = formatCalendarDate(event);
    const end = formatCalendarDate(event, true);
    const details = language === "tamil" ? event.descriptionTamil : event.description;
    const location = language === "tamil" ? `${event.venueTamil}, ${event.addressTamil}` : `${event.venue}, ${event.address}`;

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      language === "tamil" ? event.titleTamil : event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}`;
    window.open(url, "_blank");
    setActiveMenu(null);
  };

  const handleICalDownload = (event: any) => {
    const start = formatCalendarDate(event);
    const end = formatCalendarDate(event, true);
    const title = language === "tamil" ? event.titleTamil : event.title;
    const location = language === "tamil" ? `${event.venueTamil}, ${event.addressTamil}` : `${event.venue}, ${event.address}`;
    const description = language === "tamil" ? event.descriptionTamil : event.description;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setActiveMenu(null);
  };

  return (
    <section id="events" className="py-24 px-4 relative overflow-hidden bg-background">
      {/* Background Decorative Layer */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-20 -left-20 scale-150 rotate-12">
          <KolamPattern size={600} color="var(--primary)" />
        </div>
        <div className="absolute -bottom-40 -right-40 scale-150 -rotate-12">
          <KolamPattern size={800} color="var(--primary)" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase mb-4 rounded-full border border-primary/10">
            {language === "tamil" ? "நாட்காட்டி" : "Mark Your Calendar"}
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-primary drop-shadow-sm mb-6">
            {language === "tamil" ? "திருமண நிகழ்வுகள்" : "The Celebration"}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full opacity-60" />
          <p className="text-foreground/80 font-medium max-w-2xl mx-auto text-lg leading-relaxed italic">
            {language === "tamil"
              ? "எங்கள் அன்புக்குரியவர்களுடன் எங்கள் புதிய பயணத்தைத் தொடங்கும் போது உங்கள் வருகை எங்களுக்கு மகிழ்ச்சி அளிக்கும்."
              : "Your presence will make our celebration even more special as we begin our new journey together."}
          </p>
        </motion.div>

        {/* Staggered Content Blocks */}
        <div className="space-y-32 md:space-y-0 max-w-6xl mx-auto">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={event.id}
                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-32 last:mb-0 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Visual Side */}
                <motion.div 
                  className="w-full md:w-1/2 relative group"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="aspect-[4/5] relative rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 ring-1 ring-primary/20">
                    <img 
                      src={event.id === "wedding" 
                        ? "/images/wedding-ceremony-south.jpg" 
                        : "/images/reception-anime.jpg"} 
                      alt={event.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent mix-blend-multiply opacity-40 group-hover:opacity-20 transition-opacity" />
                    
                    {/* Event Label Overlay */}
                    <div className="absolute bottom-8 left-8 right-8 text-white p-6 glass-panel rounded-3xl bg-black/40 border-white/20">
                       <h4 className="font-serif text-2xl mb-1">
                         {language === "tamil" ? event.titleTamil : event.title}
                       </h4>
                       <p className="text-sm opacity-90 font-medium tracking-wide">
                        {language === "tamil" ? "இடம்:" : "Venue:"} {language === "tamil" ? event.venueTamil : event.venue}
                       </p>
                    </div>
                  </div>
                  
                  {/* Floating Ornament */}
                  <div className={`absolute -top-6 ${isEven ? "-right-6" : "-left-6"} w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse`} />
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  className="w-full md:w-1/2 text-left space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="space-y-2">
                    <span className="text-secondary font-bold text-lg tracking-widest uppercase block mb-2">
                      {language === "tamil" 
                        ? (event.id === "reception" ? "வரவேற்பு" : "திருமணம்") 
                        : (event.id === "reception" ? "Reception" : "Muhurtam")}
                    </span>
                    <h3 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
                      {language === "tamil" ? event.titleTamil : event.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Date Block */}
                    <div className="flex items-center gap-6 group font-sans">
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-foreground/60 text-sm uppercase tracking-wider font-bold">
                          {language === "tamil" ? "தேதி" : "The Date"}
                        </p>
                        <p className="text-xl md:text-2xl text-foreground font-bold leading-none mt-1">
                          {language === "tamil" ? event.dateTamil : event.date}
                        </p>
                      </div>
                    </div>

                    {/* Time Block */}
                    <div className="flex items-center gap-6 group font-sans">
                      <div className="w-14 h-14 rounded-2xl bg-secondary/5 flex items-center justify-center shrink-0 border border-secondary/10 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-foreground/60 text-sm uppercase tracking-wider font-bold">
                          {language === "tamil" ? "நேரம்" : "The Time"}
                        </p>
                        <p className="text-xl md:text-2xl text-foreground font-bold leading-none mt-1">
                          {language === "tamil" ? event.timeTamil : event.time}
                        </p>
                      </div>
                    </div>

                    {/* Venue Block */}
                    <div className="flex items-start gap-6 group font-sans">
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300 mt-1">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-foreground/60 text-sm uppercase tracking-wider font-bold">
                          {language === "tamil" ? "இடம்" : "The Venue"}
                        </p>
                        <p className="text-xl md:text-2xl text-foreground font-bold leading-tight mt-1">
                          {language === "tamil" ? event.venueTamil : event.venue}
                        </p>
                        <p className="text-foreground/70 text-base leading-relaxed mt-2 max-w-sm">
                          {language === "tamil" ? event.addressTamil : event.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground/80 leading-relaxed text-lg italic border-l-4 border-secondary/30 pl-6 py-2">
                    {language === "tamil" ? event.descriptionTamil : event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4 relative">
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full text-sm font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <MapPin className="w-4 h-4" />
                      {language === "tamil" ? "வரைபடத்தில் காண்க" : "Directions"}
                    </a>
                    
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === event.id ? null : event.id)}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary border-2 border-primary/20 rounded-full text-sm font-bold hover:bg-primary/5 hover:border-primary transition-all duration-300"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        {language === "tamil" ? "நாட்காட்டியில் சேர்" : "Add to Calendar"}
                      </button>

                      <AnimatePresence>
                        {activeMenu === event.id && (
                          <motion.div 
                            className="absolute bottom-full left-0 mb-4 w-56 bg-white rounded-3xl shadow-2xl border border-primary/10 overflow-hidden z-50 p-2"
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            <button 
                              onClick={() => handleGoogleCalendar(event)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 text-primary text-sm font-bold rounded-2xl transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <ExternalLink className="w-4 h-4" />
                              </div>
                              Google Calendar
                            </button>
                            <button 
                              onClick={() => handleICalDownload(event)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 text-primary text-sm font-bold rounded-2xl transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <CalendarPlus className="w-4 h-4" />
                              </div>
                              Apple / Outlook (.ics)
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div 
          className="mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-4 text-primary opacity-40">
            <div className="h-px w-20 bg-primary" />
            <KolamPattern size={60} color="currentColor" />
            <div className="h-px w-20 bg-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
