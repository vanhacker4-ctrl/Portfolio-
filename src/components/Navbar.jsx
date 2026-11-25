import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { navigateWithGlitch } from '../utils/cyberNavigation';

export default function Navbar({
  activeSection,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Exploring', href: '#exploring', id: 'exploring' },
    { label: 'Work', href: '#projects', id: 'projects' },
    { label: 'Journey', href: '#timeline', id: 'timeline' },
    { label: 'CV', href: '#cv', id: 'cv' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href, label = '') => {
    setMobileMenuOpen(false);
    navigateWithGlitch(href, label);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070b11]/85 backdrop-blur-2xl border-b border-cyan-400/15 shadow-[0_12px_36px_rgba(0,0,0,0.65)] py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Cyber Brand Identity */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          onMouseEnter={() => cyberAudio.playHover()}
          data-cursor="HOME"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5FF] opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F5FF] shadow-[0_0_12px_#00F5FF] group-hover:scale-125 transition-transform" />
          </span>
          <div>
            <div className="font-space font-semibold text-base tracking-tight text-white group-hover:text-[#00F5FF] transition-colors whitespace-nowrap flex items-center gap-2">
              <span>Developer Profile</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/25 text-[9px] font-mono text-cyan-300 tracking-widest">
                HUD
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-200 tracking-wider whitespace-nowrap">
              Full-Stack &amp; AI Explorer
            </div>
          </div>
        </a>

        {/* Minimal Floating Neon Noir Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#0a0f18]/80 border border-white/[0.09] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.45)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wide rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-400/[0.12] border-cyan-400/40 shadow-[0_0_18px_rgba(0,245,255,0.22)]'
                    : 'text-zinc-200 border-transparent hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Status & Futuristic CTA */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Status Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/[0.07] border border-emerald-400/20 text-[11px] font-mono text-emerald-300 whitespace-nowrap">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_8px_#10B981]" />
            </span>
            <span>Open for collaborations</span>
          </div>

          {/* Futuristic Neon Contact CTA Button */}
          <button
            onClick={() => handleNavClick('#contact')}
            onMouseEnter={() => cyberAudio.playHover()}
            data-cursor="CONTACT"
            className="group relative overflow-hidden hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold tracking-wider uppercase rounded-lg bg-gradient-to-r from-cyan-400/20 to-emerald-400/15 hover:from-cyan-400/30 hover:to-emerald-400/25 border border-cyan-400/55 hover:border-cyan-300 text-white shadow-[0_0_20px_rgba(0,245,255,0.18)] hover:shadow-[0_0_28px_rgba(0,245,255,0.4)] transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
          >
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity" />
            <span className="relative z-10">Let&apos;s talk</span>
            <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Cyber Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060b0e]/95 backdrop-blur-2xl border-b border-cyan-400/20 px-8 py-8 animate-fadeIn">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-mono uppercase text-cyan-400/90 tracking-widest pb-2 border-b border-white/[0.08]">
              NAVIGATION MATRIX
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`flex items-center gap-3 py-1.5 font-space text-xl transition-colors ${
                    isActive ? 'text-cyan-300 font-medium' : 'font-light text-zinc-200 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-xs text-cyan-400/80">&rsaquo;</span>
                  <span>{link.label}</span>
                </a>
              );
            })}
            <div className="pt-6 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-200">
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open for collaborations
              </span>
              <span className="text-cyan-400/90">SOTHEAVAN &bull; 2026</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
