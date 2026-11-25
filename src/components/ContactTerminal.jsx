import React, { useState, useRef, useEffect } from 'react';
import {
  Check,
  Mail,
  Terminal,
  Send,
  QrCode,
  ArrowUpRight,
  Copy,
  Clock,
  ShieldCheck,
  MapPin,
  X,
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

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

/* =========================================================================
   CONTACT COMPONENT (MODERN CYBER / DEVELOPER UI)
   ========================================================================= */

export default function ContactTerminal() {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'terminal'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Internship / Junior Role',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // CLI state
  const [cmdInput, setCmdInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'sys', text: 'Sotheavan Pich • Developer Console Initialized' },
    { type: 'sys', text: 'Type "contact", "about", or "help" for instant commands.' },
  ]);
  const terminalBottomRef = useRef(null);

  const topicOptions = [
    'Internship / Junior Role',
    'Software Collaboration',
    'AI and Automation Project',
    'General Networking',
  ];

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTopicSelect = (topic) => {
    cyberAudio.playClick();
    setFormData({ ...formData, subject: topic });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      cyberAudio.playGlitch();
      alert('Please complete all required fields.');
      return;
    }

    cyberAudio.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      cyberAudio.playChime();
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Internship / Junior Role',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim().toLowerCase();
    if (!cmd) return;

    cyberAudio.playKeystroke();
    const newHistory = [...terminalHistory, { type: 'user', text: `> ${cmdInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'AVAILABLE COMMANDS:\n  • contact   - Direct Telegram, WhatsApp, Gmail, FB\n  • about     - Sotheavan Pich profile\n  • skills    - Technical capabilities\n  • clear     - Clear terminal buffer',
        });
        break;
      case 'contact':
      case 'channels':
        newHistory.push({
          type: 'output',
          text: 'DIRECT CONTACT CHANNELS:\n  • Telegram:  +856 20 54 580 186 (https://t.me/+8562054580186)\n  • WhatsApp:  +856 20 54 580 186 (020 54 580 186)\n  • Email:     pichsotheavan020@gmail.com\n  • Facebook:  Sotheavan Pich',
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          text: 'PROFILE:\nSotheavan Pich — Second-Year Programming Student and Scholarship Recipient.\nFull-Stack Developer | AI Enthusiast.\nFocus: Modern Web Architectures, Applied AI, Systems Exploration.',
        });
        break;
      case 'clear':
        setTerminalHistory([{ type: 'sys', text: 'Console buffer cleared.' }]);
        setCmdInput('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" or "contact".`,
        });
    }

    setTerminalHistory(newHistory);
    setCmdInput('');
  };

  const copyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText('pichsotheavan020@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const copyPhone = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText('+8562054580186');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Background Subtle Accent Glow */}
      <div className="ambient-glow bg-[#00F5FF] -top-24 -right-24 opacity-10" />
      <div className="ambient-glow bg-[#8B5CF6] bottom-10 -left-24 opacity-10" />

      {/* =========================================================================
         SECTION HEADER
         ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.08] pb-8 mb-12 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#00F5FF] tracking-wider uppercase">
              [ DIRECT CONTACT ]
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="font-space font-light text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
            Let's connect. <br />
            <span className="font-normal italic text-zinc-300">Open for opportunities.</span>
          </h2>
        </div>

        {/* Status Telemetry */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-200">AVAILABLE FOR HIRE</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#00F5FF]" />
            <span className="text-zinc-300">RESPONSE &lt; 2 HOURS</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
         2-COLUMN SPLIT CARD ARCHITECTURE (Equal Height items-stretch)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        
        {/* =====================================================================
           LEFT CARD: PROFILE & DIRECT CHANNELS
           ===================================================================== */}
        <div className="lg:col-span-5 bg-[#0d111a]/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-800/80">
              <div>
                <h3 className="font-space font-semibold text-2xl text-white tracking-tight">
                  Sotheavan Pich
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-1">
                  Full-Stack Developer and Student
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 font-medium">
                Merit Scholar
              </div>
            </div>

            {/* Bio with subtle cyan highlight */}
            <p className="font-inter text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
              Second-year programming student and scholarship recipient.{' '}
              <span className="text-cyan-300 font-medium">
                Passionate about building modern, high-performance web applications
              </span>{' '}
              and exploring AI automation, distributed services, and practical digital products.
            </p>

            {/* COMPACT TELEGRAM QR CARD */}
            <div className="bg-slate-900/90 border border-cyan-500/25 rounded-xl p-3.5 sm:p-4 mb-5 flex items-center gap-4 group/qr transition-all duration-300 hover:border-cyan-500/50">
              {/* White QR thumbnail with soft cyan outer glow */}
              <div
                onClick={() => {
                  cyberAudio.playClick();
                  setQrModalOpen(true);
                }}
                className="w-20 h-20 bg-white p-1 rounded-lg shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer transition-all duration-300 relative overflow-hidden flex items-center justify-center"
                title="Click to expand QR Code"
              >
                <img
                  src="/images/telegram-qr.jpg"
                  alt="Telegram QR Code"
                  className="w-full h-full object-contain rounded"
                />
                {/* Subtle laser sweep beam */}
                <div className="absolute left-1 right-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#229ED9] to-transparent shadow-[0_0_8px_#229ED9] animate-laser-sweep pointer-events-none" />
              </div>

              {/* Telegram Info & Button */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-medium">
                  <TelegramIcon />
                  <span>Telegram Direct</span>
                </div>
                <div className="text-sm font-mono text-white font-semibold mt-0.5 truncate">
                  +856 20 54 580 186
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href="https://t.me/+8562054580186"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-space font-semibold text-xs flex items-center gap-1 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                  >
                    <span>Open Telegram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      cyberAudio.playClick();
                      setQrModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Enlarge QR Code"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* COMPACT DARK CARDS FOR SOCIAL LINKS */}
            <div className="space-y-2.5 font-inter text-xs">
              {/* WhatsApp Card */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <WhatsAppIcon />
                  </div>
                  <div className="min-w-0">
                    <div className="font-space font-medium text-white text-xs">WhatsApp</div>
                    <div className="font-mono text-zinc-400 text-[11px] truncate">
                      020 54 580 186
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={copyPhone}
                    className="p-1.5 rounded hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Number"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://wa.me/8562054580186"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>Chat</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Gmail Card */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-rose-500/40 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/15 flex items-center justify-center shrink-0">
                    <GmailIcon />
                  </div>
                  <div className="min-w-0">
                    <div className="font-space font-medium text-white text-xs">Gmail</div>
                    <div className="font-mono text-zinc-400 text-[11px] truncate max-w-[140px] sm:max-w-none">
                      pichsotheavan020@gmail.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="mailto:pichsotheavan020@gmail.com"
                    onClick={() => cyberAudio.playClick()}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 font-mono text-[11px] font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>Send</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Facebook Card */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                    <FacebookIcon />
                  </div>
                  <div className="min-w-0">
                    <div className="font-space font-medium text-white text-xs">Facebook</div>
                    <div className="font-mono text-zinc-400 text-[11px] truncate">
                      Sotheavan Pich
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href="https://www.facebook.com/search/top?q=Sotheavan%20Pich"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 font-mono text-[11px] font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>Profile</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* LEFT CARD FOOTER (Horizontally Aligned) */}
          <div className="pt-4 border-t border-slate-800/80 mt-6 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-zinc-400" />
              <span>SOUTHEAST ASIA (UTC+7)</span>
            </span>
            <span className="flex items-center gap-2 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>STATUS: ACTIVE</span>
            </span>
          </div>
        </div>

        {/* =====================================================================
           RIGHT CARD: MESSAGE DISPATCH FORM & CONSOLE
           ===================================================================== */}
        <div className="lg:col-span-7 bg-[#0d111a]/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-2xl">
          <div>
            {/* Top Bar Switcher Tabs */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playClick();
                    setActiveTab('form');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-space font-medium transition-all cursor-pointer ${
                    activeTab === 'form'
                      ? 'bg-white text-slate-950 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Message Dispatch
                </button>
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playClick();
                    setActiveTab('terminal');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-space font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'terminal'
                      ? 'bg-white text-slate-950 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>&gt;_ Developer Console</span>
                </button>
              </div>

              <div className="text-xs font-mono text-zinc-500 hidden sm:block">
                <span>ENCRYPTED &bull; SECURE</span>
              </div>
            </div>

            {/* TAB 1: FORM */}
            {activeTab === 'form' && (
              <div>
                {submitted ? (
                  <div className="p-10 rounded-2xl bg-slate-900/60 border border-emerald-500/30 text-center animate-fadeIn my-auto">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h4 className="font-space font-medium text-xl text-white mb-2">
                      Message Transmitted Successfully
                    </h4>
                    <p className="font-inter text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting me. Sotheavan Pich has received your message and will review it promptly!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {/* Inquiry Category Pills */}
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                        Inquiry Category
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {topicOptions.map((topic) => {
                          const isSelected = formData.subject === topic;
                          return (
                            <button
                              type="button"
                              key={topic}
                              onClick={() => handleTopicSelect(topic)}
                              className={`px-3 py-1.5 rounded-full text-xs font-inter transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-cyan-500/15 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-medium'
                                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                              }`}
                            >
                              {topic}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inputs with Smooth Focus States */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="e.g. Jane Doe"
                          required
                          className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm font-inter text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                          Your Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="jane@company.com"
                          required
                          className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm font-inter text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Message Details
                      </label>
                      <textarea
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Please describe the position, software project, or collaboration ideas..."
                        required
                        className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm font-inter text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all resize-none"
                      />
                    </div>

                    {/* Upgraded Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => cyberAudio.playHover()}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-space font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting Data...' : 'Send Message'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: CONSOLE */}
            {activeTab === 'terminal' && (
              <div className="space-y-4">
                <div className="h-64 sm:h-72 overflow-y-auto space-y-2 font-mono text-xs pr-2 text-zinc-400">
                  {terminalHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={
                        item.type === 'sys'
                          ? 'text-zinc-500 italic'
                          : item.type === 'user'
                          ? 'text-cyan-400 font-medium'
                          : item.type === 'error'
                          ? 'text-rose-400'
                          : 'text-zinc-300 whitespace-pre-line leading-relaxed bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60'
                      }
                    >
                      {item.text}
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                <form
                  onSubmit={handleTerminalSubmit}
                  className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800 focus-within:border-cyan-400/50 transition-colors"
                >
                  <span className="text-cyan-400 font-mono text-xs pl-2">&gt;</span>
                  <input
                    type="text"
                    value={cmdInput}
                    onChange={(e) => setCmdInput(e.target.value)}
                    placeholder='Type "contact", "about", "clear"...'
                    className="flex-1 bg-transparent border-none text-white font-mono text-xs outline-none placeholder-zinc-600"
                  />
                  <button
                    type="submit"
                    className="text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white px-3 py-1.5 border border-slate-700 rounded-lg cursor-pointer transition-colors"
                  >
                    Run
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT CARD FOOTER (Horizontally Aligned) */}
          <div className="pt-4 border-t border-slate-800/80 mt-6 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>DIRECT INBOX: pichsotheavan020@gmail.com</span>
            <span className="flex items-center gap-1.5 text-zinc-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>PRIVACY PROTECTED</span>
            </span>
          </div>
        </div>

      </div>

      {/* =========================================================================
         TELEGRAM QR CODE EXPANDED MODAL
         ========================================================================= */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-sm bg-[#0d111a] p-8 rounded-2xl border border-slate-700/80 shadow-2xl animate-modal-pop text-center">
            {/* Close Button */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                setQrModalOpen(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 mb-2">
              <TelegramIcon />
              <h3 className="font-space font-medium text-lg text-white">
                Telegram QR Scanner
              </h3>
            </div>
            <p className="text-xs font-inter text-zinc-400 mb-5">
              Scan with your phone's camera or Telegram app to connect
            </p>

            {/* High-Resolution QR Card */}
            <div className="relative bg-white p-4 rounded-xl shadow-2xl mx-auto mb-5 overflow-hidden border border-white/20">
              <img
                src="/images/telegram-qr.jpg"
                alt="Telegram QR Code"
                className="w-full max-w-[240px] mx-auto object-contain rounded-lg"
              />
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
                onClick={copyPhone}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/60 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                {copiedPhone ? 'Copied' : 'Copy Number'}
              </button>
              <a
                href="https://t.me/+8562054580186"
                target="_blank"
                rel="noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-xs font-space font-semibold text-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
              >
                <span>Launch App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
