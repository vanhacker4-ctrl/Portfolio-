import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import CyberScrollyCanvas from './components/CyberScrollyCanvas';
import HeroSection from './components/HeroSection';
import CustomCursor from './components/CustomCursor';
import CyberGlitchTransition, { CyberSectionReveal } from './components/CyberGlitchTransition';

// Lazy-load below-the-fold sections so initial bundle parse/execution stays lean
const AboutHoloCard = lazy(() => import('./components/AboutHoloCard'));
const SkillsMatrix = lazy(() => import('./components/SkillsMatrix'));
const CurrentlyExploring = lazy(() => import('./components/CurrentlyExploring'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const TimelineSection = lazy(() => import('./components/TimelineSection'));
const CyberFooter = lazy(() => import('./components/CyberFooter'));

const SECTION_IDS = ['hero', 'about', 'skills', 'exploring', 'projects', 'timeline', 'contact'];

function SectionFallback({ minHeight = 'min-h-[60vh]' }) {
  return <div className={`${minHeight} w-full`} aria-hidden="true" />;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const activeSectionRef = useRef('hero');

  // Track active section via rAF-throttled listener; zero re-renders during scroll within a section
  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      rafId = 0;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      let nextSection = activeSectionRef.current;
      const isAtBottom =
        docHeight > 0 && scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 48;

      if (isAtBottom) {
        nextSection = 'contact';
      } else {
        const topThreshold = window.innerHeight * 0.45;
        const bottomThreshold = window.innerHeight * 0.2;
        for (let i = 0; i < SECTION_IDS.length; i++) {
          const secId = SECTION_IDS[i];
          const el = document.getElementById(secId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= topThreshold && rect.bottom >= bottomThreshold) {
              nextSection = secId;
              break;
            }
          }
        }
      }

      if (nextSection !== activeSectionRef.current) {
        activeSectionRef.current = nextSection;
        setActiveSection(nextSection);
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();

    // Warm up below-the-fold chunks during browser idle time so instant nav jumps never stall
    let idleHandle;
    let isIdleCallback = false;
    const warmChunks = () => {
      import('./components/AboutHoloCard');
      import('./components/SkillsMatrix');
      import('./components/CurrentlyExploring');
      import('./components/ProjectsSection');
      import('./components/TimelineSection');
      import('./components/CyberFooter');
    };

    if ('requestIdleCallback' in window) {
      isIdleCallback = true;
      idleHandle = window.requestIdleCallback(warmChunks, { timeout: 2000 });
    } else {
      idleHandle = window.setTimeout(warmChunks, 1200);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (isIdleCallback && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      } else {
        clearTimeout(idleHandle);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090d] text-[#F3F4F6] selection:bg-[#00F5FF]/20 selection:text-[#00F5FF] overflow-x-hidden antialiased">
      {/* Background Cinematic Scrollytelling Canvas */}
      <CyberScrollyCanvas
        revealActive={true}
        suppressPreloader={true}
      />

      {/* Subtle Ambient Lighting Grain, Architectural Cyber Grid & Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-black/40" />
      <div className="fixed inset-0 pointer-events-none z-[1] cyber-grid-overlay opacity-55 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_40%,black_30%,transparent_100%)]" />
      <div className="fixed inset-0 pointer-events-none z-[1] cyber-scanlines opacity-75" />

      {/* Elegant Minimal Cursor */}
      <CustomCursor />

      {/* Cyberpunk 2077 Glitch Page Transition */}
      <CyberGlitchTransition
        playOnMount={true}
        onSectionSwitch={(secId) => {
          activeSectionRef.current = secId;
          setActiveSection(secId);
        }}
      />

      {/* Minimalist Luxury Navigation Header */}
      <Navbar activeSection={activeSection} />

      {/* Editorial Content Flow */}
      <main className="relative z-10">
        <CyberSectionReveal id="hero">
          <HeroSection isRevealed={true} />
        </CyberSectionReveal>
        <CyberSectionReveal id="about" className="min-h-[60vh]">
          <Suspense fallback={<SectionFallback minHeight="min-h-[60vh]" />}>
            <AboutHoloCard />
          </Suspense>
        </CyberSectionReveal>
        <CyberSectionReveal id="skills" className="min-h-[70vh]">
          <Suspense fallback={<SectionFallback minHeight="min-h-[70vh]" />}>
            <SkillsMatrix />
          </Suspense>
        </CyberSectionReveal>
        <CyberSectionReveal id="exploring" className="min-h-[60vh]">
          <Suspense fallback={<SectionFallback minHeight="min-h-[60vh]" />}>
            <CurrentlyExploring />
          </Suspense>
        </CyberSectionReveal>
        <CyberSectionReveal id="projects" className="min-h-[75vh]">
          <Suspense fallback={<SectionFallback minHeight="min-h-[75vh]" />}>
            <ProjectsSection />
          </Suspense>
        </CyberSectionReveal>
        <CyberSectionReveal id="timeline" className="min-h-[65vh]">
          <Suspense fallback={<SectionFallback minHeight="min-h-[65vh]" />}>
            <TimelineSection />
          </Suspense>
        </CyberSectionReveal>
      </main>

      {/* Editorial Footer */}
      <CyberSectionReveal id="contact" className="min-h-[45vh]">
        <Suspense fallback={<SectionFallback minHeight="min-h-[45vh]" />}>
          <CyberFooter />
        </Suspense>
      </CyberSectionReveal>
    </div>
  );
}
