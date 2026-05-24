"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { weddingConfig } from "@/lib/wedding-config";

interface LandingGateProps {
  onEnter: () => void;
}

// ─── Kolam corner SVG ───────────────────────────────────────────────────────
function KolamCorner({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="4" cy="4" r="2.5" fill="#c5a028" opacity="0.9" />
      <circle cx="4" cy="20" r="1.5" fill="#c5a028" opacity="0.6" />
      <circle cx="20" cy="4" r="1.5" fill="#c5a028" opacity="0.6" />
      <circle cx="4" cy="36" r="1" fill="#c5a028" opacity="0.4" />
      <circle cx="36" cy="4" r="1" fill="#c5a028" opacity="0.4" />
      <circle cx="12" cy="12" r="2" fill="#c5a028" opacity="0.7" />
      <circle cx="20" cy="20" r="1.5" fill="#c5a028" opacity="0.5" />
      <circle cx="12" cy="28" r="1" fill="#c5a028" opacity="0.4" />
      <circle cx="28" cy="12" r="1" fill="#c5a028" opacity="0.4" />
      <path d="M4 4 L4 48" stroke="#c5a028" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 4" />
      <path d="M4 4 L48 4" stroke="#c5a028" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 4" />
      <path d="M4 4 Q24 4 24 24 Q24 44 44 44" stroke="#c5a028" strokeWidth="0.8" opacity="0.4" fill="none" />
      <path d="M4 4 Q12 12 20 12 Q28 12 28 20" stroke="#c5a028" strokeWidth="0.5" opacity="0.5" fill="none" />
      {/* Lotus petal motif */}
      <path d="M4 4 Q8 0 12 4 Q8 8 4 4Z" fill="#c5a028" opacity="0.5" />
      <path d="M4 4 Q0 8 4 12 Q8 8 4 4Z" fill="#c5a028" opacity="0.5" />
    </svg>
  );
}

// ─── Temple Lamp (Vilakku) SVG ──────────────────────────────────────────────
function TempleLamp({ glowing }: { glowing: boolean }) {
  return (
    <svg width="56" height="72" viewBox="0 0 56 72" fill="none">
      {/* Flame */}
      <ellipse cx="28" cy="10" rx="5" ry="8" fill={glowing ? "#fbbf24" : "#d4af37"} opacity={glowing ? 0.95 : 0.6}>
        {glowing && (
          <animate attributeName="ry" values="8;10;7;9;8" dur="1.5s" repeatCount="indefinite" />
        )}
      </ellipse>
      <ellipse cx="28" cy="12" rx="3" ry="5" fill={glowing ? "#fef3c7" : "#f5e6a3"} opacity={glowing ? 0.9 : 0.5}>
        {glowing && (
          <animate attributeName="ry" values="5;7;4;6;5" dur="1.5s" repeatCount="indefinite" />
        )}
      </ellipse>
      {/* Lamp cup */}
      <path d="M18 22 Q28 18 38 22 L35 30 Q28 32 21 30 Z" fill="#c5a028" />
      <path d="M20 22 Q28 19 36 22" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.7" />
      {/* Lamp stem */}
      <rect x="25" y="30" width="6" height="16" rx="1" fill="#b8922a" />
      {/* Lamp base */}
      <ellipse cx="28" cy="48" rx="14" ry="4" fill="#c5a028" />
      <rect x="14" y="48" width="28" height="4" rx="1" fill="#b8922a" />
      <ellipse cx="28" cy="52" rx="16" ry="4" fill="#c5a028" opacity="0.8" />
      {/* Decorative rings */}
      <ellipse cx="28" cy="48" rx="14" ry="2" stroke="#d4af37" strokeWidth="0.5" fill="none" opacity="0.7" />
      {/* Glow halo */}
      {glowing && (
        <>
          <ellipse cx="28" cy="10" rx="12" ry="14" fill="#fbbf24" opacity="0.08">
            <animate attributeName="opacity" values="0.08;0.18;0.08" dur="2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="28" cy="10" rx="20" ry="22" fill="#f59e0b" opacity="0.04">
            <animate attributeName="opacity" values="0.04;0.1;0.04" dur="2.5s" repeatCount="indefinite" />
          </ellipse>
        </>
      )}
    </svg>
  );
}

