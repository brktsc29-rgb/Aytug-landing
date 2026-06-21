"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface SparkleData {
  id: number;
  x: number;
  y: number;
  fontSize: number;
  delay: number;
  repeatDelay: number;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Twinkling star field */
function StarField() {
  const stars = useMemo<StarData[]>(
    () =>
      Array.from({ length: 160 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.4,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.65 + 0.25,
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          }}
          animate={{ opacity: [s.opacity, s.opacity * 0.15, s.opacity], scale: [1, 1.6, 1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Floating coloured particles */
function FloatingParticles({ active }: { active: boolean }) {
  const COLORS = ["#fbbf24", "#f97316", "#a78bfa", "#60a5fa", "#34d399", "#f472b6", "#e879f9"];

  const particles = useMemo<ParticleData[]>(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 3,
        duration: Math.random() * 9 + 7,
        delay: Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            filter: `blur(0.5px) drop-shadow(0 0 4px ${p.color})`,
          }}
          animate={{
            y: [0, -28, 8, -14, 0],
            x: [0, 8, -6, 10, 0],
            opacity: active
              ? [0.75, 0.35, 0.75, 0.55, 0.75]
              : [0.25, 0.08, 0.25],
            scale: [1, 1.25, 0.75, 1.1, 1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Sparkle burst played before video starts */
function SparkleEffect({ visible }: { visible: boolean }) {
  const sparkles = useMemo<SparkleData[]>(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        fontSize: Math.random() * 18 + 8,
        delay: Math.random() * 1.8,
        repeatDelay: Math.random() * 2.5 + 0.5,
      })),
    []
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sparkles.map((sp) => (
            <motion.span
              key={sp.id}
              className="absolute select-none text-amber-300"
              style={{
                left: `${sp.x}%`,
                top: `${sp.y}%`,
                fontSize: sp.fontSize,
                lineHeight: 1,
              }}
              animate={{ scale: [0, 1.6, 0], opacity: [0, 1, 0], rotate: [0, 180, 360] }}
              transition={{
                duration: 1.6,
                delay: sp.delay,
                repeat: Infinity,
                repeatDelay: sp.repeatDelay,
                ease: "easeInOut",
              }}
            >
              ✦
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Decorative planets with scroll-parallax */
function PlanetDecorations({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Large purple planet – top right */}
      <motion.div
        className="absolute -top-24 -right-16 w-72 h-72 md:w-96 md:h-96 rounded-full animate-planet"
        style={{
          background:
            "radial-gradient(circle at 32% 32%, #a78bfa 0%, #7c3aed 40%, #4c1d95 70%, #1e0a4f 100%)",
          boxShadow:
            "0 0 80px rgba(124,58,237,0.5), 0 0 160px rgba(124,58,237,0.2), inset 0 0 60px rgba(0,0,0,0.6)",
          y: y1,
          animationDelay: "0s",
        }}
      >
        {/* Ring */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: "3px solid rgba(167,139,250,0.35)",
            transform: "scale(1.75) rotateX(72deg)",
            animation: "none",
          }}
        />
        {/* Crater */}
        <span
          className="absolute w-10 h-10 rounded-full"
          style={{
            top: "38%",
            left: "55%",
            background:
              "radial-gradient(circle, rgba(76,29,149,0.9) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Gold planet – left edge */}
      <motion.div
        className="absolute top-[28%] -left-12 w-36 h-36 md:w-44 md:h-44 rounded-full animate-planet"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #fef08a 0%, #fbbf24 35%, #d97706 65%, #78350f 100%)",
          boxShadow:
            "0 0 50px rgba(251,191,36,0.45), 0 0 100px rgba(251,191,36,0.18)",
          y: y2,
          animationDelay: "2s",
        }}
      />

      {/* Teal mini planet – upper center-left */}
      <motion.div
        className="absolute top-16 left-[22%] md:left-[28%] w-14 h-14 md:w-20 md:h-20 rounded-full animate-planet"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #6ee7b7 0%, #10b981 45%, #065f46 100%)",
          boxShadow:
            "0 0 30px rgba(16,185,129,0.55), 0 0 60px rgba(16,185,129,0.2)",
          y: y3,
          animationDelay: "1.2s",
        }}
      />

      {/* Rose/pink micro planet – right side */}
      <motion.div
        className="absolute top-[55%] right-[8%] md:right-[12%] w-10 h-10 md:w-16 md:h-16 rounded-full animate-planet"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #fda4af 0%, #f43f5e 50%, #9f1239 100%)",
          boxShadow:
            "0 0 20px rgba(244,63,94,0.5), 0 0 50px rgba(244,63,94,0.2)",
          animationDelay: "3.5s",
        }}
      />
    </div>
  );
}

/** Ambient glow orbs – purely atmospheric */
function AmbientOrbs() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <span
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full animate-orb"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
        }}
      />
      <span
        className="absolute bottom-0 left-[20%] w-[400px] h-[300px] rounded-full animate-orb"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.14) 0%, transparent 70%)",
          animationDelay: "3s",
        }}
      />
      <span
        className="absolute top-10 right-[10%] w-[300px] h-[300px] rounded-full animate-orb"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)",
          animationDelay: "1.5s",
        }}
      />
    </div>
  );
}

