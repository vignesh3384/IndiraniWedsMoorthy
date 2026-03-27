"use client";

interface KolamPatternProps {
  size?: number;
  className?: string;
}

export function KolamPattern({ size = 100, className = "" }: KolamPatternProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      
      {/* Radial lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="50"
          x2={50 + 45 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 45 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
      ))}
      
      {/* Decorative dots */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <circle
          key={`dot-${angle}`}
          cx={50 + 40 * Math.cos((angle * Math.PI) / 180)}
          cy={50 + 40 * Math.sin((angle * Math.PI) / 180)}
          r="2"
          fill="currentColor"
          className="text-secondary"
        />
      ))}
    </svg>
  );
}

export function BananaLeafDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <svg
        className="w-16 h-8 text-primary/40"
        viewBox="0 0 64 32"
        fill="currentColor"
      >
        <path d="M0 16C0 16 10 8 20 8C30 8 32 16 32 16C32 16 30 24 20 24C10 24 0 16 0 16Z" />
      </svg>
      <div className="w-2 h-2 rounded-full bg-secondary" />
      <svg
        className="w-16 h-8 text-primary/40 scale-x-[-1]"
        viewBox="0 0 64 32"
        fill="currentColor"
      >
        <path d="M0 16C0 16 10 8 20 8C30 8 32 16 32 16C32 16 30 24 20 24C10 24 0 16 0 16Z" />
      </svg>
    </div>
  );
}

export function JasmineString({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full bg-secondary/60"
          style={{
            transform: `translateY(${Math.sin(i * 0.5) * 3}px)`,
          }}
        />
      ))}
    </div>
  );
}

export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="w-24 h-px bg-border" />
      <div className="mx-4">
        <svg
          className="w-6 h-6 text-secondary"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="w-24 h-px bg-border" />
    </div>
  );
}
