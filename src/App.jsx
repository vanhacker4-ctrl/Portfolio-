import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CyberScrollyCanvas from './components/CyberScrollyCanvas';
import HeroSection from './components/HeroSection';
import AboutHoloCard from './components/AboutHoloCard';
import SkillsMatrix from './components/SkillsMatrix';
import CurrentlyExploring from './components/CurrentlyExploring';
import ProjectsSection from './components/ProjectsSection';
import TimelineSection from './components/TimelineSection';
import CVSection from './components/CVSection';
import CyberFooter from './components/CyberFooter';
import CustomCursor from './components/CustomCursor';
import CyberGlitchTransition, { CyberSectionReveal } from './components/CyberGlitchTransition';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [heroRevealed, setHeroRevealed] = useState(false);

  // Calculate normalized scroll progress [0, 1] across the entire document
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);

      // Determine active section for nav highlighting (bottom-clamp for shorter Footer section)
      const isAtBottom =
        docHeight > 0 && scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 48;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const sections = ['hero', 'about', 'skills', 'exploring', 'projects', 'timeline', 'cv', 'contact'];
      for (let secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090d] text-[#F3F4F6] selection:bg-[#00F5FF]/20 selection:text-[#00F5FF] overflow-x-hidden antialiased">
      {/* Background Cinematic Scrollytelling Canvas */}
      <CyberScrollyCanvas
        scrollProgress={scrollProgress}
        revealActive={true}
        suppressPreloader={true}
        onLoaded={() => setHeroRevealed(true)}
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
        onSectionSwitch={setActiveSection}
      />

      {/* Minimalist Luxury Navigation Header */}
      <Navbar
        activeSection={activeSection}
      />

      {/* Editorial Content Flow */}
      <main className="relative z-10">
        <CyberSectionReveal id="hero">
          <HeroSection scrollProgress={scrollProgress} isRevealed={true} />
        </CyberSectionReveal>
        <CyberSectionReveal id="about">
          <AboutHoloCard />
        </CyberSectionReveal>
        <CyberSectionReveal id="skills">
          <SkillsMatrix />
        </CyberSectionReveal>
        <CyberSectionReveal id="exploring">
          <CurrentlyExploring />
        </CyberSectionReveal>
        <CyberSectionReveal id="projects">
          <ProjectsSection />
        </CyberSectionReveal>
        <CyberSectionReveal id="timeline">
          <TimelineSection />
        </CyberSectionReveal>
        <CyberSectionReveal id="cv">
          <CVSection />
        </CyberSectionReveal>
      </main>

      {/* Editorial Footer */}
      <CyberSectionReveal id="contact">
        <CyberFooter />
      </CyberSectionReveal>
    </div>
  );
}