/** Glassmorphism navigation bar */
function NavBar() {
  return (
    <nav
      className="relative z-30 flex items-center justify-between px-5 py-3 md:px-10 md:py-5"
      role="navigation"
      aria-label="Ana navigasyon"
    >
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <a
          href="/"
          className="flex items-center gap-2 text-white no-underline"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <span
            className="text-2xl md:text-3xl font-black tracking-widest"
            style={{
              textShadow:
                "0 0 20px rgba(251,191,36,0.9), 0 0 40px rgba(251,191,36,0.5)",
            }}
          >
            ✦ AYTUĞ
          </span>
        </a>
      </motion.div>

      <motion.a
        href="#games"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden glass rounded-2xl px-4 py-2 md:px-6 md:py-2.5 text-white text-sm md:text-base font-bold no-underline"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        <motion.span
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(251,191,36,0.35))",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10">🎮 Oyunlara Git</span>
      </motion.a>
    </nav>
  );
}

/** The main hero text + CTA block */
function HeroContent({ videoStarted }: { videoStarted: boolean }) {
  const titleVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    active:  { opacity: 1, y: -12 },
  };

  const subVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    active:  { opacity: 1, y: -8 },
  };

  const ctaVariants = {
    hidden:  { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
    active:  { opacity: 1, y: -5 },
  };

  const phase = videoStarted ? "active" : "visible";

  return (
    <div className="relative z-20 flex min-h-[80vh] items-center px-6 pb-10 md:px-12 lg:px-20">
      <div className="max-w-xl lg:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.5, ease: "backOut" }}
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs md:text-sm font-bold text-amber-300"
          style={{
            background: "rgba(251,191,36,0.12)",
            border: "1px solid rgba(251,191,36,0.4)",
            backdropFilter: "blur(10px)",
            fontFamily: "var(--font-nunito)",
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            ⭐
          </motion.span>
          Sihirli Dünya Açık!
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.7 }}
          >
            ⭐
          </motion.span>
        </motion.div>

        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate={phase}
          transition={{
            opacity: { duration: 0.85, delay: 0.7 },
            y:       { duration: 0.85, delay: 0.7, ease: "easeOut" },
          }}
          className={`mb-6 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] text-white ${
            videoStarted ? "animate-glow-active" : "animate-glow-idle"
          }`}
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          AYTUĞ&apos;UN
          <br />
          <span className="gradient-title">DÜNYASINA</span>
          <br />
          HOŞ GELDİNİZ
        </motion.h1>

        <motion.p
          variants={subVariants}
          initial="hidden"
          animate={phase}
          transition={{
            opacity: { duration: 0.8, delay: 0.95 },
            y:       { duration: 0.8, delay: 0.95, ease: "easeOut" },
          }}
          className="mb-9 max-w-md text-base md:text-xl leading-relaxed text-purple-200"
          style={{
            fontFamily: "var(--font-nunito)",
            textShadow: "0 2px 12px rgba(0,0,0,0.9)",
          }}
        >
          Macera, oyun ve hayal gücüyle dolu büyülü bir dünyaya hazır mısın?
        </motion.p>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={phase}
          transition={{
            opacity: { duration: 0.75, delay: 1.15 },
            y:       { duration: 0.75, delay: 1.15, ease: "easeOut" },
          }}
          className="flex flex-wrap gap-4"
        >
          <motion.a
            href="#adventure"
            whileHover={{
              scale: 1.06,
              boxShadow:
                "0 0 50px rgba(124,58,237,0.85), 0 8px 25px rgba(0,0,0,0.45)",
            }}
            whileTap={{ scale: 0.94 }}
            className="group relative overflow-hidden rounded-2xl px-7 py-4 text-white text-base md:text-lg font-black no-underline"
            style={{
              fontFamily: "var(--font-fredoka)",
              background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
              boxShadow:
                "0 0 30px rgba(124,58,237,0.55), 0 4px 18px rgba(0,0,0,0.4)",
            }}
          >
            <motion.span
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
              }}
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              🚀 Maceraya Başla
            </span>
          </motion.a>

          <motion.a
            href="#games"
            id="games"
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 40px rgba(251,191,36,0.55)",
            }}
            whileTap={{ scale: 0.94 }}
            className="relative overflow-hidden rounded-2xl px-7 py-4 text-base md:text-lg font-black no-underline"
            style={{
              fontFamily: "var(--font-fredoka)",
              background: "rgba(255,255,255,0.07)",
              border: "2px solid rgba(251,191,36,0.65)",
              color: "#fbbf24",
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 20px rgba(251,191,36,0.2)",
            }}
          >
            <motion.span
              className="absolute inset-0 rounded-2xl"
              style={{ background: "rgba(251,191,36,0.1)" }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              🎮 Oyunları Keşfet
            </span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

/** Scroll-down indicator */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
    >
      <span
        className="text-white/45 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        Keşfet
      </span>
      <motion.div
        className="animate-bounce-soft w-6 h-10 rounded-full flex items-start justify-center pt-1.5"
        style={{ border: "2px solid rgba(255,255,255,0.28)" }}
      >
        <span
          className="animate-scroll-dot block w-1 h-2.5 rounded-full bg-white/60"
        />
      </motion.div>
    </motion.div>
  );
}

