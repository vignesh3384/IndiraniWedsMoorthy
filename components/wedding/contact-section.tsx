"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { Phone, MessageCircle } from "lucide-react";

export function ContactSection() {
  const { language } = useLanguage();
  const { contacts, social } = weddingConfig;

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
            {language === "tamil" ? "தொடர்பு கொள்ளுங்கள்" : "Contact Us"}
          </h2>
          <p className="text-muted-foreground">
            {language === "tamil"
              ? "ஏதேனும் கேள்விகள் இருந்தால் எங்களைத் தொடர்பு கொள்ளுங்கள்"
              : "Reach out to us if you have any questions"}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">
                {language === "tamil" ? contact.nameTamil : contact.name}
              </h3>
              <a
                href={`tel:${contact.phone}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {contact.phone}
              </a>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#25D366]/10 text-[#25D366] rounded-lg text-sm hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          ))}
        </div>

        {/* Hashtag */}
        {social.hashtag && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-2">
              {language === "tamil"
                ? "உங்கள் புகைப்படங்களை பகிரவும்"
                : "Share your photos with us"}
            </p>
            <p className="font-serif text-2xl text-primary">{social.hashtag}</p>
          </div>
        )}
      </div>
    </section>
  );
}
