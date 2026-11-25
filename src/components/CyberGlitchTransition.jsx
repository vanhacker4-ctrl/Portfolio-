import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';

const TOTAL_DURATION_MS = 780; // Within 600-900ms spec
const SWITCH_AT_MS = 240;      // Scroll/route switch at peak digital veil

const ROUTE_LABELS = {
  '#hero': 'OVERVIEW',
  '#about': 'ABOUT ME',
  '#skills': 'TECHNICAL SKILLS',
  '#exploring': 'CURRENTLY EXPLORING',
  '#projects': 'SELECTED PROJECTS',
  '#timeline': 'LEARNING JOURNEY',
  '#cv': 'CURRICULUM VITAE',
  '#contact': 'CONTACT TERMINAL',
};

const DISTORTION_SLICES = [
  { top: '10%', height: '14px', anim: 'cyber-slice-a', color: 'rgba(0, 245, 255, 0.22)', delay: '0ms' },
  { top: '28%', height: '22px', anim: 'cyber-slice-b', color: 'rgba(139, 92, 246, 0.24)', delay: '35ms' },
  { top: '49%', height: '10px', anim: 'cyber-slice-a', color: 'rgba(0, 245, 255, 0.26)', delay: '70ms' },
  { top: '67%', height: '18px', anim: 'cyber-slice-b', color: 'rgba(255, 46, 147, 0.18)', delay: '45ms' },
  { top: '84%', height: '12px', anim: 'cyber-slice-a', color: 'rgba(0, 245, 255, 0.2)', delay: '90ms' },
];

/**
 * Full-screen Cyberpunk 2077 Glitch Page Transition overlay for SOTHEVAN.
 * GPU-accelerated (transform, opacity only) with RGB split, horizontal digital
 * distortion, subtle scanlines, pixel dissolve, neon cyan/purple flashes,
 * and automatic prefers-reduced-motion fallback.
 */
