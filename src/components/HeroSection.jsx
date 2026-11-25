import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Activity, Mail, MessageCircle, Send, Share2, X, Maximize2 } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { navigateWithGlitch } from '../utils/cyberNavigation';
import { GITHUB_CONFIG } from '../config/github';

const GitHubNavIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const CINEMATIC_EASE = [0.16, 1, 0.3, 1];

const HERO_CARDS = [
  {
    id: 'code-matrix',
    title: 'Python Workflow',
    src: '/images/hero-code-matrix.jpg',
    webpSrc: '/images/hero-code-matrix.webp',
    alt: 'Python Workflow Illustration',
    // Upper-left: completely clear of the face, floating in the left margin space
    positionClass: 'top-2 sm:top-5 -left-1 sm:-left-6 lg:-left-12',
    wClass: 'w-28 sm:w-36 lg:w-40',
    delay: 0,
    floatY: [-5, 5, -5],
  },
  {
    id: 'neural-dna',
    title: 'Neural Systems',
    src: '/images/hero-neural-dna.jpg',
    webpSrc: '/images/hero-neural-dna.webp',
    alt: 'Neural Systems Illustration',
    // Upper-right: completely clear of the hair, floating in the top-right corner
    positionClass: 'top-2 sm:top-5 -right-1 sm:-right-4 lg:-right-10',
    wClass: 'w-28 sm:w-36 lg:w-40',
    delay: 0.8,
    floatY: [5, -5, 5],
  },
  {
    id: 'ai-tools',
    title: 'AI Tooling',
    src: '/images/hero-ai-tools.jpg',
    webpSrc: '/images/hero-ai-tools.webp',
    alt: 'AI Tooling Illustration',
    // Mid-right: floating behind the ear/back of head, clear of face
    positionClass: 'top-[39%] -translate-y-1/2 -right-1 sm:-right-6 lg:-right-12',
    wClass: 'w-28 sm:w-36 lg:w-40',
    delay: 1.6,
    floatY: [-4, 4, -4],
  },
  {
    id: 'code-future',
    title: 'Core Languages',
    src: '/images/hero-code-future.jpg',
    webpSrc: '/images/hero-code-future.webp',
    alt: 'Core Languages Illustration',
    // Lower-right: floating below near the shoulder, clear of body
    positionClass: 'bottom-1 sm:bottom-2 -right-1 sm:-right-4 lg:-right-10',
    wClass: 'w-28 sm:w-36 lg:w-40',
    delay: 2.4,
    floatY: [4, -4, 4],
  },
];

/**
 * Character-by-character staggered reveal with crisp GPU transform and upward motion.
 */
