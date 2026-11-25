import React from 'react';
import { GraduationCap, Award, Code, Server, Sparkles, BookOpen, CheckCircle } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { ScrollReveal, ScrollDivider } from './ScrollReveal';

export default function TimelineSection() {
  const journeyMilestones = [
    {
      index: '01',
      period: 'Current Academic Focus',
      role: 'Programming Education and Foundations',
      category: 'Academic Journey',
      institution: 'Second-Year Computer Science Student',
      icon: GraduationCap,
      accent: '#00F5FF',
      current: true,
      description:
        'Engaged in comprehensive programming and computer science studies. Deepening understanding of algorithmic complexity, data structures, low-level memory management in C, and object-oriented architectures.',
      highlights: [
        'Second-year programming student building robust computer science fundamentals.',
        'Hands-on coursework spanning algorithmic problem solving and software systems.',
      ],
    },
    {
      index: '02',
      period: 'Academic Recognition',
      role: 'Scholarship Recipient',
      category: 'Honors and Achievement',
      institution: 'Academic Merit Scholarship',
      icon: Award,
      accent: '#8B5CF6',
      current: false,
      description:
        'Awarded a competitive scholarship in recognition of scholastic achievement, technical aptitude, and sustained commitment to excellence in computer science and software development.',
      highlights: [
        'Recognized for academic dedication and proactive learning initiative.',
        'Reinforces dedication to continuous technical growth and innovative research.',
      ],
    },
    {
      index: '03',
      period: 'Hands-on Practice',
      role: 'Personal Software Development Projects',
      category: 'Independent Development',
      institution: 'Self-Directed Engineering Projects',
      icon: Code,
      accent: '#00F5FF',
      current: false,
      description:
        'Designing, developing, and iterating on personal software projects from scratch. Translating conceptual ideas into clean, functional digital products with an emphasis on maintainability and usability.',
      highlights: [
        'Building full-stack web applications and interactive utility tools.',
        'Practicing end-to-end development cycles: planning, architecture, coding, and testing.',
      ],
    },
    {
      index: '04',
      period: 'Full-Stack Immersion',
      role: 'Frontend and Backend Development Practice',
      category: 'Technical Practice',
      institution: 'React, TypeScript, Node.js and Python Ecosystems',
      icon: Server,
      accent: '#8B5CF6',
      current: false,
      description:
        'Gaining intensive hands-on experience building responsive client interfaces with React and TypeScript, alongside constructing RESTful API endpoints and backend data services in Node.js and Python.',
      highlights: [
        'Developing modular, reusable component systems with high design fidelity.',
        'Structuring reliable backend routes, asynchronous pipelines, and data handling.',
      ],
    },
    {
      index: '05',
      period: 'Intelligent Systems',
      role: 'AI Automation Experiments',
      category: 'Applied Research',
      institution: 'Prompt Engineering and AI Workflow Integrations',
      icon: Sparkles,
      accent: '#00F5FF',
      current: false,
      description:
        'Conducting hands-on experiments with generative AI APIs, systematic prompt engineering frameworks, and automated multi-step workflows to streamline developer productivity and solve real tasks.',
      highlights: [
        'Designing automated scripts integrating language models for task orchestration.',
        'Evaluating modern AI tools and exploring practical integration patterns.',
      ],
    },
    {
      index: '06',
      period: 'Continuous Habit',
      role: 'Technology Research and Self-Learning',
      category: 'Continuous Learning',
      institution: 'Emerging Frameworks, Tools and Documentation',
      icon: BookOpen,
      accent: '#10B981',
      current: true,
      description:
        'Maintaining a daily habit of following developer trends, reading technical specifications, exploring open-source repositories, and testing emerging tools like Docker and modern bundlers.',
      highlights: [
        'Actively tracking industry advancements across the web and AI landscapes.',
        'Curiosity-driven mindset: regularly trying new frameworks to expand problem-solving breadth.',
      ],
    },
  ];

  return (
    <section id="timeline" className="relative py-28 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Background Ambient Glow */}
      <div className="ambient-glow bg-[#00F5FF] top-16 -right-24 opacity-10" />
      <div className="ambient-glow bg-[#8B5CF6] bottom-20 -left-24 opacity-10" />

      {/* Section Header */}
      <div className="relative pb-7 mb-16">
        <ScrollReveal y={16} blur={6} delay={0}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#00F5FF] tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse shadow-[0_0_8px_#00F5FF]" />
                [ LEARNING JOURNEY ]
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-xs font-mono text-zinc-300 tracking-wide">
                Academic and Engineering Milestones
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] font-mono text-[10px] tracking-wider text-zinc-200">
              <span className="text-[#00F5FF]">6</span>
              <span>Milestones</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal y={26} blur={10} delay={0.1}>
          <h2 className="font-space font-light text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.04]">
            Academic and <br />
            <span className="font-normal italic bg-gradient-to-r from-white via-purple-300 to-[#00F5FF] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,245,255,0.22)]">
              engineering journey.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal y={20} blur={8} delay={0.18}>
          <p className="font-inter text-sm sm:text-base text-zinc-200 mt-4 max-w-2xl font-normal leading-relaxed">
            A chronological overview of my computer science coursework, scholarship recognition, software projects, and ongoing technical learning.
          </p>
        </ScrollReveal>
        <ScrollDivider className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#00F5FF]/45 via-white/[0.08] to-transparent" delay={0.16} />
      </div>

      {/* Cybernetic Timeline with Vertical Luminous Spine */}
      <div className="relative pl-8 sm:pl-12 md:pl-16 space-y-6">
        {/* Continuous Vertical Spine */}
        <div
          className="pointer-events-none absolute left-3 sm:left-5 md:left-7 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#00F5FF]/70 via-[#8B5CF6]/50 to-emerald-400/20 shadow-[0_0_12px_rgba(0,245,255,0.25)]"
          aria-hidden="true"
        />

        {journeyMilestones.map((item, idx) => {
          const Icon = item.icon;
          return (
            <ScrollReveal
              key={item.index}
              y={26}
              blur={8}
              delay={Math.min(idx * 0.07, 0.21)}
            >
              <div className="relative group">
                {/* Node Beacon on Spine */}
                <div
                  className="absolute -left-[26px] sm:-left-[34px] md:-left-[42px] top-9 flex items-center justify-center z-10"
                  aria-hidden="true"
                >
                  {item.current && (
                    <span
                      className="absolute w-5 h-5 rounded-full animate-ping opacity-45"
                      style={{ backgroundColor: item.accent }}
                    />
                  )}
                  <span
                    className="relative w-3.5 h-3.5 rounded-full bg-[#060b0e] border-2 transition-transform duration-300 group-hover:scale-125"
                    style={{
                      borderColor: item.accent,
                      boxShadow: `0 0 12px ${item.accent}`,
                    }}
                  />
                </div>

                {/* Horizontal Trace Line connecting Spine to Card */}
                <div
                  className="hidden sm:block pointer-events-none absolute -left-[22px] md:-left-[28px] top-[42px] w-5 md:w-7 h-[1px] opacity-40 group-hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden="true"
                />

                {/* Milestone Cyber Card */}
                <div
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="relative overflow-hidden cyber-panel-hud p-6 sm:p-8 lg:p-9 rounded-2xl border border-white/[0.09] hover:border-cyan-400/40 hover:shadow-[0_22px_50px_rgba(0,0,0,0.65),0_0_28px_rgba(0,245,255,0.12)] transition-all duration-300"
                >
                  {/* Top Specular Edge */}
                  <div
                    className="pointer-events-none absolute top-0 inset-x-0 h-[1px] opacity-45 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${item.accent} 50%, transparent 100%)`,
                    }}
                  />

                  {/* Corner HUD Brackets */}
                  <span className="pointer-events-none absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/15 group-hover:border-cyan-400/70 transition-colors select-none" aria-hidden="true" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
                    {/* Period & Category */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.accent }}
                        />
                        <span
                          className="font-mono text-xs tracking-wide font-medium"
                          style={{ color: item.accent }}
                        >
                          {item.period}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-zinc-200">
                        {item.category}
                      </div>
                      {item.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[10px] font-mono text-emerald-300 mt-3 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Active Focus
                        </span>
                      )}
                    </div>

                    {/* Role & Context */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-3 mb-2">
                        <div
                          className="w-9 h-9 rounded-xl bg-white/[0.04] border flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                          style={{
                            borderColor: `${item.accent}40`,
                            boxShadow: `0 0 14px ${item.accent}18`,
                          }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.accent }} />
                        </div>
                        <div>
                          <h3 className="font-space font-semibold text-xl sm:text-2xl text-white group-hover:text-cyan-200 transition-colors leading-snug">
                            {item.role}
                          </h3>
                          <div className="text-xs font-inter text-zinc-200 font-normal mt-1">
                            {item.institution}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description & Impact */}
                    <div className="lg:col-span-5 space-y-3">
                      <p className="font-inter text-sm text-zinc-100 leading-relaxed font-normal">
                        {item.description}
                      </p>
                      <div className="space-y-1.5 pt-2.5 border-t border-white/[0.06]">
                        {item.highlights.map((h, hIdx) => (
                          <div
                            key={hIdx}
                            className="text-xs font-inter text-zinc-200 flex items-start gap-2"
                          >
                            <CheckCircle
                              className="w-3.5 h-3.5 mt-0.5 shrink-0"
                              style={{ color: item.accent }}
                            />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
