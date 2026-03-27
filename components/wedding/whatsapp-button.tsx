"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const { contacts } = weddingConfig;
  
  // Use the first contact's WhatsApp number
  const primaryContact = contacts[0];
  
  if (!primaryContact?.whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${primaryContact.whatsapp}?text=${encodeURIComponent(
        "Hello! I have a question about the wedding."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] transition-colors group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-foreground text-background text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Quick Contact
      </span>
    </a>
  );
}
