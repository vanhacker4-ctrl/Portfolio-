import React, { useRef } from 'react';
import {
  FileText,
  Download,
  Clock,
  ShieldCheck,
  ExternalLink,
  Mail,
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { navigateWithGlitch } from '../utils/cyberNavigation';
import { ScrollReveal } from './ScrollReveal';

/**
 * =========================================================================
 * CV INTEGRATION CONFIGURATION
 * =========================================================================
 * To enable CV download and preview later:
 * 1. Place your real PDF inside `public/cv/` (e.g. `public/cv/Sotheavan_Pich_CV.pdf`).
 * 2. Set `fileUrl` below to `'/cv/Sotheavan_Pich_CV.pdf'`.
 */
export const CV_CONFIG = {
  fileUrl: '',
  fileName: 'Sotheavan_Pich_CV.pdf',
  format: 'PDF',
  edition: '2026 Edition',
};

export default function CVSection() {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const rafRef = useRef(0);

  const hasCV = Boolean(CV_CONFIG.fileUrl && CV_CONFIG.fileUrl.trim() !== '');

  const handleMouseMove = (e) => {
    if (!cardRef.current || rafRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(420px circle at ${x.toFixed(0)}px ${y.toFixed(0)}px, rgba(0, 245, 255, 0.16), transparent 65%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <div id="cv" className="mt-10 scroll-mt-28">
      <ScrollReveal y={24} blur={8} delay={0.12}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative overflow-hidden rounded-2xl cyber-panel-hud border border-white/[0.1] hover:border-cyan-400/40 p-5 sm:p-6 transition-all duration-300 shadow-[0_18px_42px_-16px_rgba(0,0,0,0.75)]"
        >
          {/* Specular Top Neon Rim */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F5FF]/55 to-purple-500/55 opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Cursor Spotlight */}
          <div
            ref={spotlightRef}
            className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0 opacity-0"
          />

          {/* Compact Corner HUD Brackets */}
          <span className="pointer-events-none absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-white/20 group-hover:border-[#00F5FF]/70 transition-colors select-none z-10" aria-hidden="true" />
          <span className="pointer-events-none absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/20 group-hover:border-purple-400/70 transition-colors select-none z-10" aria-hidden="true" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left: Compact Document Icon & Metadata */}
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5FF]/15 via-slate-900/90 to-purple-500/20 border border-cyan-400/35 flex items-center justify-center shadow-[0_0_18px_rgba(0,245,255,0.16)]">
                  <FileText className="w-5 h-5 text-[#00F5FF]" />
                </div>
                <span className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded bg-[#08090d] border border-purple-400/40 font-mono text-[8px] font-semibold text-purple-200 tracking-wider">
                  {CV_CONFIG.format}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-space font-semibold text-base sm:text-lg text-white">
                    Curriculum Vitae
                  </span>
                  {hasCV ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 font-mono text-[10px] text-emerald-300">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Ready</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 font-mono text-[10px] text-amber-300">
                      <Clock className="w-3 h-3" />
                      <span>Pending Upload</span>
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 font-mono text-[10px] text-purple-200">
                    {CV_CONFIG.edition}
                  </span>
                </div>

                <p className="font-inter text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                  {hasCV
                    ? `Printable ${CV_CONFIG.format} resume covering academic record, scholarship recognition, skills, and projects (${CV_CONFIG.fileName}).`
                    : 'Printable PDF resume is being prepared. You can request a direct copy via the contact channels below.'}
                </p>
              </div>
            </div>

            {/* Right: Compact Action Controls */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {hasCV ? (
                <>
                  <a
                    href={CV_CONFIG.fileUrl}
                    download={CV_CONFIG.fileName}
                    onClick={() => cyberAudio.playClick()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00F5FF] to-cyan-300 hover:brightness-110 text-slate-950 font-mono text-xs font-semibold tracking-wide flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.28)] transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV</span>
                  </a>
                  <a
                    href={CV_CONFIG.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/45 text-purple-200 hover:text-white font-mono text-xs font-medium tracking-wide flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </a>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="CV PDF not uploaded yet"
                    className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 font-mono text-xs flex items-center gap-2 opacity-60 cursor-not-allowed select-none"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF Unavailable</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateWithGlitch('#contact', 'CONTACT')}
                    onMouseEnter={() => cyberAudio.playHover()}
                    data-cursor="CONTACT"
                    className="px-4 py-2 rounded-xl bg-cyan-400/15 hover:bg-cyan-400/25 border border-cyan-400/45 hover:border-cyan-300 text-cyan-200 hover:text-white font-mono text-xs font-medium tracking-wide flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#00F5FF]" />
                    <span>Request CV</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