function StaggeredChars({
  text,
  className = '',
  charClassName = '',
  startDelay = 0,
  staggerDelay = 0.038,
  prefersReducedMotion = false,
}) {
  const chars = Array.from(text);

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {chars.map((char, index) => {
        const isSpace = char === ' ';
        return (
          <motion.span
            key={`${char}-${index}`}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.96 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.25 : 0.65,
              delay: prefersReducedMotion ? 0 : startDelay + index * staggerDelay,
              ease: CINEMATIC_EASE,
            }}
            className={`inline-block will-change-[transform,opacity] ${charClassName}`}
            aria-hidden="true"
          >
            {isSpace ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </span>
  );
}

/**
 * Word-by-word staggered reveal with crisp GPU transform and upward motion.
 */
function StaggeredWords({
  text,
  className = '',
  wordClassName = '',
  startDelay = 0,
  staggerDelay = 0.065,
  prefersReducedMotion = false,
}) {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
        >
          <motion.span
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.97 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.25 : 0.65,
              delay: prefersReducedMotion ? 0 : startDelay + index * staggerDelay,
              ease: CINEMATIC_EASE,
            }}
            className={`inline-block will-change-[transform,opacity] ${wordClassName}`}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroSection({ isRevealed = true }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const portraitStageRef = useRef(null);
  const statusBadgeRef = useRef(null);
  const latencyBadgeRef = useRef(null);
  const frameCounterRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = Boolean(useReducedMotion());

  // Close lightbox modal on Escape
  useEffect(() => {
    if (!previewImage) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setPreviewImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previewImage]);

  // Ensure hero portrait video buffers, stays muted for autoplay, and retries cleanly
  useEffect(() => {
    if (videoFailed || !heroRef.current || !videoRef.current) return;
    const videoEl = videoRef.current;
    let isVisible = true;

    videoEl.defaultMuted = true;
    videoEl.muted = true;
    videoEl.playsInline = true;

    const attemptPlay = () => {
      if (!isVisible) return;
      videoEl.muted = true;
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Will retry on canplay or first user interaction if browser gated autoplay
        });
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && isVisible) {
        attemptPlay();
      }
    };

    const handleFirstInteraction = () => {
      if (videoEl.paused && isVisible) {
        attemptPlay();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          attemptPlay();
        } else if (!videoEl.paused) {
          videoEl.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(heroRef.current);
    videoEl.addEventListener('loadedmetadata', attemptPlay);
    videoEl.addEventListener('loadeddata', attemptPlay);
    videoEl.addEventListener('canplay', attemptPlay);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true, once: true });

    attemptPlay();

    return () => {
      observer.disconnect();
      videoEl.removeEventListener('loadedmetadata', attemptPlay);
      videoEl.removeEventListener('loadeddata', attemptPlay);
      videoEl.removeEventListener('canplay', attemptPlay);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [videoFailed]);

  // Update telemetry canvas frame text directly without triggering React re-renders
  useEffect(() => {
    let rafId = 0;
    let lastFrame = -1;

    const updateFrameText = () => {
      rafId = 0;
      if (!frameCounterRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      const frame = Math.min(74, Math.max(0, Math.round(progress * 74)));
      if (frame !== lastFrame) {
        lastFrame = frame;
        frameCounterRef.current.textContent = String(frame).padStart(2, '0');
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateFrameText);
      }
    };

    updateFrameText();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleScrollTo = (target, label = '') => {
    navigateWithGlitch(target, label);
  };

  // GPU-composited pointer parallax applied via rAF + refs (zero React re-renders)
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      prefersReducedMotion ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const node = heroRef.current;
    if (!node) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const applyParallax = () => {
      rafId = 0;
      if (portraitStageRef.current) {
        portraitStageRef.current.style.transform = `perspective(1200px) rotateY(${(targetX * 12).toFixed(2)}deg) rotateX(${(-targetY * 8).toFixed(2)}deg)`;
      }
      if (statusBadgeRef.current) {
        statusBadgeRef.current.style.transform = `translate3d(${(targetX * 14).toFixed(1)}px, ${(targetY * -8).toFixed(1)}px, 40px)`;
      }
      if (latencyBadgeRef.current) {
        latencyBadgeRef.current.style.transform = `translate3d(${(targetX * 10).toFixed(1)}px, ${(targetY * -10).toFixed(1)}px, 24px)`;
      }
    };

    const handleMouseMove = (e) => {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!rafId) {
        rafId = requestAnimationFrame(applyParallax);
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(applyParallax);
      }
    };

    node.addEventListener('mousemove', handleMouseMove, { passive: true });
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  const skillPills = [
    'Full-Stack Development',
    'AI Prompt Engineering',
    'React and TypeScript',
    'Python and FastAPI',
    'AI Automation',
  ];

  const socialChannels = [
    {
      label: 'Telegram (+856 20 54 580 186)',
      href: 'https://t.me/+8562054580186',
      icon: Send,
      external: true,
    },
    {
      label: 'WhatsApp (+856 20 54 580 186)',
      href: 'https://wa.me/8562054580186',
      icon: MessageCircle,
      external: true,
    },
    {
      label: 'Gmail (pichsotheavan020@gmail.com)',
      href: 'mailto:pichsotheavan020@gmail.com',
      icon: Mail,
      external: false,
    },
    ...(GITHUB_CONFIG.profileUrl
      ? [
          {
            label: `GitHub (@${GITHUB_CONFIG.username})`,
            href: GITHUB_CONFIG.profileUrl,
            icon: GitHubNavIcon,
            external: true,
          },
        ]
      : []),
    {
      label: 'Direct Channels and Contact',
      href: '#contact',
      icon: Share2,
      external: false,
      scroll: true,
    },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-8 lg:px-12 z-10 bg-[#08090d] overflow-hidden"
    >
      {/* Atmospheric Dual-Tone Backdrop (Amber Left + Cyan Right) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Warm bronze/amber ambient glow on left behind typography */}
        <div className="absolute -top-24 -left-24 w-[760px] h-[760px] rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.16)_0%,rgba(194,65,12,0.06)_45%,transparent_72%)]" />

        {/* Cool cyber cyan glow on right behind portrait */}
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.14)_0%,rgba(139,92,246,0.06)_45%,transparent_72%)]" />

        {/* Subtle Architectural Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)',
            backgroundSize: '84px 84px',
          }}
        />

        {/* Subtle '+' Blueprint Crosshairs */}
        <span className="hidden md:block absolute top-28 right-[38%] text-white/25 font-mono text-sm">+</span>
        <span className="hidden md:block absolute top-[34%] right-[48%] text-white/20 font-mono text-sm">+</span>
        <span className="hidden md:block absolute top-[46%] right-[11%] text-white/25 font-mono text-sm">+</span>
        <span className="hidden md:block absolute bottom-[26%] left-[47%] text-white/20 font-mono text-sm">+</span>

        {/* Smooth bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-b from-transparent to-[#08090d]" />
      </div>

      {/* Main 2-Column Hero Grid */}
      <motion.div
        initial={{ opacity: 1, y: 10 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0.95, y: 0 }}
        transition={{ duration: 0.55, ease: CINEMATIC_EASE }}
        className="relative z-10 max-w-7xl w-full mx-auto my-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center"
      >
        {/* ================================================================
            LEFT COLUMN: LIVE IDENTITY, ROLE, ACTIONS & TAGS
            ================================================================ */}
        <div className="md:col-span-6 space-y-5 text-left">
          {/* Availability Pill */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04, ease: CINEMATIC_EASE }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white/[0.04] border border-amber-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.08)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.12em] text-zinc-200">
              Open to Opportunities <span className="text-amber-400">&bull; 2026</span>
            </span>
          </motion.div>

          {/* Primary Name Heading & Role Subtitle with Staggered Reveal */}
          <div className="space-y-2">
            <h1 className="font-space font-bold text-4xl sm:text-5xl lg:text-[52px] tracking-tight leading-[1.05]">
              {/* Highlight SOTHEAVAN with subtle neon cyan gradient & staggered reveal */}
              <StaggeredChars
                text="SOTHEAVAN"
                charClassName="bg-gradient-to-br from-white via-[#00F5FF] to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,245,255,0.45)]"
                startDelay={0.08}
                staggerDelay={0.022}
                prefersReducedMotion={prefersReducedMotion}
              />
              <span className="inline-block w-2.5 sm:w-3.5" />
              <StaggeredChars
                text="PICH"
                charClassName="text-white drop-shadow-[0_2px_14px_rgba(255,255,255,0.2)]"
                startDelay={0.28}
                staggerDelay={0.024}
                prefersReducedMotion={prefersReducedMotion}
              />
            </h1>

            <div className="font-space font-semibold text-xl sm:text-2xl lg:text-[28px] tracking-tight leading-[1.2] pt-0.5">
              <StaggeredWords
                text="Full-Stack Developer"
                wordClassName="text-zinc-100 drop-shadow-[0_0_20px_rgba(251,146,60,0.18)]"
                startDelay={0.42}
                staggerDelay={0.04}
                prefersReducedMotion={prefersReducedMotion}
              />
              <br />
              <StaggeredWords
                text="and AI Prompt Engineer"
                wordClassName="bg-gradient-to-r from-white via-zinc-100 to-cyan-200 bg-clip-text text-transparent"
                startDelay={0.56}
                staggerDelay={0.04}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>

          {/* Editorial Description */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.01, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: CINEMATIC_EASE }}
            className="font-inter text-sm sm:text-base text-zinc-200 leading-relaxed max-w-lg"
          >
            Designing modern full-stack applications, structured AI workflows, and responsive web
            interfaces through disciplined software engineering and prompt design.
          </motion.p>

          {/* Primary & Secondary Action Buttons */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48, ease: CINEMATIC_EASE }}
            className="flex flex-wrap items-center gap-3.5 pt-1"
          >
            <button
              type="button"
              onClick={() => handleScrollTo('#projects')}
              onMouseEnter={() => cyberAudio.playHover()}
              data-cursor="PROJECTS"
              className="group relative overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/25 border border-amber-400/60 hover:border-amber-300 text-white font-mono text-xs font-semibold tracking-wide shadow-[0_0_24px_rgba(245,158,11,0.2)] hover:shadow-[0_0_34px_rgba(245,158,11,0.4)] transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-95"
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity" />
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="relative z-10 w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo('#contact')}
              onMouseEnter={() => cyberAudio.playHover()}
              data-cursor="CONTACT"
              className="group relative overflow-hidden px-6 py-3 rounded-lg bg-white/[0.04] hover:bg-cyan-500/[0.12] border border-white/15 hover:border-cyan-400/60 text-zinc-200 hover:text-cyan-300 font-mono text-xs font-medium tracking-wide backdrop-blur-md shadow-sm hover:shadow-[0_0_24px_rgba(0,245,255,0.2)] transition-all duration-300 cursor-pointer active:scale-95"
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity" />
              <span className="relative z-10">Get in Touch</span>
            </button>
          </motion.div>

          {/* Skill Pills */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.56, ease: CINEMATIC_EASE }}
            className="flex flex-wrap gap-2 pt-1 max-w-xl"
          >
            {skillPills.map((skill) => (
              <span
                key={skill}
                onMouseEnter={() => cyberAudio.playHover()}
                className="px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyan-400/40 font-mono text-[11px] text-zinc-300 hover:text-white transition-all duration-200 select-none"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Social & Quick Channel Icons */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.64, ease: CINEMATIC_EASE }}
            className="flex items-center gap-3 pt-1"
          >
            {socialChannels.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  onClick={(e) => {
                    if (item.scroll) {
                      e.preventDefault();
                      handleScrollTo(item.href);
                    } else {
                      cyberAudio.playClick();
                    }
                  }}
                  onMouseEnter={() => cyberAudio.playHover()}
                  title={item.label}
                  aria-label={item.label}
                  data-cursor="CONNECT"
                  className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-cyan-500/15 border border-white/[0.1] hover:border-cyan-400/50 flex items-center justify-center text-zinc-200 hover:text-cyan-300 transition-all duration-200 cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* ================================================================
            RIGHT COLUMN: SEAMLESS CYBER PORTRAIT + FLOATING 3D HUD CARDS
            ================================================================ */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 0.99 } : { opacity: 1, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0, ease: CINEMATIC_EASE }}
          className="md:col-span-6 relative flex items-center justify-center"
        >
          <div
            ref={portraitStageRef}
            className="relative w-full max-w-[580px] h-[380px] sm:h-[440px] md:h-[480px] lg:h-[530px] flex items-center justify-center transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: 'perspective(1200px) rotateY(0deg) rotateX(0deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Soft Glow Behind Portrait */}
            <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.22)_0%,rgba(249,115,22,0.08)_50%,transparent_75%)] pointer-events-none" />

            {/* Clean Seamless Video Portrait Stage (16:10 framed so SOTHEAVAN text & sides stay unclipped) */}
            <div
              style={{
                transformStyle: 'preserve-3d',
                WebkitMaskImage:
                  'radial-gradient(ellipse 88% 86% at 50% 50%, black 64%, transparent 98%)',
                maskImage:
                  'radial-gradient(ellipse 88% 86% at 50% 50%, black 64%, transparent 98%)',
              }}
              className="relative w-full aspect-[16/10] max-h-[410px] flex items-center justify-center overflow-hidden rounded-3xl group/portrait z-10"
            >
              {videoFailed ? (
                <picture className="w-full h-full">
                  <source srcSet="/glass/webp/frame_00_delay-0.067s.webp" type="image/webp" />
                  <img
                    src="/glass/frame_00_delay-0.067s.png"
                    alt="Sotheavan Pich Cyber Portrait"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center scale-[1.06] select-none pointer-events-none group-hover/portrait:scale-[1.08] transition-transform duration-500"
                  />
                </picture>
              ) : (
                <video
                  ref={videoRef}
                  poster="/glass/webp/frame_00_delay-0.067s.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onError={() => {
                    if (videoRef.current?.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
                      setVideoFailed(true);
                    }
                  }}
                  className="w-full h-full object-cover object-center scale-[1.14] select-none pointer-events-none group-hover/portrait:scale-[1.18] transition-transform duration-500"
                >
                  <source src="/videos/hero-portrait.webm" type="video/webm" />
                  <source src="/videos/hero-portrait-opt.mp4" type="video/mp4" />
                  <source src="/videos/hero-portrait.mp4" type="video/mp4" />
                </video>
              )}
            </div>

            {/* 4 FLOATING HUD CARDS (PERIMETER POSITIONED - NEVER BLOCKS VIDEO) */}
            {HERO_CARDS.map((card) => (
              <motion.div
                key={card.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  cyberAudio.playClick();
                  setPreviewImage({ src: card.webpSrc || card.src, fallbackSrc: card.src, title: card.title });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    cyberAudio.playClick();
                    setPreviewImage({ src: card.webpSrc || card.src, fallbackSrc: card.src, title: card.title });
                  }
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                data-cursor="VIEW"
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { y: card.floatY }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: card.delay,
                }}
                className={`absolute ${card.positionClass} ${card.wClass} z-20 text-left rounded-lg bg-[#0c1018]/90 border border-white/15 hover:border-cyan-400/70 backdrop-blur-md p-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.6)] hover:shadow-[0_0_24px_rgba(0,245,255,0.35)] transition-all duration-300 hover:scale-105 cursor-pointer will-change-transform group/card`}
                style={{
                  transform: 'translateZ(60px)',
                }}
                title={`Click to view ${card.title}`}
              >
                <div className="h-16 sm:h-20 md:h-24 rounded bg-[#070a10] border border-white/10 overflow-hidden relative">
                  <picture className="w-full h-full block">
                    <source srcSet={card.webpSrc} type="image/webp" />
                    <img
                      src={card.src}
                      alt={card.alt}
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-500"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018]/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* View icon badge */}
                  <div className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 absolute top-1.5 right-1.5 p-1 rounded bg-black/75 border border-cyan-400/50 text-cyan-300 pointer-events-none shadow-md">
                    <Maximize2 className="w-2.5 h-2.5" />
                  </div>
                </div>
                <div className="mt-1 px-0.5 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-zinc-200 tracking-normal sm:tracking-wider">
                  <span className="truncate">{card.title}</span>
                </div>
              </motion.div>
            ))}

            {/* FLOATING HUD BADGE 1: STATUS: ONLINE (Lower-Left Margin, clear of video) */}
            <div
              ref={statusBadgeRef}
              onMouseEnter={() => cyberAudio.playHover()}
              className="absolute bottom-20 sm:bottom-24 md:bottom-28 -left-2 sm:-left-6 lg:-left-12 z-20 rounded-lg bg-[#0c1018]/90 border border-white/15 hover:border-emerald-400/50 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-2xl transition-all duration-300 hover:scale-105 will-change-transform"
              style={{
                transform: 'translate3d(0px, 0px, 40px)',
              }}
            >
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center">
                  <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 animate-pulse" />
                </div>
                <div className="font-mono leading-tight">
                  <div className="text-[9px] sm:text-[10px] font-semibold text-white tracking-wide">
                    Status: Available
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-emerald-400/90">Southeast Asia</div>
                </div>
              </div>
            </div>

            {/* FLOATING HUD BADGE 2: FOCUS & ACADEMIC STATUS */}
            <div
              ref={latencyBadgeRef}
              onMouseEnter={() => cyberAudio.playHover()}
              className="hidden sm:block absolute bottom-4 sm:bottom-8 left-0 sm:left-2 lg:-left-4 z-20 rounded-lg bg-[#0c1018]/90 border border-white/15 hover:border-cyan-400/50 backdrop-blur-md px-3 py-2 shadow-2xl transition-all duration-300 hover:scale-105 will-change-transform"
              style={{
                transform: 'translate3d(0px, 0px, 24px)',
              }}
            >
              <div className="font-mono leading-tight">
                <div className="text-[10px] text-white font-medium tracking-wide">
                  Focus: <span className="text-cyan-400">Full-Stack and AI</span>
                </div>
                <div className="text-[9px] text-zinc-300 mt-0.5">Year 2 Programming Student</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator Strip */}
      <div className="relative z-10 max-w-7xl w-full mx-auto pt-6 mt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
          <span className="text-zinc-400">Scene Frame</span>
          <span ref={frameCounterRef} className="text-[#00F5FF]">00</span>
          <span className="text-zinc-500">/ 74</span>
          <span className="text-zinc-700 hidden md:inline">&bull;</span>
          <span className="text-emerald-400 hidden md:inline">Student and Software Developer</span>
        </div>

        <button
          type="button"
          onClick={() => handleScrollTo('#about')}
          onMouseEnter={() => cyberAudio.playHover()}
          data-cursor="SCROLL"
          className="flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors group cursor-pointer"
        >
          <span>Scroll to Explore</span>
          <div className="w-8 h-[1px] bg-zinc-600 group-hover:w-12 group-hover:bg-[#00F5FF] transition-all" />
        </button>
      </div>

      {/* Lightbox Image Preview Modal (Portaled to body) */}
      {previewImage &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={previewImage.title}
            onClick={() => {
              cyberAudio.playClick();
              setPreviewImage(null);
            }}
            className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-2xl bg-[#0c1018] border border-cyan-400/35 p-3 shadow-[0_0_50px_rgba(0,245,255,0.2)] animate-modal-pop"
            >
              <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-white/10">
                <span className="font-mono text-xs text-cyan-300 tracking-wider">
                  {previewImage.title}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playClick();
                    setPreviewImage(null);
                  }}
                  aria-label="Close preview"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="rounded-xl overflow-hidden bg-[#060911] border border-white/10 max-h-[75vh] flex items-center justify-center">
                <img
                  src={previewImage.src}
                  alt={previewImage.title}
                  onError={(e) => {
                    if (previewImage.fallbackSrc && e.currentTarget.src !== previewImage.fallbackSrc) {
                      e.currentTarget.src = previewImage.fallbackSrc;
                    }
                  }}
                  className="w-full h-auto max-h-[72vh] object-contain"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
