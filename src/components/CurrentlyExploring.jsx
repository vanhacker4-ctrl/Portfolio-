import React, { useRef, useState } from 'react';
import {
  Sparkles,
  BrainCircuit,
  Cpu,
  Globe2,
  Layers,
  Wrench,
  Rocket,
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { ScrollReveal, ScrollDivider } from './ScrollReveal';

/* =========================================================================
   3D PERSPECTIVE TILT CARD COMPONENT
   ========================================================================= */

function TiltExploreCard({ children, accent = '#00F5FF', className = '' }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const rafRef = useRef(0);

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
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(380px circle at ${x.toFixed(0)}px ${y.toFixed(0)}px, ${accent}24, transparent 65%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
    }
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => cyberAudio.playHover()}
      style={{
        transition:
          'transform 0.18s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.35s ease, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`h-full relative overflow-hidden cyber-panel-hud p-7 sm:p-8 rounded-2xl flex flex-col justify-between group border border-white/[0.09] hover:border-cyan-400/40 hover:shadow-[0_22px_50px_rgba(0,0,0,0.65),0_0_32px_rgba(0,245,255,0.14)] cursor-default ${className}`}
    >
      {/* Top Specular Accent Rim */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity z-10"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
        }}
      />

      {/* Dynamic Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0 opacity-0"
      />

      {/* Cyberpunk HUD Corner Brackets */}
      <span className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-cyan-400/25 group-hover:border-[#00F5FF]/75 transition-colors select-none pointer-events-none z-10" aria-hidden="true" />
      <span className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-cyan-400/25 group-hover:border-[#00F5FF]/75 transition-colors select-none pointer-events-none z-10" aria-hidden="true" />
      <span className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-cyan-400/25 group-hover:border-[#00F5FF]/75 transition-colors select-none pointer-events-none z-10" aria-hidden="true" />
      <span className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-cyan-400/25 group-hover:border-[#00F5FF]/75 transition-colors select-none pointer-events-none z-10" aria-hidden="true" />

      <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
    </div>
  );
}

export default function CurrentlyExploring() {
  const explorationTopics = [
    {
      id: 'ai',
      index: '01',
      title: 'Artificial Intelligence',
      status: 'Active Study',
      accent: '#00F5FF',
      icon: Sparkles,
      description:
        'Investigating modern generative AI capabilities, LLM reasoning patterns, and the principles behind AI-assisted software development.',
      focusAreas: ['Generative Reasoning', 'Context Orchestration', 'Model Evaluation'],
    },
    {
      id: 'ml',
      index: '02',
      title: 'Machine Learning',
      status: 'Foundational Research',
      accent: '#8B5CF6',
      icon: BrainCircuit,
      description:
        'Studying mathematical and algorithmic fundamentals of machine learning, neural architectures, and data transformation pipelines.',
      focusAreas: ['Supervised Learning', 'Feature Engineering', 'Model Foundations'],
    },
    {
      id: 'automation',
      index: '03',
      title: 'AI Automation',
      status: 'Hands-on Experiments',
      accent: '#00F5FF',
      icon: Cpu,
      description:
        'Building automation scripts, multi-step prompt pipelines, and integrated tools to streamline repetitive engineering tasks.',
      focusAreas: ['Prompt Pipelines', 'Workflow Orchestration', 'Script Automation'],
    },
    {
      id: 'web',
      index: '04',
      title: 'Modern Web Technologies',
      status: 'Ongoing Practice',
      accent: '#8B5CF6',
      icon: Globe2,
      description:
        'Exploring modern web standards, React patterns, performant state management, and browser APIs.',
      focusAreas: ['React Ecosystem', 'Component Architectures', 'Web Performance'],
    },
    {
      id: 'architecture',
      index: '05',
      title: 'Software Architecture',
      status: 'Conceptual Study',
      accent: '#00F5FF',
      icon: Layers,
      description:
        'Deepening understanding of clean code conventions, scalable system design, modular service boundaries, and maintainable software patterns.',
      focusAreas: ['Modular Design', 'API Paradigms', 'Clean Code Principles'],
    },
    {
      id: 'tools',
      index: '06',
      title: 'Emerging Developer Tools',
      status: 'Tool Evaluation',
      accent: '#8B5CF6',
      icon: Wrench,
      description:
        'Actively testing contemporary developer utilities, modern compilers, runtime environments, containerization, and developer productivity workflows.',
      focusAreas: ['Modern CLI Tooling', 'Containerization', 'Developer Productivity'],
    },
    {
      id: 'products',
      index: '07',
      title: 'Innovative Digital Products',
      status: 'Product Analysis',
      accent: '#10B981',
      icon: Rocket,
      description:
        'Analyzing user experience design, intuitive human-computer interfaces, and high-impact digital tools that solve meaningful daily problems.',
      focusAreas: ['UX Systems', 'Product Design', 'Interface Craft'],
    },
  ];

  return (
    <section id="exploring" className="relative py-28 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Background Subtle Accent Glow */}
      <div className="ambient-glow bg-[#8B5CF6] -top-20 -right-20 opacity-12" />
      <div className="ambient-glow bg-[#10B981] bottom-0 -left-24 opacity-10" />

      {/* Section Header */}
      <div className="relative pb-7 mb-16">
        <ScrollReveal y={16} blur={6} delay={0}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#00F5FF] tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse shadow-[0_0_8px_#00F5FF]" />
                [ CURRENTLY EXPLORING ]
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-xs font-mono text-zinc-300 tracking-wide">
                Active Learning Tracks
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] font-mono text-[10px] tracking-wider text-zinc-200">
              <span className="text-[#00F5FF]">7</span>
              <span>Active Tracks</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal y={26} blur={10} delay={0.1}>
          <h2 className="font-space font-light text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.04]">
            Currently exploring. <br />
            <span className="font-normal italic bg-gradient-to-r from-white via-purple-300 to-[#00F5FF] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(139,92,246,0.22)]">
              Active learning topics.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal y={20} blur={8} delay={0.18}>
          <p className="font-inter text-sm sm:text-base text-zinc-200 mt-4 max-w-2xl font-normal leading-relaxed">
            Engineering disciplines, design paradigms, and emerging tools I am actively researching, testing, and applying in practical projects.
          </p>
        </ScrollReveal>
        <ScrollDivider className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#8B5CF6]/45 via-white/[0.08] to-transparent" delay={0.16} />
      </div>

      {/* Asymmetric Bento Grid of Interests (First 6 in 3-col grid, Item 07 as wide Featured Horizon Banner) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {explorationTopics.map((topic, idx) => {
          const Icon = topic.icon;
          const isWideFeature = idx === explorationTopics.length - 1;

          if (isWideFeature) {
            return (
              <ScrollReveal
                key={topic.id}
                className="md:col-span-2 lg:col-span-3"
                y={30}
                blur={10}
                delay={0.12}
              >
                <TiltExploreCard accent={topic.accent}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[11px] font-mono text-zinc-300 tracking-wider">
                          [ ACTIVE TRACK ]
                        </span>
                        <span
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]"
                          style={{ color: topic.accent, borderColor: `${topic.accent}40` }}
                        >
                          {topic.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-11 h-11 rounded-xl bg-white/[0.04] border flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner"
                          style={{
                            borderColor: `${topic.accent}45`,
                            boxShadow: `0 0 18px ${topic.accent}22`,
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: topic.accent }} />
                        </div>
                        <h3 className="font-space font-semibold text-2xl sm:text-3xl text-white group-hover:text-emerald-300 transition-colors leading-snug">
                          {topic.title}
                        </h3>
                      </div>

                      <p className="font-inter text-sm text-zinc-200 leading-relaxed max-w-2xl font-normal">
                        {topic.description}
                      </p>
                    </div>

                    <div className="lg:col-span-5 p-5 rounded-2xl bg-[#05080d]/70 border border-white/[0.07]">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300 uppercase tracking-wider mb-3 pb-2 border-b border-white/[0.06]">
                        <span>Areas of Focus</span>
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Active
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {topic.focusAreas.map((area) => (
                          <span
                            key={area}
                            className="text-xs font-mono text-zinc-300 bg-white/[0.04] hover:text-white hover:bg-emerald-400/15 hover:border-emerald-400/40 px-3 py-1.5 rounded-lg border border-white/[0.06] transition-all"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltExploreCard>
              </ScrollReveal>
            );
          }

          return (
            <ScrollReveal
              key={topic.id}
              className="h-full"
              y={30}
              blur={10}
              delay={(idx % 3) * 0.1}
            >
              <TiltExploreCard accent={topic.accent}>
                <div>
                  {/* Meta Row */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                    <span className="text-[11px] font-mono text-zinc-300 tracking-wider">
                      [ ACTIVE TRACK ]
                    </span>
                    <span
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]"
                      style={{ color: topic.accent, borderColor: `${topic.accent}35` }}
                    >
                      {topic.status}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl bg-white/[0.04] border flex items-center justify-center group-hover:scale-110 transition-all shadow-inner shrink-0"
                      style={{
                        borderColor: `${topic.accent}40`,
                        boxShadow: `0 0 16px ${topic.accent}18`,
                      }}
                    >
                      <Icon className="w-4 h-4 transition-colors" style={{ color: topic.accent }} />
                    </div>
                    <h3 className="font-space font-semibold text-xl text-white group-hover:text-[#00F5FF] transition-colors leading-snug">
                      {topic.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-inter text-xs text-zinc-200 leading-relaxed mb-6 font-normal">
                    {topic.description}
                  </p>
                </div>

                {/* Focus tags */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Areas of Focus
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="text-[10px] font-mono text-zinc-300 bg-white/[0.04] hover:text-white hover:border-cyan-400/35 px-2.5 py-1 rounded-md border border-white/[0.05] transition-all"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltExploreCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
