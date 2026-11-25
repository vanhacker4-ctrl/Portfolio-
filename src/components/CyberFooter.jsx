import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowUp,
  ArrowUpRight,
  Copy,
  Check,
  QrCode,
  X,
  Mail,
  Send,
  Maximize2,
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { navigateWithGlitch } from '../utils/cyberNavigation';
import { GITHUB_CONFIG } from '../config/github';
import { ScrollReveal, ScrollDivider } from './ScrollReveal';

/* =========================================================================
   OFFICIAL BRAND SVG ICONS
   ========================================================================= */

const TelegramIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 4-1.74 6.68-2.88 8.03-3.44 3.82-1.58 4.61-1.86 5.14-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.19-.04.33z"
      fill="#229ED9"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"
      fill="#25D366"
    />
    <path
      d="M17.51 14.39C17.21 14.24 15.74 13.52 15.47 13.42C15.2 13.32 15 13.27 14.81 13.57C14.61 13.87 14.04 14.54 13.87 14.74C13.69 14.94 13.52 14.96 13.22 14.81C12.92 14.66 11.97 14.35 10.84 13.34C9.96 12.56 9.37 11.59 9.2 11.29C9.02 10.99 9.18 10.83 9.33 10.68C9.46 10.55 9.63 10.33 9.77 10.16C9.92 9.99 9.97 9.87 10.07 9.67C10.17 9.47 10.12 9.29 10.05 9.15C9.97 9 9.4 7.6 9.16 7.02C8.93 6.46 8.69 6.54 8.52 6.53C8.36 6.52 8.17 6.52 7.97 6.52C7.77 6.52 7.45 6.6 7.18 6.89C6.91 7.19 6.14 7.91 6.14 9.38C6.14 10.85 7.21 12.27 7.36 12.47C7.51 12.67 9.47 15.68 12.47 16.98C13.18 17.29 13.75 17.48 14.18 17.62C14.9 17.85 15.55 17.82 16.07 17.74C16.65 17.65 17.85 17.01 18.1 16.31C18.35 15.61 18.35 15.01 18.27 14.89C18.2 14.76 18.01 14.69 17.71 14.54L17.51 14.39Z"
      fill="#FFFFFF"
    />
  </svg>
);

const GmailIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
      fill="#EA4335"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="#1877F2"
    />
  </svg>
);

const GitHubFooterIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

/* =========================================================================
   REDESIGNED OBSIDIAN FOOTER COMPONENT
   ========================================================================= */

