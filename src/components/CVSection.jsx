import React, { useRef, useState } from 'react';
import {
  FileText,
  Download,
  Upload,
  Lock,
  Clock,
  ShieldCheck,
  ExternalLink,
  Mail,
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { navigateWithGlitch } from '../utils/cyberNavigation';
import { ScrollReveal, ScrollDivider } from './ScrollReveal';

/**
 * =========================================================================
 * CV INTEGRATION CONFIGURATION
 * =========================================================================
 * To enable CV download & preview later:
 * 1. Place your real PDF inside `public/cv/` (e.g. `public/cv/Sotheavan_Pich_CV.pdf`).
 * 2. Set `fileUrl` below to `'/cv/Sotheavan_Pich_CV.pdf'` (and optionally `updatedAt` / `fileSize`).
 * All download & preview controls unlock automatically once `fileUrl` is provided.
 */
export const CV_CONFIG = {
  fileUrl: '',
  fileName: 'Sotheavan_Pich_CV.pdf',
  format: 'PDF',
  edition: '2026 EDITION',
  updatedAt: '',
  fileSize: '',
};

export default function CVSection() {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const hasCV = Boolean(CV_CONFIG.fileUrl && CV_CONFIG.fileUrl.trim().length > 0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width - 0.5) * 2;
    const ny = (y / rect.height - 0.5) * 2;

    setSpotlight({ x, y, opacity: 1 });
    setTilt({ rx: -ny * 2.4, ry: nx * 2.4 });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section
      id="cv"
      className="relative py-28 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Ambient Neon Cyan & Electric Purple Glows */}
      <div className="ambient-glow bg-[#00F5FF] -top-16 -left-24 opacity-10" />
      <div className="ambient-glow bg-[#8B5CF6] bottom-0 -right-24 opacity-10" />

      {/* Section Header */}
      <div className="relative pb-7 mb-14">
        <ScrollReveal y={16} blur={6} delay={0}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#00F5FF] tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse shadow-[0_0_8px_#00F5FF]" />
                [ CURRICULUM VITAE ]
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-xs font-mono text-zinc-200 tracking-wider uppercase">
                Verified Dossier &amp; Resume Vault
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-purple-400/25 font-mono text-[10px] tracking-widest text-purple-200">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>FORMAT: {CV_CONFIG.format}</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal y={26} blur={10} delay={0.1}>
          <h2 className="font-space font-light text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.04]">
            Curriculum vitae. <br />
            <span className="font-normal italic bg-gradient-to-r from-white via-[#00F5FF] to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,245,255,0.22)]">
              Formal dossier.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal y={20} blur={8} delay={0.18}>
          <p className="font-inter text-sm sm:text-base text-zinc-200 mt-4 max-w-2xl font-normal leading-relaxed">
            A dedicated repository for my printable PDF resume covering academic background, scholarship credentials, and full-stack engineering experience.
          </p>
        </ScrollReveal>

        <ScrollDivider
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#00F5FF]/45 via-purple-400/30 to-transparent"
          delay={0.16}
        />
      </div>

      {/* Holographic Glassmorphism CV Card */}
      <ScrollReveal y={30} blur={10} delay={0.12}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1200px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
            transition:
              spotlight.opacity > 0
                ? 'transform 0.16s cubic-bezier(0.2, 0, 0.2, 1), border-color 0.35s ease, box-shadow 0.35s ease'
                : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease',
            transformStyle: 'preserve-3d',
          }}
          className="group relative overflow-hidden rounded-3xl cyber-panel-hud border border-white/[0.12] hover:border-cyan-400/40 p-7 sm:p-10 lg:p-12 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_26px_60px_-18px_rgba(0,0,0,0.8)]"
        >
          {/* Specular Top Neon Rim */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F5FF]/60 via-50% to-purple-500/60 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Dynamic Holographic Cursor Spotlight */}
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(560px circle at ${spotlight.x}px ${spotlight.y}px, rgba(0, 245, 255, 0.14), rgba(139, 92, 246, 0.08) 45%, transparent 70%)`,
            }}
          />

          {/* Subtle Holographic Sweep Shimmer on Hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-20 animate-shimmer transition-opacity duration-500 z-0" />

          {/* Corner HUD Brackets */}
          <span className="pointer-events-none absolute top-3.5 left-3.5 text-xs font-mono text-white/25 group-hover:text-[#00F5FF]/75 transition-colors select-none z-10">
            ⌜
          </span>
          <span className="pointer-events-none absolute top-3.5 right-3.5 text-xs font-mono text-white/25 group-hover:text-purple-400/75 transition-colors select-none z-10">
            ⌝
          </span>
          <span className="pointer-events-none absolute bottom-3.5 left-3.5 text-xs font-mono text-white/25 group-hover:text-[#00F5FF]/75 transition-colors select-none z-10">
            ⌞
          </span>
          <span className="pointer-events-none absolute bottom-3.5 right-3.5 text-xs font-mono text-white/25 group-hover:text-purple-400/75 transition-colors select-none z-10">
            ⌟
          </span>

          {/* Card Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* LEFT COLUMN: Document Icon, Identity & Metadata */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {/* Document Status Pill */}
                {hasCV ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 font-mono text-[11px] tracking-wider text-emerald-300 uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>DOCUMENT VERIFIED &bull; READY</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/35 font-mono text-[11px] tracking-wider text-amber-300 uppercase">
                    <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>CV COMING SOON</span>
                  </span>
                )}

                <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 font-mono text-[10px] tracking-widest text-purple-200 uppercase">
                  {CV_CONFIG.edition}
                </span>
              </div>

              {/* Minimal Holographic Document Header */}
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#00F5FF]/20 via-slate-900/90 to-purple-500/25 border border-cyan-400/35 group-hover:border-cyan-300/70 flex items-center justify-center shadow-[0_0_25px_rgba(0,245,255,0.18)] group-hover:shadow-[0_0_32px_rgba(139,92,246,0.3)] transition-all duration-300">
                    <FileText className="w-8 h-8 sm:w-9 sm:h-9 text-[#00F5FF] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-[#08090d] border border-purple-400/45 font-mono text-[9px] font-semibold text-purple-200 tracking-widest shadow-md">
                    PDF
                  </span>
                </div>

                <div>
                  <h3 className="font-space font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                    Sotheavan Pich &bull; Resume
                  </h3>
                  <p className="font-inter text-sm sm:text-base text-zinc-200 leading-relaxed mt-2 max-w-xl">
                    {hasCV
                      ? 'Official printable PDF curriculum vitae detailing technical skills, project builds, and academic achievements.'
                      : 'Official PDF curriculum vitae is currently being prepared. Once uploaded, you will be able to preview and download it directly from this vault.'}
                  </p>
                </div>
              </div>

              {/* Metadata Specification Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="px-4 py-3 rounded-xl bg-[#060911]/75 border border-white/[0.08]">
                  <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                    DOCUMENT STATUS
                  </div>
                  <div
                    className={`text-xs font-mono font-semibold mt-1 ${
                      hasCV ? 'text-emerald-400' : 'text-amber-300'
                    }`}
                  >
                    {hasCV ? 'AVAILABLE' : 'DOCUMENT NOT AVAILABLE'}
                  </div>
                </div>

                <div className="px-4 py-3 rounded-xl bg-[#060911]/75 border border-white/[0.08]">
                  <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                    FILE FORMAT
                  </div>
                  <div className="text-xs font-mono font-semibold text-[#00F5FF] mt-1">
                    {CV_CONFIG.format} (Portable Document)
                  </div>
                </div>

                <div className="px-4 py-3 rounded-xl bg-[#060911]/75 border border-white/[0.08]">
                  <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                    {hasCV && CV_CONFIG.fileSize ? 'FILE SIZE' : 'FILENAME TARGET'}
                  </div>
                  <div className="text-xs font-mono font-medium text-zinc-200 mt-1 truncate">
                    {hasCV && CV_CONFIG.fileSize ? CV_CONFIG.fileSize : CV_CONFIG.fileName}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Dedicated Upload / Download Vault Area */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#060911]/80 border border-white/[0.1] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono pb-3 border-b border-white/[0.08]">
                  <span className="text-cyan-300 tracking-wider uppercase flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-purple-400" />
                    <span>PDF VAULT INTERFACE</span>
                  </span>
                  <span className="text-zinc-300">
                    {hasCV ? 'UNLOCKED' : 'STANDBY'}
                  </span>
                </div>

                {/* Upload Dropzone Placeholder (Disabled cleanly until real CV file is integrated) */}
                <div
                  aria-disabled={!hasCV}
                  className={`rounded-xl border border-dashed p-5 text-center transition-all ${
                    hasCV
                      ? 'border-emerald-400/40 bg-emerald-500/[0.05]'
                      : 'border-white/15 bg-white/[0.02] opacity-75 cursor-not-allowed'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div className="font-mono text-xs text-white font-medium">
                    {hasCV ? CV_CONFIG.fileName : 'PDF Document Slot Reserved'}
                  </div>
                  <div className="font-inter text-xs text-zinc-300 mt-1">
                    {hasCV
                      ? 'Ready for instant view or download'
                      : 'No PDF uploaded yet • Supports .pdf format'}
                  </div>
                </div>

                {/* Disabled Download & Upload Actions (until real fileUrl is provided) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hasCV ? (
                    <a
                      href={CV_CONFIG.fileUrl}
                      download={CV_CONFIG.fileName}
                      onClick={() => cyberAudio.playClick()}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00F5FF] to-cyan-300 hover:brightness-110 text-slate-950 font-mono text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,245,255,0.3)] transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      title="Document not available yet"
                      className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 font-mono text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 opacity-50 cursor-not-allowed select-none"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  )}

                  {hasCV ? (
                    <a
                      href={CV_CONFIG.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => cyberAudio.playClick()}
                      className="w-full py-3 px-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-200 hover:text-white font-mono text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Preview PDF</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      title="Upload disabled until CV integration"
                      className="w-full py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 font-mono text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 opacity-50 cursor-not-allowed select-none"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload PDF</span>
                    </button>
                  )}
                </div>

                {/* Authentic Working Alternative CTA: Request via Contact */}
                {!hasCV && (
                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-zinc-300">
                      Need a copy directly?
                    </span>
                    <button
                      type="button"
                      onClick={() => navigateWithGlitch('#contact', 'CONTACT TERMINAL')}
                      onMouseEnter={() => cyberAudio.playHover()}
                      data-cursor="CONTACT"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00F5FF] hover:text-white transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Request via Contact</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