/** Wave + cloud soft transition to next section */
function WaveTransition() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
    >
      <div
        className="h-16 md:h-24 w-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(10,15,46,0.6) 60%, rgba(10,15,46,0.95))",
        }}
      />
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full -mt-1"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C180,0 360,70 540,35 C720,0 900,65 1080,30 C1260,0 1380,55 1440,40 L1440,80 L0,80 Z"
          fill="#0a0f2e"
          fillOpacity="0.95"
        />
      </svg>
      <div className="h-2 bg-[#0a0f2e]" />
    </div>
  );
}

/** Video background with delayed autoplay */
function VideoBackground({
  onVideoStart,
}: {
  onVideoStart: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriedPlay = useRef(false);

  useEffect(() => {
    if (hasTriedPlay.current) return;

    const reducedMotion =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (reducedMotion) return;

    const timerId = setTimeout(() => {
      if (!videoRef.current || hasTriedPlay.current) return;
      hasTriedPlay.current = true;

      videoRef.current
        .play()
        .then(() => {
          onVideoStart();
        })
        .catch(() => {
          /* Autoplay blocked – poster image already visible */
        });
    }, 1800);

    return () => clearTimeout(timerId);
  }, [onVideoStart]);

  const handleEnded = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/aytug-hero.mp4"
        poster="/images/aytug-hero-poster.jpg"
        muted
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,15,46,0.88) 0%, rgba(10,15,46,0.55) 45%, rgba(10,15,46,0.15) 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,15,46,0.55) 0%, transparent 28%, transparent 65%, rgba(10,15,46,0.9) 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(5,8,26,0.72) 100%)",
        }}
      />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * HeroSection
 *
 * Full-screen cinematic hero for Aytuğ's landing page.
 * Video at /videos/aytug-hero.mp4 – poster at /images/aytug-hero-poster.jpg
 * Autoplay is delayed ~1.8 s to let the page settle; ends on last frame (no loop).
 */
export default function HeroSection() {
  const [videoStarted, setVideoStarted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const handleVideoStart = useCallback(() => {
    setVideoStarted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a0f2e]"
      style={{ minHeight: "100svh" }}
      aria-label="Aytuğ'un Dünyası – Ana Hero Bölümü"
    >
      <VideoBackground onVideoStart={handleVideoStart} />
      <AmbientOrbs />
      <StarField />
      <FloatingParticles active={videoStarted} />
      <SparkleEffect visible={!videoStarted} />
      <PlanetDecorations scrollYProgress={scrollYProgress} />
      <NavBar />
      <HeroContent videoStarted={videoStarted} />
      <ScrollIndicator />
      <WaveTransition />
    </section>
  );
}
