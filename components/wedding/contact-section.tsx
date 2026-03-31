"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { useLanguage } from "./language-provider";
import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
};

export function ContactSection() {
  const { language } = useLanguage();
  const { contacts, social } = weddingConfig;

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/80" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4 drop-shadow-sm">
            {language === "tamil" ? "தொடர்பு கொள்ளுங்கள்" : "Contact Us"}
          </h2>
          <p className="text-foreground font-medium drop-shadow-sm">
            {language === "tamil"
              ? "ஏதேனும் கேள்விகள் இருந்தால் எங்களைத் தொடர்பு கொள்ளுங்கள்"
              : "Reach out to us if you have any questions"}
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-panel rounded-3xl p-8 text-center flex flex-col items-center justify-center transition-all duration-300 min-w-[320px]"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center shadow-inner">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                {language === "tamil" ? contact.nameTamil : contact.name}
              </h3>
              <a
                href={`tel:${contact.phone}`}
                className="text-foreground/80 hover:text-primary transition-colors text-lg font-medium mb-2"
              >
                {contact.phone}
              </a>

              {/* WhatsApp Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-auto px-6 py-2.5 bg-[#25D366]/10 text-[#25D366] rounded-full text-sm font-medium hover:bg-[#25D366]/20 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* Hashtag */}
        {social.hashtag && (
          <div className="text-center mt-12">
            <p className="text-foreground/80 font-medium mb-2">
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