// ─── Jasmine Petal ──────────────────────────────────────────────────────────
function JasminePetal({ style }: { style: React.CSSProperties }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: 6,
        height: 10,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        background: "rgba(253,251,247,0.85)",
        boxShadow: "0 0 4px rgba(253,251,247,0.4)",
        ...style,
      }}
    />
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export function LandingGate({ onEnter }: LandingGateProps) {
  const { couple, weddingDate } = weddingConfig;
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [heartBurst, setHeartBurst] = useState(false);
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const rippleCounter = useRef(0);
  const hasClickedRef = useRef(false);

  // Stable particles
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        w: Math.random() * 3 + 2,
        h: Math.random() * 3 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        dur: `${Math.random() * 10 + 8}s`,
        delay: `${Math.random() * 8}s`,
        type: Math.random() > 0.5 ? "gold" : "cream",
        rotate: Math.random() * 360,
      })),
    []
  );

  const jasminePositions = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${Math.random() * 30}%`,
        delay: `${Math.random() * 6}s`,
        dur: `${Math.random() * 6 + 8}s`,
        rotate: Math.random() * 360,
      })),
    []
  );

  useEffect(() => {
    setIsMounted(true);
    const t = setTimeout(() => setIsGlowing(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleHeartClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (hasClickedRef.current || isExiting) return;
      hasClickedRef.current = true;

      // Add ripple at click point
      const id = ++rippleCounter.current;
      const x = e.clientX;
      const y = e.clientY;
      setRipples((prev) => [...prev, { id, x, y }]);

      // Heart burst + press effect
      setIsHeartPressed(true);
      setHeartBurst(true);

      // Haptic feedback on mobile
      if (navigator.vibrate) navigator.vibrate([30, 15, 80, 15, 40]);

      setTimeout(() => setIsExiting(true), 400);
      setTimeout(() => onEnter(), 1600);
    },
    [isExiting, onEnter]
  );

  const formattedDate = weddingDate.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`landing-gate-wrapper ${isMounted ? "gate-mounted" : ""} ${isExiting ? "gate-exiting" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        userSelect: "none",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 40%, #2a0810 0%, #160306 40%, #0a0204 100%)",
      }}
    >
      {/* ── Warm vignette glow ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(154,27,50,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Traditional border pattern ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 12,
          border: "1px solid rgba(197,160,40,0.25)",
          borderRadius: 2,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 18,
          border: "1px solid rgba(197,160,40,0.12)",
          borderRadius: 2,
          pointerEvents: "none",
        }}
      />

      {/* ── Subtle grid texture ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(197,160,40,0.02) 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(197,160,40,0.02) 0px, transparent 1px, transparent 60px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Corner kolam patterns ── */}
      <div style={{ position: "absolute", top: 24, left: 24, opacity: isMounted ? 1 : 0, transition: "opacity 1s ease 0.5s" }}>
        <KolamCorner size={72} />
      </div>
      <div style={{ position: "absolute", top: 24, right: 24, opacity: isMounted ? 1 : 0, transition: "opacity 1s ease 0.6s", transform: "scaleX(-1)" }}>
        <KolamCorner size={72} />
      </div>
      <div style={{ position: "absolute", bottom: 24, left: 24, opacity: isMounted ? 1 : 0, transition: "opacity 1s ease 0.7s", transform: "scaleY(-1)" }}>
        <KolamCorner size={72} />
      </div>
      <div style={{ position: "absolute", bottom: 24, right: 24, opacity: isMounted ? 1 : 0, transition: "opacity 1s ease 0.8s", transform: "scale(-1,-1)" }}>
        <KolamCorner size={72} />
      </div>

      {/* ── Floating jasmine petals ── */}
      {isMounted && jasminePositions.map((j) => (
        <JasminePetal
          key={j.id}
          style={{
            left: j.left,
            top: j.top,
            transform: `rotate(${j.rotate}deg)`,
            animation: `jasmineDrift ${j.dur} ease-in-out ${j.delay} infinite`,
          }}
        />
      ))}

      {/* ── Floating gold + cream particles ── */}
      {isMounted && particles.map((p) => (
        <div
          key={p.id}
          aria-hidden
          style={{
            position: "absolute",
            width: p.w,
            height: p.h,
            borderRadius: "50%",
            background: p.type === "gold"
              ? `rgba(197,160,40,${0.15 + Math.random() * 0.3})`
              : `rgba(253,251,247,${0.08 + Math.random() * 0.2})`,
            left: p.left,
            top: p.top,
            animation: `goldFloat ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* ── Click ripples ── */}
      {ripples.map((r) => (
        <div
          key={r.id}
          aria-hidden
          style={{
            position: "fixed",
            left: r.x,
            top: r.y,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "rgba(197,160,40,0.5)",
            transform: "translate(-50%, -50%) scale(0)",
            animation: "goldRipple 1.4s ease-out forwards",
            pointerEvents: "none",
            zIndex: 10000,
          }}
        />
      ))}

      {/* ── CENTER CONTENT ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          animation: "contentReveal 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s both",
          opacity: 0,
        }}
      >
        {/* Auspicious symbol */}
        <div style={{ marginBottom: 8, opacity: 0.85 }}>
          <span
            style={{
              fontFamily: "var(--font-tamil-thin), serif",
              fontSize: "clamp(18px, 3vw, 28px)",
              color: "#c5a028",
              letterSpacing: "0.1em",
              textShadow: "0 0 20px rgba(197,160,40,0.5)",
            }}
          >
            ஓம்
          </span>
        </div>

        {/* Top decorative line */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: "clamp(40px, 8vw, 80px)", height: 1, background: "linear-gradient(90deg, transparent, #c5a028 60%)" }} />
          <span style={{ color: "#c5a028", fontSize: 14, opacity: 0.8 }}>✦</span>
          <div style={{ width: "clamp(40px, 8vw, 80px)", height: 1, background: "linear-gradient(90deg, #c5a028 60%, transparent)" }} />
        </div>

        {/* Tamil invitation label */}
        <p
          style={{
            fontFamily: "var(--font-tamil-thin), serif",
            fontSize: "clamp(11px, 1.6vw, 14px)",
            letterSpacing: "0.25em",
            color: "rgba(197,160,40,0.7)",
            margin: "0 0 16px",
            textTransform: "uppercase",
          }}
        >
          Wedding Invitation
        </p>

        {/* Temple lamp */}
        <div
          style={{
            marginBottom: 20,
            filter: isGlowing ? "drop-shadow(0 0 16px rgba(251,191,36,0.6))" : "none",
            transition: "filter 0.8s ease",
          }}
        >
          <TempleLamp glowing={isGlowing} />
        </div>

        {/* Groom name */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 6,
            animation: "nameSlideUp 1.2s ease 0.6s both",
            opacity: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-tamil-thin), serif",
              fontSize: "clamp(26px, 5.5vw, 52px)",
              fontWeight: 300,
              color: "#fdfbf7",
              letterSpacing: "0.06em",
              textShadow: "0 0 30px rgba(154,27,50,0.6), 0 2px 12px rgba(0,0,0,0.5)",
              display: "block",
            }}
          >
            {couple.groom.name}
          </span>
        </div>

        {/* Ampersand */}
        <div style={{ margin: "4px 0", animation: "nameSlideUp 1.2s ease 0.75s both", opacity: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-script), cursive",
              fontSize: "clamp(20px, 4vw, 36px)",
              color: "#c5a028",
              textShadow: "0 0 20px rgba(197,160,40,0.5)",
            }}
          >
            &amp;
          </span>
        </div>

        {/* Bride name */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
            animation: "nameSlideUp 1.2s ease 0.9s both",
            opacity: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-tamil-thin), serif",
              fontSize: "clamp(26px, 5.5vw, 52px)",
              fontWeight: 300,
              color: "#fdfbf7",
              letterSpacing: "0.06em",
              textShadow: "0 0 30px rgba(154,27,50,0.6), 0 2px 12px rgba(0,0,0,0.5)",
              display: "block",
            }}
          >
            {couple.bride.name}
          </span>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: "clamp(30px, 6vw, 60px)", height: 1, background: "linear-gradient(90deg, transparent, rgba(197,160,40,0.5) 70%)" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c5a028", opacity: 0.8 }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c5a028", opacity: 0.5 }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c5a028", opacity: 0.8 }} />
          <div style={{ width: "clamp(30px, 6vw, 60px)", height: 1, background: "linear-gradient(90deg, rgba(197,160,40,0.5) 70%, transparent)" }} />
        </div>

        {/* Wedding date */}
        <p
          style={{
            fontFamily: "var(--font-tamil-thin), serif",
            fontSize: "clamp(12px, 1.8vw, 16px)",
            color: "rgba(253,251,247,0.65)",
            margin: "0 0 28px",
            letterSpacing: "0.12em",
          }}
        >
          {formattedDate}
        </p>

        {/* ── Heart Button ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <button
            id="heart-enter-btn"
            onClick={handleHeartClick}
            aria-label="Open wedding invitation"
            style={{
              position: "relative",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              outline: "none",
              transform: isHeartPressed ? "scale(1.35)" : "scale(1)",
              transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              filter: isHeartPressed
                ? "drop-shadow(0 0 32px rgba(220,38,88,0.95)) drop-shadow(0 0 60px rgba(197,160,40,0.6))"
                : "drop-shadow(0 0 14px rgba(220,38,88,0.55)) drop-shadow(0 0 28px rgba(154,27,50,0.4))",
              animation: isHeartPressed ? "none" : "heartPulse 2s ease-in-out 2s infinite",
            }}
          >
            {/* Heart SVG */}
            <svg
              width="clamp(60px,10vw,88px)"
              height="clamp(60px,10vw,88px)"
              viewBox="0 0 100 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Gradient definitions */}
              <defs>
                <radialGradient id="heartGrad" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ff6b8a" />
                  <stop offset="50%" stopColor="#dc2658" />
                  <stop offset="100%" stopColor="#8b0b2e" />
                </radialGradient>
                <radialGradient id="heartSheen" cx="35%" cy="25%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,220,230,0.55)" />
                  <stop offset="100%" stopColor="rgba(255,220,230,0)" />
                </radialGradient>
              </defs>
              {/* Main heart */}
              <path
                d="M50 82 C50 82 8 54 8 28 C8 14 18 6 30 6 C38 6 45 10 50 16 C55 10 62 6 70 6 C82 6 92 14 92 28 C92 54 50 82 50 82Z"
                fill="url(#heartGrad)"
              />
              {/* Sheen highlight */}
              <path
                d="M50 82 C50 82 8 54 8 28 C8 14 18 6 30 6 C38 6 45 10 50 16 C55 10 62 6 70 6 C82 6 92 14 92 28 C92 54 50 82 50 82Z"
                fill="url(#heartSheen)"
              />
              {/* Gold border shimmer */}
              <path
                d="M50 82 C50 82 8 54 8 28 C8 14 18 6 30 6 C38 6 45 10 50 16 C55 10 62 6 70 6 C82 6 92 14 92 28 C92 54 50 82 50 82Z"
                stroke="#c5a028"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              {/* Small decorative inner OM symbol */}
              <text
                x="50"
                y="46"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="18"
                fill="rgba(253,251,247,0.85)"
                style={{ letterSpacing: 0 }}
              >
                ♥
              </text>
            </svg>

            {/* Orbiting gold dots */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: -12,
                borderRadius: "50%",
                animation: "heartOrbit 4s linear infinite",
                pointerEvents: "none",
              }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  style={{
                    position: "absolute",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#c5a028",
                    opacity: 0.7,
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateX(${"clamp(38px,6vw,52px)"}) translate(-50%,-50%)`,
                  }}
                />
              ))}
            </div>
          </button>

          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, animation: "tapPulse 2.5s ease-in-out 2s infinite" }}>
            <span style={{ fontSize: 10, color: "rgba(197,160,40,0.5)" }}>—</span>
            <span
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "clamp(10px, 1.5vw, 13px)",
                color: "rgba(197,160,40,0.75)",
                letterSpacing: "0.2em",
              }}
            >
              Tap to open
            </span>
            <span style={{ fontSize: 10, color: "rgba(197,160,40,0.5)" }}>—</span>
          </div>
        </div>

        {/* ── Heart Burst Particles ── */}
        {heartBurst && (
          <div
            aria-hidden
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 10001,
            }}
          >
            {Array.from({ length: 24 }, (_, i) => {
              const angle = (i / 24) * 360;
              const dist = 80 + Math.random() * 120;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: i % 3 === 0 ? 10 : 6,
                    height: i % 3 === 0 ? 10 : 6,
                    borderRadius: "50%",
                    background: i % 2 === 0 ? "#dc2658" : "#c5a028",
                    transform: "translate(-50%,-50%) scale(0)",
                    animation: `heartBurstParticle 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.015}s forwards`,
                    // CSS custom props via inline style are not supported directly, use vars
                    // We'll encode angle and dist in the animation name workaround:
                    // Actually set via translateX/Y in keyframe — use multiple keyframe sets below
                  }}
                  // Encode direction via a wrapper transform set
                  className={`hb-particle hb-${i}`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ── Bottom mango leaf decoration ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          opacity: 0.35,
        }}
      >
        {["#9ba352", "#c5a028", "#9ba352"].map((c, i) => (
          <div
            key={i}
            style={{
              width: 18,
              height: 30,
              borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
              background: c,
              transform: `rotate(${(i - 1) * 20}deg)`,
            }}
          />
        ))}
      </div>

      {/* ── Rose petal / flash exit overlay ── */}
      {isExiting && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, #fce4ec 0%, #dc2658 40%, #8b0b2e 70%, #160306 100%)",
            animation: "exitRoseBloom 1.4s cubic-bezier(0.22,1,0.36,1) forwards",
            pointerEvents: "none",
            zIndex: 10000,
          }}
        />
      )}

      {/* ── ALL KEYFRAMES ── */}
      <style>{`
        .landing-gate-wrapper {
          opacity: 0;
          animation: gateReveal 1.2s ease-out 0.1s forwards;
        }
        .landing-gate-wrapper.gate-exiting {
          animation: gateExitFade 1.4s ease-in forwards !important;
        }

        @keyframes gateReveal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes gateExitFade {
          0%   { opacity: 1; transform: scale(1); }
          60%  { opacity: 0.6; transform: scale(1.04); }
          100% { opacity: 0; transform: scale(1.08); }
        }
        @keyframes contentReveal {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nameSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tapPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.97); }
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1);    filter: drop-shadow(0 0 14px rgba(220,38,88,0.55)) drop-shadow(0 0 28px rgba(154,27,50,0.4)); }
          50%       { transform: scale(1.09); filter: drop-shadow(0 0 24px rgba(220,38,88,0.85)) drop-shadow(0 0 48px rgba(197,160,40,0.5)); }
        }
        @keyframes heartOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes goldFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          33%       { transform: translateY(-18px) translateX(6px); opacity: 0.8; }
          66%       { transform: translateY(8px) translateX(-6px); opacity: 0.2; }
        }
        @keyframes jasmineDrift {
          0%   { transform: translateY(-10px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 0.85; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes goldRipple {
          from { transform: translate(-50%, -50%) scale(0);   opacity: 0.7; }
          to   { transform: translate(-50%, -50%) scale(60);  opacity: 0; }
        }
        @keyframes exitRoseBloom {
          0%   { opacity: 0;    transform: scale(0.6); border-radius: 50%; }
          40%  { opacity: 1;    transform: scale(1.1); border-radius: 0; }
          100% { opacity: 0;    transform: scale(1.2); }
        }

        /* Heart burst — 24 directional particles */
        ${Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * 360;
        const rad = angle * (Math.PI / 180);
        const dist = 90 + (i % 4) * 30;
        const tx = Math.cos(rad) * dist;
        const ty = Math.sin(rad) * dist;
        return `
          @keyframes heartBurstParticle_${i} {
            0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
            60%  { opacity: 1; }
            100% { transform: translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5); opacity: 0; }
          }
          .hb-${i} { animation-name: heartBurstParticle_${i} !important; }
          `;
      }).join('')}

        @media (max-width: 480px) {
          .landing-gate-wrapper { cursor: default; }
        }
      `}</style>
    </div>
  );
}
