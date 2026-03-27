"use client";

import { useState } from "react";
import { useLanguage } from "./language-provider";
import { SectionDivider } from "./decorative-elements";
import { Check, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface FormData {
  name: string;
  phone: string;
  guests: string;
  attending: "yes" | "no" | "";
  message: string;
}

export function RSVPSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    guests: "1",
    attending: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      
      const { error: insertError } = await supabase.from("rsvps").insert({
        name: formData.name,
        phone: formData.phone,
        guests: parseInt(formData.guests),
        attending: formData.attending === "yes",
        message: formData.message || null,
      });

      if (insertError) {
        throw insertError;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("RSVP submission error:", err);
      setError(language === "english" 
        ? "Failed to submit RSVP. Please try again." 
        : "பதில் சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const labels = {
    english: {
      title: "RSVP",
      subtitle: "Please let us know if you can make it",
      name: "Your Name",
      namePlaceholder: "Enter your full name",
      phone: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      guests: "Number of Guests",
      attending: "Will you be attending?",
      yes: "Yes, I will be there",
      no: "No, I cannot make it",
      message: "Message (Optional)",
      messagePlaceholder: "Any dietary requirements or special wishes...",
      submit: "Send RSVP",
      submitting: "Sending...",
      thankYou: "Thank You!",
      confirmationYes: "We are excited to celebrate with you!",
      confirmationNo: "We will miss you! Thank you for letting us know.",
    },
    tamil: {
      title: "பதில் அளிக்கவும்",
      subtitle: "நீங்கள் வர முடியுமா என்று எங்களுக்குத் தெரியப்படுத்துங்கள்",
      name: "உங்கள் பெயர்",
      namePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
      phone: "தொலைபேசி எண்",
      phonePlaceholder: "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்",
      guests: "விருந்தினர்களின் எண்ணிக்கை",
      attending: "நீங்கள் கலந்து கொள்வீர்களா?",
      yes: "ஆம், நான் வருவேன்",
      no: "இல்லை, என்னால் வர இயலாது",
      message: "செய்தி (விருப்பமானது)",
      messagePlaceholder: "உணவு தேவைகள் அல்லது சிறப்பு வாழ்த்துக்கள்...",
      submit: "பதில் அனுப்புக",
      submitting: "அனுப்புகிறது...",
      thankYou: "நன்றி!",
      confirmationYes: "உங்களுடன் கொண்டாட நாங்கள் உற்சாகமாக இருக்கிறோம்!",
      confirmationNo: "நாங்கள் உங்களை மிஸ் செய்வோம்! எங்களுக்குத் தெரியப்படுத்தியதற்கு நன்றி.",
    },
  };

  const t = labels[language];

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 px-4 bg-card">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center">
            <Check className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="font-serif text-4xl text-primary mb-4">{t.thankYou}</h2>
          <p className="text-muted-foreground">
            {formData.attending === "yes" ? t.confirmationYes : t.confirmationNo}
          </p>
          <SectionDivider className="mt-16" />
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 px-4 bg-card">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* RSVP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              {t.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              {t.phone}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.phonePlaceholder}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* Number of Guests */}
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-2">
              {t.guests}
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Attending */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              {t.attending}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.attending === "yes"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.attending === "yes"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <Check className="w-4 h-4" />
                <span className="text-sm">{t.yes}</span>
              </label>
              <label
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.attending === "no"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === "no"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-sm">{t.no}</span>
              </label>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              {t.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={t.messagePlaceholder}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.attending}
            className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.submitting}
              </>
            ) : (
              t.submit
            )}
          </button>
        </form>

        <SectionDivider className="mt-16" />
      </div>
    </section>
  );
}
