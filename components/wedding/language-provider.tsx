"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "english" | "tamil";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("english");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "english" ? "tamil" : "english"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm text-sm font-medium text-foreground hover:bg-primary/5 transition-colors"
    >
      <span className={language === "english" ? "text-primary" : "text-muted-foreground"}>
        EN
      </span>
      <span className="text-border">|</span>
      <span className={language === "tamil" ? "text-primary" : "text-muted-foreground"}>
        தமிழ்
      </span>
    </button>
  );
}
