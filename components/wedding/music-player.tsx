"use client";

import { useState, useRef, useEffect } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import { Volume2, VolumeX, Music } from "lucide-react";

export function MusicPlayer() {
  const { music } = weddingConfig;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.13; // Reduced by 35% from previous 0.2
    }
    // Hide prompt after user interacts
    const hidePrompt = () => {
      setTimeout(() => setShowPrompt(false), 5000);
    };
    hidePrompt();
  }, []);

  if (!music.enabled) return null;

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          console.log("Audio playback requires user interaction");
        });
      }
      setIsPlaying(!isPlaying);
      setShowPrompt(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={music.src} loop preload="auto" />
      
      {/* Music Toggle Button */}
      <div className="fixed bottom-6 left-6 z-40">
        {/* Prompt Tooltip */}
        {showPrompt && (
          <div className="absolute bottom-full left-0 mb-2 whitespace-nowrap">
            <div className="bg-foreground text-background text-xs px-3 py-2 rounded-lg shadow-lg animate-pulse">
              <Music className="w-3 h-3 inline-block mr-1" />
              Play Carnatic music?
            </div>
          </div>
        )}
        
        <button
          onClick={toggleMusic}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
            isPlaying
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
          aria-label={isPlaying ? "Mute music" : "Play music"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
        
        {/* Playing Indicator */}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 w-3 h-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
          </div>
        )}
      </div>
    </>
  );
}