export default function CyberGlitchTransition({
  playOnMount = true,
  onSectionSwitch,
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [phase, setPhase] = useState('idle'); // 'idle' | 'entering' | 'dissolving'
  const [routeLabel, setRouteLabel] = useState('OVERVIEW');
  const [transitionId, setTransitionId] = useState(0);

  const timersRef = useRef([]);
  const hasBootedRef = useRef(false);
  const internalNavRef = useRef(false);

  // Precompute deterministic 40-cell (8x5) pixel dissolve timing
  const pixelCells = useMemo(() => {
    const pattern = [0, 3, 1, 5, 2, 6, 4, 7];
    return Array.from({ length: 40 }, (_, i) => {
      const col = i % 8;
      const row = Math.floor(i / 8);
      const staggerMs = ((pattern[(col + row) % 8] + row * 1.4) * 20) % 240;
      const accent =
        i === 5 || i === 14 || i === 22 || i === 31
          ? 'rgba(0, 245, 255, 0.16)'
          : i === 9 || i === 26 || i === 35
          ? 'rgba(139, 92, 246, 0.15)'
          : 'rgba(8, 9, 13, 0.96)';
      return { id: i, delayMs: Math.round(staggerMs), bg: accent };
    });
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  const performRouteJump = useCallback(
    (href) => {
      if (!href) return;
      const targetId = href.replace(/^#/, '') || 'hero';

      // Preserve native hash URL routing without re-triggering hashchange handler
      if (href.startsWith('#') && window.location.hash !== href) {
        internalNavRef.current = true;
        window.history.pushState(null, '', href);
        setTimeout(() => {
          internalNavRef.current = false;
        }, 60);
      }

      // Bypass CSS `scroll-smooth` on <html> so route switch is truly instant under the glitch veil
      const htmlEl = document.documentElement;
      const prevScrollBehavior = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = 'auto';

      if (href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }

      requestAnimationFrame(() => {
        htmlEl.style.scrollBehavior = prevScrollBehavior;
      });

      if (onSectionSwitch) {
        onSectionSwitch(targetId);
      }

      // Notify target section wrapper for staggered text reveal (without remounting state)
      window.dispatchEvent(
        new CustomEvent('cyber:section-reveal', { detail: { sectionId: targetId } })
      );
    },
    [onSectionSwitch]
  );

  const runTransition = useCallback(
    (href = '#hero', customLabel = '', skipEntering = false) => {
      clearTimers();

      const resolvedLabel =
        customLabel || ROUTE_LABELS[href] || href.replace(/^#/, '').toUpperCase() || 'OVERVIEW';
      setRouteLabel(resolvedLabel);
      setTransitionId((prev) => prev + 1);

      // Accessible Reduced-Motion Path: clean instant switch + gentle micro-fade
      if (prefersReducedMotion) {
        if (!skipEntering) performRouteJump(href);
        setPhase('dissolving');
        const endTimer = setTimeout(() => setPhase('idle'), 200);
        timersRef.current.push(endTimer);
        return;
      }

      if (skipEntering) {
        // Initial load digital pixel dissolve directly into the Hero page
        const targetId = href.replace(/^#/, '') || 'hero';
        setPhase('dissolving');
        window.dispatchEvent(
          new CustomEvent('cyber:section-reveal', { detail: { sectionId: targetId } })
        );
        const endTimer = setTimeout(() => setPhase('idle'), 600);
        timersRef.current.push(endTimer);
        return;
      }

      // Phase 1: RGB Split + Horizontal Distortion + Neon Flash + Pixel Veil (0 -> 240ms)
      setPhase('entering');

      const switchTimer = setTimeout(() => {
        performRouteJump(href);
        // Phase 2: Pixel Dissolve + Scanline Sweep + Staggered Reveal (240ms -> 780ms)
        setPhase('dissolving');
      }, SWITCH_AT_MS);

      const finishTimer = setTimeout(() => {
        setPhase('idle');
      }, TOTAL_DURATION_MS);

      timersRef.current.push(switchTimer, finishTimer);
    },
    [clearTimers, performRouteJump, prefersReducedMotion]
  );

  // Trigger clean Cyberpunk digital dissolve on initial page load
  useEffect(() => {
    if (playOnMount && !hasBootedRef.current) {
      hasBootedRef.current = true;
      const initialHash = window.location.hash || '#hero';
      const initialLabel = ROUTE_LABELS[initialHash] || 'OVERVIEW';
      runTransition(initialHash, initialLabel, true);
    }
  }, [playOnMount, runTransition]);

  // Listen for global cyber navigation requests + native browser hashchange
  useEffect(() => {
    const handleCyberNavigate = (e) => {
      const { href, label } = e.detail || {};
      runTransition(href || '#hero', label || '', false);
    };

    const handleHashChange = () => {
      if (internalNavRef.current) return;
      const hash = window.location.hash || '#hero';
      runTransition(hash, ROUTE_LABELS[hash] || '', false);
    };

    window.addEventListener('cyber:navigate', handleCyberNavigate);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('cyber:navigate', handleCyberNavigate);
      window.removeEventListener('hashchange', handleHashChange);
      clearTimers();
    };
  }, [runTransition, clearTimers]);

  if (phase === 'idle') return null;

  return (
    <div
      key={transitionId}
      aria-hidden="true"
      className="fixed inset-0 z-[9994] pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Lightweight GPU Pixel Dissolve Matrix (8x5 desktop / 5x8 mobile = 40 cells) */}
      <div className="absolute inset-0 grid grid-cols-5 sm:grid-cols-8 grid-rows-8 sm:grid-rows-5">
        {pixelCells.map((cell) => (
          <div
            key={cell.id}
            className={`w-full h-full border-[0.5px] border-white/[0.02] ${
              phase === 'entering' ? 'cyber-pixel-in' : 'cyber-pixel-dissolve'
            }`}
            style={{
              backgroundColor: cell.bg,
              animationDelay:
                phase === 'dissolving' ? `${cell.delayMs}ms` : `${Math.round(cell.delayMs * 0.35)}ms`,
            }}
          />
        ))}
      </div>

      {/* Reduced-motion guard: skip distortion/flash layers if user prefers reduced motion */}
      {!prefersReducedMotion && (
        <>
          {/* 2. Neon Cyan / Purple Electric Flashes */}
          <div
            className={`absolute inset-0 cyber-neon-flash ${
              phase === 'dissolving' ? 'opacity-0 transition-opacity duration-200' : ''
            }`}
            style={{
              background:
                'radial-gradient(circle at 28% 35%, rgba(0, 245, 255, 0.22), transparent 55%), radial-gradient(circle at 72% 65%, rgba(139, 92, 246, 0.24), transparent 55%)',
            }}
          />

          {/* 3. Subtle CRT / Cyber HUD Scanlines Overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              phase === 'dissolving' ? 'opacity-0' : 'opacity-25'
            }`}
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 4px)',
            }}
          />

          {/* 4. Horizontal Digital Distortion Tear Bars */}
          {DISTORTION_SLICES.map((slice, idx) => (
            <div
              key={idx}
              className={`absolute left-0 right-0 ${slice.anim}`}
              style={{
                top: slice.top,
                height: slice.height,
                background: `linear-gradient(90deg, transparent 0%, ${slice.color} 22%, rgba(255,255,255,0.18) 50%, ${slice.color} 78%, transparent 100%)`,
                animationDelay: slice.delay,
              }}
            />
          ))}

          {/* 5. Vertical Laser Scanline Sweep during Dissolve */}
          {phase === 'dissolving' && (
            <div
              className="absolute left-0 right-0 h-[3px] cyber-scan-sweep"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, #00F5FF 25%, #FFFFFF 50%, #A855F7 75%, transparent 100%)',
                boxShadow: '0 0 18px rgba(0, 245, 255, 0.8), 0 0 36px rgba(139, 92, 246, 0.6)',
              }}
            />
          )}

          {/* 6. Centered SOTHEVAN Chromatic RGB Split Wordmark */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center px-4 ${
              phase === 'dissolving' ? 'cyber-wordmark-out' : ''
            }`}
          >
            <div className="relative inline-flex items-center justify-center">
              {/* Cyan Split Ghost */}
              <span
                className="absolute inset-0 font-space font-black text-3xl sm:text-6xl lg:text-7xl tracking-[0.16em] sm:tracking-[0.22em] text-[#00F5FF] mix-blend-screen cyber-rgb-right"
                aria-hidden="true"
              >
                SOTHEVAN
              </span>

              {/* Magenta / Purple Split Ghost */}
              <span
                className="absolute inset-0 font-space font-black text-3xl sm:text-6xl lg:text-7xl tracking-[0.16em] sm:tracking-[0.22em] text-[#A855F7] mix-blend-screen cyber-rgb-left"
                aria-hidden="true"
              >
                SOTHEVAN
              </span>

              {/* Crisp Core Brand Text */}
              <span className="relative font-space font-black text-3xl sm:text-6xl lg:text-7xl tracking-[0.16em] sm:tracking-[0.22em] text-white drop-shadow-[0_0_24px_rgba(0,245,255,0.45)]">
                SOTHEVAN
              </span>
            </div>

            {/* Staggered Route Status Pill */}
            <div className="mt-4 flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#0c1018]/90 border border-cyan-400/40 shadow-[0_0_16px_rgba(0,245,255,0.25)] cyber-stagger-reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-ping" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-cyan-300 uppercase">
                {routeLabel}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Staggered reveal wrapper that animates section entrance smoothly upon
 * transition arrival WITHOUT unmounting children or losing local UI state.
 */
export function CyberSectionReveal({ id, children, className = '' }) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const controls = useAnimationControls();

  useEffect(() => {
    const handleReveal = (e) => {
      if (e.detail?.sectionId !== id) return;

      if (prefersReducedMotion) {
        controls.set({ opacity: 0.65 });
        controls.start({
          opacity: 1,
          transition: { duration: 0.18, ease: 'easeOut' },
        });
        return;
      }

      controls.set({ opacity: 0.2, y: 18, filter: 'blur(5px)' });
      controls
        .start({
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] },
        })
        .then(() => {
          controls.set({ filter: 'none', transform: 'none' });
        });
    };

    window.addEventListener('cyber:section-reveal', handleReveal);
    return () => window.removeEventListener('cyber:section-reveal', handleReveal);
  }, [controls, id, prefersReducedMotion]);

  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
}