export default function CyberFooter() {
  const [timeStr, setTimeStr] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);
  const [qrPopoverOpen, setQrPopoverOpen] = useState(false);
  const [qrPinned, setQrPinned] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [msgData, setMsgData] = useState({ name: '', email: '', message: '' });

  const qrPopoverRef = useRef(null);
  const qrButtonRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Live ticking local clock synced to SE Asia / Vientiane time (ICT • UTC+7)
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Vientiane',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setTimeStr(formatter.format(new Date()));
      } catch {
        // Fallback for browsers without Intl timeZone support
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const ict = new Date(utc + 3600000 * 7);
        const hours = String(ict.getHours()).padStart(2, '0');
        const mins = String(ict.getMinutes()).padStart(2, '0');
        const secs = String(ict.getSeconds()).padStart(2, '0');
        setTimeStr(`${hours}:${mins}:${secs}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close open footer modals/popovers on Escape
  useEffect(() => {
    if (!messageModalOpen && !qrModalOpen && !qrPopoverOpen) return;
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (messageModalOpen) setMessageModalOpen(false);
      if (qrModalOpen) setQrModalOpen(false);
      if (qrPopoverOpen) {
        setQrPopoverOpen(false);
        setQrPinned(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [messageModalOpen, qrModalOpen, qrPopoverOpen]);

  // Dismiss QR popover on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        qrPopoverOpen &&
        qrPopoverRef.current &&
        !qrPopoverRef.current.contains(e.target) &&
        qrButtonRef.current &&
        !qrButtonRef.current.contains(e.target)
      ) {
        setQrPopoverOpen(false);
        setQrPinned(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [qrPopoverOpen]);

  const handleCopy = (text, key) => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const scrollToTop = () => {
    navigateWithGlitch('#hero', 'OVERVIEW');
  };

  const handleNavScroll = (e, href, label = '') => {
    e.preventDefault();
    navigateWithGlitch(href, label);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    cyberAudio.playChime();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${msgData.name.trim() || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${msgData.name.trim()}\nEmail: ${msgData.email.trim()}\n\n${msgData.message.trim()}`
    );
    window.location.href = `mailto:pichsotheavan020@gmail.com?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setMessageModalOpen(false);
      setMsgData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleQrButtonMouseEnter = () => {
    cyberAudio.playHover();
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setQrPopoverOpen(true);
  };

  const handleQrButtonMouseLeave = () => {
    if (qrPinned) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setQrPopoverOpen(false);
    }, 350);
  };

  const handlePopoverMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handlePopoverMouseLeave = () => {
    if (qrPinned) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setQrPopoverOpen(false);
    }, 300);
  };

  const handleQrButtonClick = (e) => {
    e.stopPropagation();
    cyberAudio.playClick();
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (qrPopoverOpen && qrPinned) {
      setQrPinned(false);
      setQrPopoverOpen(false);
    } else {
      setQrPinned(true);
      setQrPopoverOpen(true);
    }
  };

  const hasGitHub = Boolean(GITHUB_CONFIG.username && GITHUB_CONFIG.username.trim() !== '');

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'About and CV', href: '#about' },
    { label: 'Technical Skills', href: '#skills' },
    { label: 'Currently Exploring', href: '#exploring' },
    { label: hasGitHub ? 'Projects and GitHub' : 'Selected Projects', href: '#projects' },
    { label: 'Learning Journey', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      id="contact"
      className="relative border-t border-white/[0.08] bg-[#060b0e] py-16 sm:py-20 px-6 sm:px-8 lg:px-12 z-20"
    >
      {/* =====================================================================
         CLIPPED AMBIENT GLOW & WATERMARK LAYER
         (Clipped independently so oversized decorative elements don't cause page scroll,
          while letting the interactive QR popover float freely without being clipped)
         ===================================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {/* Subtle radial cyan & emerald ambient glow */}
        <div
          className="absolute -top-36 right-1/4 w-[560px] h-[560px] bg-[radial-gradient(circle,rgba(0,245,255,0.08)_0%,transparent_70%)]"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-28 left-8 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(16,185,129,0.06)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        {/* Ultra-faint oversized background watermark */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-12 font-space font-black text-[13vw] tracking-widest text-white opacity-[0.02] leading-none whitespace-nowrap"
          aria-hidden="true"
        >
          SOTHEAVAN
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ===================================================================
           BALANCED 3-COLUMN LAYOUT (12-COLUMN GRID)
           =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-12 sm:pb-14">

          {/* -----------------------------------------------------------------
             COLUMN 1: BRAND & STATUS (lg:col-span-5)
             ----------------------------------------------------------------- */}
          <ScrollReveal className="lg:col-span-5 space-y-4" y={28} blur={10} delay={0}>
            {/* Brand Dot + Name */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 shadow-[0_0_10px_#00F5FF]" />
              </span>
              <h2 className="font-space font-bold text-2xl md:text-3xl text-white tracking-tight">
                Sotheavan Pich
              </h2>
            </div>

            {/* Subtitle in cyan monospace */}
            <div className="text-xs font-mono font-medium text-cyan-400 tracking-wide">
              Full-Stack Developer and AI Prompt Engineer
            </div>

            {/* Bio paragraph */}
            <p className="font-inter text-sm text-zinc-200 font-normal leading-relaxed max-w-md">
              Second-year programming student and merit scholarship recipient. Building across the full stack, exploring emerging systems, and turning curiosity into reliable software.
            </p>

            {/* Action & Status Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Borderless Status Indicator */}
              <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-400 font-medium select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                </span>
                <span>Open to Opportunities</span>
              </div>

              {/* High-Contrast Solid Cyan CTA */}
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  setMessageModalOpen(true);
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold font-space text-xs tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_28px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Quick Message</span>
              </button>
            </div>
          </ScrollReveal>

          {/* -----------------------------------------------------------------
             COLUMN 2: NAVIGATION (lg:col-span-3)
             ----------------------------------------------------------------- */}
          <ScrollReveal className="lg:col-span-3 space-y-2" y={28} blur={10} delay={0.1}>
            <div className="font-mono text-xs text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>Navigation</span>
            </div>

            <nav className="space-y-1 font-inter text-xs">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavScroll(e, item.href)}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="group flex items-center gap-2.5 py-1.5 text-zinc-200 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#00F5FF] group-hover:scale-125 transition-all duration-300 shrink-0" />
                  <span className="group-hover:translate-x-1.5 group-hover:text-cyan-300 transition-all duration-300 font-mono text-xs">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>
          </ScrollReveal>

          {/* -----------------------------------------------------------------
             COLUMN 3: DIRECT CHANNELS (lg:col-span-4)
             ----------------------------------------------------------------- */}
          <ScrollReveal className="lg:col-span-4 space-y-3 relative z-20" y={28} blur={10} delay={0.2}>
            <div className="font-mono text-xs text-zinc-300 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Direct Channels</span>
              <span className="text-cyan-400/80 text-[10px] tracking-wider font-mono">
                Direct Contact
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Row 1: Telegram with Interactive Floating QR Popover */}
              <div className="relative">
                <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-white/[0.08] hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] transition-all duration-300">
                  <a
                    href="https://t.me/+8562054580186"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="flex items-center gap-3 text-zinc-300 group-hover:text-white transition-colors flex-1 min-w-0"
                  >
                    <TelegramIcon />
                    <span className="font-mono text-xs tracking-tight text-zinc-200 group-hover:text-cyan-300 transition-colors">
                      +856 20 54 580 186
                    </span>
                  </a>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* QR Icon Button with Popover Trigger */}
                    <button
                      type="button"
                      ref={qrButtonRef}
                      onClick={handleQrButtonClick}
                      onMouseEnter={handleQrButtonMouseEnter}
                      onMouseLeave={handleQrButtonMouseLeave}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        qrPopoverOpen
                          ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-400 shadow-[0_0_12px_rgba(0,245,255,0.3)]'
                          : 'bg-white/[0.03] hover:bg-white/[0.08] border-transparent hover:border-white/[0.1] text-zinc-200 hover:text-cyan-400'
                      }`}
                      title="View Telegram QR Code"
                      aria-label="Telegram QR Code"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={() => handleCopy('+8562054580186', 'tg')}
                      className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] text-zinc-200 hover:text-white transition-all cursor-pointer"
                      title="Copy Telegram Number"
                      aria-label="Copy Telegram Number"
                    >
                      {copiedKey === 'tg' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* External Link */}
                    <a
                      href="https://t.me/+8562054580186"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => cyberAudio.playClick()}
                      className="p-1.5 rounded-lg text-zinc-200 hover:text-[#229ED9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                      title="Open Telegram"
                      aria-label="Open Telegram"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Sleek Floating QR Popover (Opens downward so it never clips top boundaries) */}
                {qrPopoverOpen && (
                  <div
                    ref={qrPopoverRef}
                    onMouseEnter={handlePopoverMouseEnter}
                    onMouseLeave={handlePopoverMouseLeave}
                    className="absolute top-full right-0 mt-2 z-40 w-72 p-4 rounded-2xl bg-[#0c131a]/95 backdrop-blur-2xl border border-cyan-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.25)] animate-modal-pop text-center"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08]">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold">
                        <TelegramIcon />
                        <span>Telegram QR Scan</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setQrPinned(false);
                            setQrPopoverOpen(false);
                            setQrModalOpen(true);
                          }}
                          className="p-1 rounded-md text-zinc-200 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                          title="Enlarge Modal"
                          aria-label="Enlarge Telegram QR Modal"
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setQrPinned(false);
                            setQrPopoverOpen(false);
                          }}
                          className="p-1 rounded-md text-zinc-200 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                          title="Close Popover"
                          aria-label="Close Telegram QR Popover"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* QR Code Container with Laser Sweep */}
                    <div
                      onClick={() => {
                        cyberAudio.playClick();
                        setQrPinned(false);
                        setQrPopoverOpen(false);
                        setQrModalOpen(true);
                      }}
                      className="relative bg-white p-2.5 rounded-xl shadow-lg mx-auto mb-3 cursor-pointer group/qrimg overflow-hidden border border-white/20"
                    >
                      <picture>
                        <source srcSet="/images/telegram-qr.webp" type="image/webp" />
                        <img
                          src="/images/telegram-qr.jpg"
                          alt="Telegram QR Code"
                          loading="lazy"
                          decoding="async"
                          className="w-full max-w-[170px] h-auto mx-auto object-contain rounded-lg transition-transform duration-300 group-hover/qrimg:scale-102"
                        />
                      </picture>
                      <div className="absolute left-1.5 right-1.5 h-[2px] bg-gradient-to-r from-transparent via-[#229ED9] to-transparent shadow-[0_0_10px_#229ED9] animate-laser-sweep pointer-events-none" />
                    </div>

                    <div className="font-mono text-xs font-bold text-white mb-0.5">
                      +856 20 54 580 186
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400/90 mb-3">
                      Sotheavan Pich &bull; Telegram Direct
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy('+8562054580186', 'popover')}
                        className="flex-1 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/80 text-[11px] font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                      >
                        {copiedKey === 'popover' ? 'Copied' : 'Copy'}
                      </button>
                      <a
                        href="https://t.me/+8562054580186"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => cyberAudio.playClick()}
                        className="flex-1 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-[11px] font-space font-semibold text-slate-950 transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                      >
                        <span>Open Telegram</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 2: WhatsApp */}
              <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-white/[0.08] hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] transition-all duration-300">
                <a
                  href="https://wa.me/8562054580186"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="flex items-center gap-3 text-zinc-300 group-hover:text-white transition-colors flex-1 min-w-0"
                >
                  <WhatsAppIcon />
                  <span className="font-mono text-xs tracking-tight text-zinc-200 group-hover:text-emerald-300 transition-colors">
                    +856 20 54 580 186
                  </span>
                </a>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy('+8562054580186', 'wa')}
                    className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] text-zinc-200 hover:text-white transition-all cursor-pointer"
                    title="Copy WhatsApp Number"
                    aria-label="Copy WhatsApp Number"
                  >
                    {copiedKey === 'wa' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href="https://wa.me/8562054580186"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="p-1.5 rounded-lg text-zinc-200 hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    title="Open WhatsApp"
                    aria-label="Open WhatsApp"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Row 3: Email (Displayed in full without '...' truncation) */}
              <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-white/[0.08] hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] transition-all duration-300">
                <a
                  href="mailto:pichsotheavan020@gmail.com"
                  onClick={() => cyberAudio.playClick()}
                  className="flex items-center gap-3 text-zinc-300 group-hover:text-white transition-colors flex-1 min-w-0"
                >
                  <GmailIcon />
                  <span className="font-mono text-xs sm:text-[13px] tracking-tight text-zinc-200 group-hover:text-rose-300 transition-colors whitespace-nowrap">
                    pichsotheavan020@gmail.com
                  </span>
                </a>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    onClick={() => handleCopy('pichsotheavan020@gmail.com', 'gmail')}
                    className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] text-zinc-200 hover:text-white transition-all cursor-pointer"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copiedKey === 'gmail' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href="mailto:pichsotheavan020@gmail.com"
                    onClick={() => cyberAudio.playClick()}
                    className="p-1.5 rounded-lg text-zinc-200 hover:text-[#EA4335] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    title="Send Email"
                    aria-label="Send Email"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Row 4: Facebook */}
              <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-white/[0.08] hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] transition-all duration-300">
                <a
                  href="https://www.facebook.com/search/top?q=Sotheavan%20Pich"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="flex items-center gap-3 text-zinc-300 group-hover:text-white transition-colors flex-1 min-w-0"
                >
                  <FacebookIcon />
                  <span className="font-mono text-xs tracking-tight text-zinc-200 group-hover:text-blue-300 transition-colors">
                    Facebook: Sotheavan Pich
                  </span>
                </a>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy('Sotheavan Pich', 'fb')}
                    className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] text-zinc-200 hover:text-white transition-all cursor-pointer"
                    title="Copy Facebook Profile Name"
                    aria-label="Copy Facebook Profile Name"
                  >
                    {copiedKey === 'fb' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href="https://www.facebook.com/search/top?q=Sotheavan%20Pich"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="p-1.5 rounded-lg text-zinc-200 hover:text-[#1877F2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    title="Open Facebook Profile"
                    aria-label="Open Facebook Profile"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Row 5: GitHub */}
              {hasGitHub && GITHUB_CONFIG.profileUrl && (
                <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-white/[0.08] hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] transition-all duration-300">
                  <a
                    href={GITHUB_CONFIG.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="flex items-center gap-3 text-zinc-300 group-hover:text-white transition-colors flex-1 min-w-0"
                  >
                    <GitHubFooterIcon />
                    <span className="font-mono text-xs tracking-tight text-zinc-200 group-hover:text-cyan-300 transition-colors truncate">
                      @{GITHUB_CONFIG.username}
                    </span>
                  </a>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(GITHUB_CONFIG.profileUrl, 'gh')}
                      className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] text-zinc-200 hover:text-white transition-all cursor-pointer"
                      title="Copy GitHub Profile URL"
                      aria-label="Copy GitHub Profile URL"
                    >
                      {copiedKey === 'gh' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={GITHUB_CONFIG.profileUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => cyberAudio.playClick()}
                      className="p-1.5 rounded-lg text-zinc-200 hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                      title="Visit GitHub Profile"
                      aria-label="Visit GitHub Profile"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* ===================================================================
           EDITORIAL DEPTH & BOTTOM UTILITY BAR
           =================================================================== */}
        <ScrollDivider className="h-[1px] bg-white/[0.08]" delay={0.12} />
        <ScrollReveal y={18} blur={6} delay={0.18}>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-300">
            {/* Left: Clean Copyright Signature */}
            <div className="text-zinc-200 tracking-tight text-center md:text-left">
              &copy; 2026 Sotheavan Pich &bull; Built with React and Tailwind CSS
            </div>

            {/* Center: Live Ticking Local Clock synced to SE Asia / Vientiane time */}
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span className="text-cyan-400 font-semibold tracking-wider">
                {timeStr || '--:--:--'} ICT
              </span>
              <span className="text-zinc-400">&bull;</span>
              <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_6px_#10B981]" />
                </span>
                <span>UTC+7 Southeast Asia</span>
              </span>
            </div>

            {/* Right: Sleek Back to top pill with hover border glow */}
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => cyberAudio.playHover()}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-400/40 text-xs font-mono text-zinc-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.18)] cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* ===================================================================
         ENLARGED TELEGRAM QR MODAL (Portaled to document.body)
         =================================================================== */}
      {qrModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            onClick={() => {
              cyberAudio.playClick();
              setQrModalOpen(false);
            }}
            className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm cyber-panel-hud p-8 rounded-3xl border border-cyan-400/30 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_28px_rgba(0,245,255,0.18)] animate-modal-pop text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setQrModalOpen(false);
                }}
                aria-label="Close Telegram QR modal"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-zinc-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 mb-2">
                <TelegramIcon />
                <h3 className="font-space font-medium text-lg text-white">
                  Telegram QR Scanner
                </h3>
              </div>
              <p className="text-xs font-inter text-zinc-200 mb-5">
                Point your phone's camera or Telegram app to connect directly
              </p>

              {/* High-Resolution QR Card */}
              <div className="relative bg-white p-4 rounded-2xl shadow-2xl mx-auto mb-5 overflow-hidden border border-white/20">
                <picture>
                  <source srcSet="/images/telegram-qr.webp" type="image/webp" />
                  <img
                    src="/images/telegram-qr.jpg"
                    alt="Telegram QR Code"
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[240px] mx-auto object-contain rounded-xl"
                  />
                </picture>
                <div className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#229ED9] to-transparent shadow-[0_0_12px_#229ED9] animate-laser-sweep pointer-events-none" />
              </div>

              <div className="font-mono text-sm font-semibold text-white mb-1">
                +856 20 54 580 186
              </div>
              <div className="text-[11px] font-mono text-cyan-400 mb-6">
                Sotheavan Pich &bull; Telegram Direct
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy('+8562054580186', 'modal')}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/60 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  {copiedKey === 'modal' ? 'Copied' : 'Copy Number'}
                </button>
                <a
                  href="https://t.me/+8562054580186"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="flex-1 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-xs font-space font-semibold text-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <span>Open in Telegram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ===================================================================
         QUICK MESSAGE MODAL (Portaled to document.body)
         =================================================================== */}
      {messageModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Send Direct Message"
            onClick={() => {
              cyberAudio.playClick();
              setMessageModalOpen(false);
            }}
            className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md cyber-panel-hud p-8 rounded-3xl border border-cyan-400/30 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_28px_rgba(0,245,255,0.18)] animate-modal-pop"
            >
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  setMessageModalOpen(false);
                }}
                aria-label="Close message modal"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-zinc-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <h3 className="font-space font-medium text-lg text-white">
                  Send Direct Message
                </h3>
              </div>
              <p className="text-xs font-inter text-zinc-200 mb-6">
                Compose a message below to open an email draft addressed to pichsotheavan020@gmail.com.
              </p>

              {formSent ? (
                <div className="p-8 rounded-2xl bg-slate-900/60 border border-emerald-500/30 text-center animate-fadeIn">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-space font-medium text-base text-white mb-1">
                    Email Draft Opened
                  </h4>
                  <p className="font-inter text-xs text-zinc-200">
                    Your default email client should open with your message pre-filled for pichsotheavan020@gmail.com.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-200 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={msgData.name}
                      onChange={(e) => setMsgData({ ...msgData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-slate-950/70 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-200 uppercase tracking-wider mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={msgData.email}
                      onChange={(e) => setMsgData({ ...msgData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-slate-950/70 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-200 uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={msgData.message}
                      onChange={(e) => setMsgData({ ...msgData, message: e.target.value })}
                      placeholder="Describe your project, role, or questions..."
                      className="w-full bg-slate-950/70 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => cyberAudio.playHover()}
                    className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-space font-semibold text-xs tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open in Email Client</span>
                  </button>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </footer>
  );
}
