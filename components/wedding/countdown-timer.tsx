"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./language-provider";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const labels = {
  english: {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  tamil: {
    days: "நாட்கள்",
    hours: "மணி",
    minutes: "நிமிடங்கள்",
    seconds: "வினாடிகள்",
  },
};

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex justify-center gap-4 md:gap-8">
        {[0, 0, 0, 0].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 md:w-20 h-16 md:h-20 flex items-center justify-center bg-primary/5 border border-primary/10 rounded-lg">
              <span className="font-serif text-2xl md:text-3xl text-primary">--</span>
            </div>
            <span className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
              --
            </span>
          </div>
        ))}
      </div>
    );
  }

  const currentLabels = labels[language];

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      <TimeUnit value={timeLeft.days} label={currentLabels.days} />
      <TimeUnit value={timeLeft.hours} label={currentLabels.hours} />
      <TimeUnit value={timeLeft.minutes} label={currentLabels.minutes} />
      <TimeUnit value={timeLeft.seconds} label={currentLabels.seconds} />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 md:w-20 h-16 md:h-20 flex items-center justify-center bg-primary/5 border border-primary/10 rounded-lg">
        <span className="font-serif text-2xl md:text-3xl text-primary">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
