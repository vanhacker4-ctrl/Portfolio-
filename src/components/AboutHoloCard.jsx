import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, RefreshCw, GraduationCap, Award, BookOpen, Compass, X, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { ScrollReveal, ScrollDivider } from './ScrollReveal';

export default function AboutHoloCard() {
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [diagStep, setDiagStep] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const runDiagnostics = () => {
    if (diagnosticsRunning) return;
    cyberAudio.playClick();
    setDiagnosticsRunning(true);
    setDiagStep(1);

    setTimeout(() => {
      cyberAudio.playHover();
      setDiagStep(2);
    }, 500);

    setTimeout(() => {
      cyberAudio.playHover();
      setDiagStep(3);
    }, 1100);

    setTimeout(() => {
      cyberAudio.playChime();
      setDiagStep(4);
      setDiagnosticsRunning(false);
    }, 1800);
  };

  return (
    <section id="about" className="relative py-28 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Subtle Atmospheric Glow */}
      <div className="ambient-glow bg-[#00F5FF] -top-10 -left-28 opacity-10" />
      <div className="ambient-glow bg-[#8B5CF6] bottom-10 -right-28 opacity-10" />

      {/* Section Header */}
      <div className="relative pb-7 mb-16">
        <ScrollReveal y={16} blur={6} delay={0}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#00F5FF] tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse shadow-[0_0_8px_#00F5FF]" />
                [ ABOUT ME ]
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-xs font-mono text-zinc-200 tracking-wider uppercase">
                Personal Background &amp; Mindset
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] font-mono text-[10px] tracking-widest text-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>DOSSIER_ID: SOTHEAVAN_02</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal y={26} blur={10} delay={0.1}>
          <h2 className="font-space font-light text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.04]">
            Driven by curiosity. <br />
            <span className="font-normal italic bg-gradient-to-r from-white via-[#00F5FF] to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,245,255,0.22)]">
              Grounded in code.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollDivider className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#00F5FF]/40 via-white/[0.08] to-transparent" delay={0.16} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Authentic Holographic Identity Dossier */}
        <ScrollReveal className="lg:col-span-5" y={30} blur={10} delay={0.12}>
          <div className="cyber-panel-hud p-7 sm:p-8 rounded-2xl relative overflow-hidden group/card border border-white/[0.09] hover:border-cyan-400/35 transition-colors duration-500">
            {/* Top Neon Edge Highlight */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F5FF]/55 to-transparent" />

            {/* Subtle Dot-Matrix Texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-screen"
              style={{
                backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.35) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />

            {/* Corner HUD Brackets */}
            <span className="pointer-events-none absolute top-2.5 left-2.5 text-[10px] font-mono text-cyan-400/40 select-none z-10">⌜</span>
            <span className="pointer-events-none absolute top-2.5 right-2.5 text-[10px] font-mono text-cyan-400/40 select-none z-10">⌝</span>
            <span className="pointer-events-none absolute bottom-2.5 left-2.5 text-[10px] font-mono text-cyan-400/40 select-none z-10">⌞</span>
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 text-[10px] font-mono text-cyan-400/40 select-none z-10">⌟</span>

            {/* Subtle glow orb */}
            <div className="ambient-glow bg-[#00F5FF] -top-28 -left-28 opacity-15" />

            <div className="relative z-10">
              {/* Top Dossier Telemetry Header */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300 pb-4 mb-5 border-b border-white/[0.06]">
                <span className="tracking-widest text-cyan-400/90">IDENTITY DOSSIER</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-400/25 text-emerald-400 tracking-wider">
                  ACTIVE RECORD
                </span>
              </div>

              {/* Official Academic & Developer Portrait Frame */}
              <div className="relative mb-6 rounded-2xl overflow-hidden border border-white/[0.12] bg-[#070b14] group/portrait shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
                {/* Top Corner Neon Accents */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F5FF]/60 to-transparent z-10" />
                
                {/* Portrait Image Container */}
                <div
                  className="relative h-64 sm:h-72 w-full overflow-hidden cursor-pointer"
                  onClick={() => {
                    cyberAudio.playClick();
                    setShowPhotoModal(true);
                  }}
                  onMouseEnter={() => cyberAudio.playHover()}
                  title="Click to enlarge portrait"
                  data-cursor="EXPAND"
                >
                  <img
                    src="/images/sotheavan-portrait.jpg"
                    alt="Sotheavan Pich - Second-Year Programming Student"
                    className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover/portrait:scale-105 transition-transform duration-700"
                  />

                  {/* Dark Cyber Vignette & Bottom Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018] via-[#0c1018]/25 to-transparent opacity-90 pointer-events-none" />
                  
                  {/* Holographic Scanline Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-20" />
                  <div className="pointer-events-none absolute inset-0 animate-shimmer opacity-25" />

                  {/* Top HUD Telemetry Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono pointer-events-none z-10">
                    <span className="px-2.5 py-1 rounded-md bg-[#05080f]/85 border border-cyan-400/40 text-cyan-300 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-[#00F5FF]" />
                      <span>SCHOLAR_ID &bull; SP-2026</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#05080f]/85 border border-emerald-400/40 text-emerald-400 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>VERIFIED DOSSIER</span>
                    </span>
                  </div>

                  {/* Bottom Portrait HUD Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <div className="font-mono text-[10px] text-zinc-300">
                      <span className="text-[#00F5FF] font-semibold">ACADEMIC &amp; DEV PROFILE</span>
                    </div>
                    <div className="pointer-events-auto flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-400/15 border border-cyan-400/30 text-[9px] font-mono text-cyan-200 group-hover/portrait:bg-cyan-400/30 group-hover/portrait:text-white transition-all">
                      <Maximize2 className="w-2.5 h-2.5" />
                      <span>EXPAND</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Futuristic Avatar Holographic Frame */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-white/[0.08]">
                <div className="relative group/avatar cursor-pointer" onMouseEnter={() => cyberAudio.playHover()}>
                  {/* Outer animated glowing border */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00F5FF] via-purple-500 to-[#00F5FF] p-[2px] shadow-[0_0_24px_rgba(0,245,255,0.3)] group-hover/avatar:shadow-[0_0_34px_rgba(0,245,255,0.6)] group-hover/avatar:scale-105 transition-all duration-300">
                    <div className="w-full h-full rounded-[14px] bg-[#060b0e] flex items-center justify-center relative overflow-hidden">
                      {/* Avatar High-Tech Monogram */}
                      <div className="font-mono font-bold text-xs text-white tracking-wider flex items-center justify-center gap-0.5">
                        <span className="text-[#00F5FF]">&lt;</span>
                        <span className="text-zinc-100 font-space font-semibold text-sm">PRO</span>
                        <span className="text-purple-400">&gt;</span>
                      </div>
                      {/* Animated Scanline Shimmer */}
                      <div className="absolute inset-0 animate-shimmer" />
                    </div>
                  </div>
                  {/* Active Status Badge */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#060b0e] flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                  </div>
                </div>

                <div>
                  <div className="font-space font-bold text-lg text-white tracking-tight">
                    Sotheavan Pich
                  </div>
                  <div className="text-xs font-mono text-[#00F5FF] mt-0.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Second-Year Student &amp; Developer</span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-200 mt-1 flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Merit Scholarship Recipient</span>
                  </div>
                </div>
              </div>

              {/* Verified Student Details */}
              <div className="space-y-1.5 text-xs font-inter mb-7">
                {[
                  { label: 'ACADEMIC STATUS', value: 'Year 2 Programming' },
                  { label: 'RECOGNITION', value: 'Merit Scholarship Recipient' },
                  { label: 'CORE INTERESTS', value: 'Full-Stack & Applied AI' },
                  { label: 'LEARNING METHOD', value: 'Hands-on Project Building' },
                  { label: 'PHILOSOPHY', value: 'Curiosity & Continuous Growth' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center py-2 px-2.5 rounded-lg border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="text-zinc-300 font-mono text-[11px]">{row.label}</span>
                    <span className="text-zinc-200 font-medium text-right">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Learning Status Checker (Futuristic Neon Console Button) */}
              <div className="pt-1">
                <button
                  onClick={runDiagnostics}
                  disabled={diagnosticsRunning}
                  onMouseEnter={() => cyberAudio.playHover()}
                  data-cursor="SCAN"
                  className="group relative overflow-hidden w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400/15 via-cyan-500/10 to-purple-500/15 hover:from-cyan-400/25 hover:to-purple-500/25 border border-cyan-400/40 hover:border-cyan-300 text-cyan-200 hover:text-white font-mono text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,245,255,0.14)] hover:shadow-[0_0_28px_rgba(0,245,255,0.32)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity" />
                  <RefreshCw className={`relative z-10 w-3.5 h-3.5 text-[#00F5FF] ${diagnosticsRunning ? 'animate-spin' : ''}`} />
                  <span className="relative z-10">
                    {diagnosticsRunning ? 'Verifying Learning Stack...' : 'Check Learning Stack Status'}
                  </span>
                </button>

                {diagStep > 0 && (
                  <div className="mt-4 p-4 rounded-xl bg-[#05080d]/90 border border-cyan-400/25 font-mono text-xs space-y-2 shadow-[inset_0_0_20px_rgba(0,245,255,0.06)] animate-fadeIn">
                    <div className="text-[10px] text-cyan-400/70 pb-1.5 border-b border-white/[0.06]">
                      &gt; TELEMETRY_READOUT
                    </div>
                    <div className="text-zinc-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5FF] shrink-0" />
                      <span>Full-stack foundations (React / TS / Node): ACTIVE</span>
                    </div>
                    {diagStep >= 2 && (
                      <div className="text-zinc-300 flex items-center gap-2 animate-fadeIn">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                        <span>Systems &amp; Logic (Python &amp; C): IN PRACTICE</span>
                      </div>
                    )}
                    {diagStep >= 3 && (
                      <div className="text-zinc-300 flex items-center gap-2 animate-fadeIn">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>AI Automation &amp; Prompt Engineering: EXPERIMENTING</span>
                      </div>
                    )}
                    {diagStep >= 4 && (
                      <div className="text-[#00F5FF] text-[11px] pt-1.5 border-t border-white/[0.06] animate-fadeIn">
                        Status: Continuous learning pipeline operational
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Authentic Editorial Narrative + Vertical Luminous Spine */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-6 text-zinc-100 font-inter text-base sm:text-lg leading-relaxed font-normal">
            {/* Vertical Gradient Accent Line */}
            <div className="absolute -left-[1px] top-0 h-32 w-[2px] bg-gradient-to-b from-[#00F5FF] via-purple-500 to-transparent shadow-[0_0_12px_rgba(0,245,255,0.5)]" />

            <ScrollReveal y={22} blur={8} delay={0.14}>
              <div className="relative">
                <span className="hidden sm:block absolute -left-12 top-1.5 font-mono text-[10px] text-cyan-400/50">01</span>
                <p>
                  I am a second-year programming student and scholarship recipient with an insatiable appetite 
                  for software development and emerging technology. For me, coding is more than completing 
                  assignments—it is an active research pursuit where curiosity turns into working digital products.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal y={22} blur={8} delay={0.22}>
              <div className="relative">
                <span className="hidden sm:block absolute -left-12 top-1.5 font-mono text-[10px] text-purple-400/50">02</span>
                <p>
                  I pay close attention to the rapid evolution of technology and developer trends, with a dedicated 
                  focus on Artificial Intelligence and AI-powered solutions. Whether I'm building responsive 
                  user interfaces in React and TypeScript, developing backend services in Node.js and Python, 
                  or designing automated AI workflows, I believe that building practical projects is the most 
                  effective way to master modern engineering.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal y={22} blur={8} delay={0.30}>
              <div className="relative">
                <span className="hidden sm:block absolute -left-12 top-1.5 font-mono text-[10px] text-emerald-400/50">03</span>
                <p>
                  I enjoy testing new developer tools, exploring unconventional ideas, and tackling challenging 
                  problems. My goal is to continually sharpen my fundamentals, expand my technical horizons, 
                  and build software that delivers genuine value.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Three Authentic Pillars with Cyber HUD Pods & Staggered Reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
            <ScrollReveal y={28} blur={10} delay={0.16} className="h-full">
              <div
                onMouseEnter={() => cyberAudio.playHover()}
                className="h-full cyber-panel-hud p-6 rounded-2xl border border-white/[0.08] hover:border-[#00F5FF]/50 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(0,0,0,0.6),0_0_28px_rgba(0,245,255,0.16)] transition-all duration-300 relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F5FF]/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-2.5 right-2.5 text-[10px] font-mono text-white/15 group-hover:text-[#00F5FF]/70 transition-colors">⌝</span>

                <div className="w-9 h-9 rounded-xl bg-[#00F5FF]/10 border border-[#00F5FF]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,245,255,0.15)]">
                  <Compass className="w-4 h-4 text-[#00F5FF]" />
                </div>

                <div className="text-[10px] font-mono text-[#00F5FF] tracking-widest mb-1.5">
                  RESEARCH &amp; EXPLORATION
                </div>
                <h3 className="font-space font-semibold text-white text-base mb-2 group-hover:text-[#00F5FF] transition-colors">
                  Curious Exploration
                </h3>
                <p className="text-xs font-inter text-zinc-200 leading-relaxed">
                  Actively following technology trends, reading developer documentation, and experimenting with new paradigms.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal y={28} blur={10} delay={0.26} className="h-full">
              <div
                onMouseEnter={() => cyberAudio.playHover()}
                className="h-full cyber-panel-hud p-6 rounded-2xl border border-white/[0.08] hover:border-[#8B5CF6]/50 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(0,0,0,0.6),0_0_28px_rgba(139,92,246,0.16)] transition-all duration-300 relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-2.5 right-2.5 text-[10px] font-mono text-white/15 group-hover:text-[#8B5CF6]/70 transition-colors">⌝</span>

                <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                  <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
                </div>

                <div className="text-[10px] font-mono text-[#8B5CF6] tracking-widest mb-1.5">
                  FULL-STACK CRAFT
                </div>
                <h3 className="font-space font-semibold text-white text-base mb-2 group-hover:text-[#8B5CF6] transition-colors">
                  Full-Stack Craft
                </h3>
                <p className="text-xs font-inter text-zinc-200 leading-relaxed">
                  Writing clean, structured code across frontend interfaces and backend endpoints with a focus on usability.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal y={28} blur={10} delay={0.36} className="h-full">
              <div
                onMouseEnter={() => cyberAudio.playHover()}
                className="h-full cyber-panel-hud p-6 rounded-2xl border border-white/[0.08] hover:border-emerald-400/50 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(0,0,0,0.6),0_0_28px_rgba(52,211,153,0.16)] transition-all duration-300 relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-2.5 right-2.5 text-[10px] font-mono text-white/15 group-hover:text-emerald-400/70 transition-colors">⌝</span>

                <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="text-[10px] font-mono text-emerald-400 tracking-widest mb-1.5">
                  AI ADAPTATION
                </div>
                <h3 className="font-space font-semibold text-white text-base mb-2 group-hover:text-emerald-400 transition-colors">
                  Applied AI Tools
                </h3>
                <p className="text-xs font-inter text-zinc-200 leading-relaxed">
                  Integrating AI automation, prompt engineering, and intelligent APIs into practical development workflows.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* High-Resolution Portrait Lightbox Modal */}
      {showPhotoModal &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            onClick={() => {
              cyberAudio.playClick();
              setShowPhotoModal(false);
            }}
            className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-2xl bg-[#0c1018] border border-cyan-400/40 p-3.5 shadow-[0_0_60px_rgba(0,245,255,0.25)] animate-modal-pop"
            >
              <div className="flex items-center justify-between px-2 pb-3 mb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                  <span className="font-mono text-xs text-cyan-300 tracking-wider">
                    SOTHEAVAN PICH &bull; OFFICIAL PORTRAIT
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playClick();
                    setShowPhotoModal(false);
                  }}
                  aria-label="Close preview"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden bg-[#060911] border border-white/10 max-h-[75vh] flex items-center justify-center relative group">
                <img
                  src="/images/sotheavan-portrait.jpg"
                  alt="Sotheavan Pich Portrait"
                  className="w-full h-auto max-h-[72vh] object-contain"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-15" />
              </div>

              <div className="mt-3 px-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
                <span>SECOND-YEAR PROGRAMMING STUDENT</span>
                <span className="text-emerald-400">MERIT SCHOLARSHIP RECIPIENT</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
