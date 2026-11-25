import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Server,
  Sparkles,
  Cpu,
  Database,
  Radio,
  Copy,
  Check,
  Globe,
  Bot,
  Workflow,
  Palette,
  Layers,
  Terminal,
  Eye,
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { ScrollReveal, ScrollDivider } from './ScrollReveal';

/* =========================================================================
   CUSTOM CRISP VECTOR TECH & BRAND LOGOS
   ========================================================================= */

const PythonIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="pyBlue" x1="2" y1="2" x2="14" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5A9FD4" />
        <stop offset="100%" stopColor="#306998" />
      </linearGradient>
      <linearGradient id="pyGold" x1="10" y1="9" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD43B" />
        <stop offset="100%" stopColor="#FFE873" />
      </linearGradient>
    </defs>
    <path
      d="M11.91 2C6.98 2 7.28 4.14 7.28 4.14L7.3 6.36H12v.68H5.21S2 6.69 2 11.66c0 4.96 2.8 4.8 2.8 4.8h1.67v-2.35s-.09-2.8 2.76-2.8h4.75s2.68.04 2.68-2.61V4.65S16.83 2 11.91 2zm-2.63 1.48a.95.95 0 110 1.9.95.95 0 010-1.9z"
      fill="url(#pyBlue)"
    />
    <path
      d="M12.09 22c4.93 0 4.63-2.14 4.63-2.14l-.02-2.22H12v-.68h6.79s3.21.35 3.21-4.62c0-4.96-2.8-4.8-2.8-4.8h-1.67v2.35s.09 2.8-2.76 2.8h-4.75s-2.68-.04-2.68 2.61v4.05s-.17 2.65 4.75 2.65zm2.63-1.48a.95.95 0 110-1.9.95.95 0 010 1.9z"
      fill="url(#pyGold)"
    />
  </svg>
);

const ReactIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="-12 -11 24 22" fill="none">
    <circle cx="0" cy="0" r="2.1" fill="#00D8FF" />
    <g stroke="#00D8FF" strokeWidth="1.15" fill="none">
      <ellipse rx="10.5" ry="4" />
      <ellipse rx="10.5" ry="4" transform="rotate(60)" />
      <ellipse rx="10.5" ry="4" transform="rotate(120)" />
    </g>
  </svg>
);

const TSIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="tsGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="url(#tsGrad)" />
    <path d="M6.2 11.2h6.4v1.8h-2.2v7.4H8.4V13H6.2v-1.8z" fill="#FFFFFF" />
    <path
      d="M19.9 13.1c-.5-.4-1.3-.7-2.2-.7-1.1 0-1.7.4-1.7 1.1 0 .7.6 1.1 2.1 1.6 1.9.7 2.8 1.5 2.8 3 0 1.8-1.4 3-3.7 3-1.4 0-2.7-.4-3.5-1.1l1-1.6c.7.6 1.6.9 2.5.9 1.1 0 1.7-.4 1.7-1.1 0-.7-.5-1.1-1.9-1.6-1.9-.7-2.9-1.5-2.9-3.1 0-1.7 1.4-2.8 3.6-2.8 1.3 0 2.4.3 3.2.9l-1 1.6z"
      fill="#FFFFFF"
    />
  </svg>
);

const JSIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="jsGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#EAB308" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="url(#jsGrad)" />
    <path
      d="M10.4 11.2h2.1v6.2c0 2-1.1 3.1-3.1 3.1-1.3 0-2.2-.4-2.9-1.2l1.4-1.4c.4.5.8.8 1.4.8.7 0 1.1-.4 1.1-1.4v-6.1z"
      fill="#111827"
    />
    <path
      d="M20.2 13.1c-.5-.4-1.2-.7-2.1-.7-1 0-1.6.4-1.6 1.1 0 .7.6 1 2 1.6 1.8.7 2.7 1.5 2.7 3 0 1.8-1.4 3-3.6 3-1.4 0-2.6-.4-3.4-1.1l1-1.6c.7.6 1.5.9 2.4.9 1 0 1.6-.4 1.6-1.1 0-.7-.5-1.1-1.8-1.6-1.9-.7-2.8-1.5-2.8-3.1 0-1.7 1.3-2.8 3.5-2.8 1.2 0 2.3.3 3 .9l-.9 1.6z"
      fill="#111827"
    />
  </svg>
);

const CIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <path d="M12 1.5L21 6.7v10.6L12 22.5 3 17.3V6.7L12 1.5z" fill="#004482" />
    <path d="M21 6.7L12 12 3 17.3V6.7L12 1.5l9 5.2z" fill="#00599C" />
    <path d="M12 1.5l9 5.2L12 12 3 6.7l9-5.2z" fill="#659AD2" fillOpacity="0.45" />
    <path
      d="M14.18 8.32A5.2 5.2 0 1 0 14.18 15.68"
      stroke="#FFFFFF"
      strokeWidth="2.6"
      strokeLinecap="butt"
    />
    <path
      d="M15.2 10.9v2.2M14.1 12h2.2M18.4 10.9v2.2M17.3 12h2.2"
      stroke="#00F5FF"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const NodeIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z"
      stroke="#68A063"
      strokeWidth="1.8"
      fill="#68A063"
      fillOpacity="0.18"
    />
    <path
      d="M12 7v10M7.5 9.8l9 4.4M16.5 9.8l-9 4.4"
      stroke="#8CC84B"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const TailwindIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="twGrad" x1="0" y1="4" x2="24" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    <path
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
      fill="url(#twGrad)"
    />
  </svg>
);

const SqlIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="6" rx="7.5" ry="3" stroke="#38BDF8" strokeWidth="1.7" fill="#38BDF8" fillOpacity="0.2" />
    <path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" stroke="#38BDF8" strokeWidth="1.7" />
    <path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" stroke="#38BDF8" strokeWidth="1.7" />
  </svg>
);

const NeonIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="#00E599" strokeWidth="1.8" fill="#00E599" fillOpacity="0.16" />
    <path d="M8.5 16V8l7 8V8" stroke="#00E599" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloudflareIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <path
      d="M16.8 17.5H7.2a3.7 3.7 0 01-.35-7.38A4.8 4.8 0 0116.2 9.4a3.4 3.4 0 01.6 6.75z"
      fill="#F38020"
      fillOpacity="0.25"
      stroke="#F38020"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const VercelIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <path d="M12 4.5L21 19.5H3L12 4.5Z" fill="#FFFFFF" />
  </svg>
);

const RailwayIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#C084FC" strokeWidth="1.8" fill="#C084FC" fillOpacity="0.16" />
    <path d="M7.5 14.5h9M8.5 11.5h7M10 8.5h4" stroke="#E9D5FF" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const FirebaseIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <path d="M5.5 17.5L8.2 4.5l4.2 7.2L15.6 7l2.9 10.5L12 21l-6.5-3.5z" fill="#FFCA28" fillOpacity="0.28" stroke="#FFA000" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);

const SupabaseIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="none">
    <path
      d="M13.2 21c-.55.68-1.65.3-1.65-.57V13.5H5.8c-.85 0-1.32-.98-.78-1.64L12.8 2.4c.55-.68 1.65-.3 1.65.57V9.9h5.75c.85 0 1.32.98.78 1.64L13.2 21z"
      fill="#3ECF8E"
      fillOpacity="0.25"
      stroke="#3ECF8E"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================================
   DUAL-LAYER BORDER-GLOW + 3D TILT + MAGNETIC SPOTLIGHT BENTO CARD
   ========================================================================= */

function CyberBentoCard({
  children,
  className = '',
  accent = '#00F5FF',
  glowColor = 'rgba(0, 245, 255, 0.22)',
  watermark = '01',
  dimmed = false,
}) {
  const cardRef = useRef(null);
  const borderTraceRef = useRef(null);
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
      const nx = (x / rect.width - 0.5) * 2;
      const ny = (y / rect.height - 0.5) * 2;

      const rx = -ny * 3.4;
      const ry = nx * 3.4;
      const tx = nx * 3.5;
      const ty = ny * 3.5;

      el.style.transition = 'transform 0.14s cubic-bezier(0.2, 0, 0.2, 1), opacity 0.35s ease';
      el.style.transform = `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(${tx.toFixed(1)}px, ${(ty - 4).toFixed(1)}px, 0)`;

      const xPx = x.toFixed(0);
      const yPx = y.toFixed(0);
      if (borderTraceRef.current) {
        borderTraceRef.current.style.background = `radial-gradient(360px circle at ${xPx}px ${yPx}px, ${accent}, rgba(255,255,255,0.1) 55%)`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(460px circle at ${xPx}px ${yPx}px, ${glowColor}, transparent 62%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease';
      cardRef.current.style.transform = dimmed
        ? 'perspective(1200px) scale3d(0.985, 0.985, 1)'
        : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0)';
    }
    if (borderTraceRef.current) {
      borderTraceRef.current.style.background = `linear-gradient(135deg, ${accent}44 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.04) 100%)`;
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
      style={{
        transform: dimmed
          ? 'perspective(1200px) scale3d(0.985, 0.985, 1)'
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-3xl p-[1px] overflow-hidden shadow-[0_24px_55px_-16px_rgba(0,0,0,0.85)] transition-opacity duration-300 ${
        dimmed ? 'opacity-40' : 'opacity-100'
      }`}
    >
      {/* Dynamic Neon Border Trace Layer */}
      <div
        ref={borderTraceRef}
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${accent}44 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.04) 100%)`,
        }}
      />

      {/* Inner Obsidian Glass Surface */}
      <div
        className={`relative h-full w-full rounded-[23px] bg-gradient-to-br from-[#0b101b]/95 via-[#080c14]/92 to-[#060910]/96 backdrop-blur-2xl overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] ${className}`}
      >
        {/* Subtle Dot Matrix */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Cursor-Following Inner Spotlight */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0 opacity-0"
        />

        {/* Oversized Editorial Watermark Numeral */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-5 -right-2 font-space font-black text-[7.5rem] sm:text-[9rem] leading-none tracking-tighter opacity-[0.04] group-hover:opacity-[0.085] transition-opacity duration-500 z-0"
          style={{ color: accent }}
        >
          {watermark}
        </div>

        {/* Cyber HUD Corner Brackets */}
        <span className="pointer-events-none absolute top-3 left-3 w-2 h-2 border-t border-l border-white/25 group-hover:border-[#00F5FF]/85 transition-colors select-none z-10" aria-hidden="true" />
        <span className="pointer-events-none absolute top-3 right-3 w-2 h-2 border-t border-r border-white/25 group-hover:border-[#00F5FF]/85 transition-colors select-none z-10" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/25 group-hover:border-[#00F5FF]/85 transition-colors select-none z-10" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/25 group-hover:border-[#00F5FF]/85 transition-colors select-none z-10" aria-hidden="true" />

        <div className="relative z-10 flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
}

/* =========================================================================
   SKILL DETAILS DATABASE FOR INTERACTIVE INSPECTOR
   ========================================================================= */

const SKILL_DETAILS = {
  react: {
    name: 'React.js (React 19)',
    category: 'Frontend Development',
    role: 'Component State and Concurrency',
    tag: 'REACTIVE UI',
    color: '#00D8FF',
    useCase:
      'Builds modular component trees, optimistic state updates, and maintainable hook architectures for responsive interfaces.',
    snippet: `const [state, setOptimistic] = useOptimistic(feed, (current, update) => [...current, update]);`,
  },
  tailwind: {
    name: 'Tailwind CSS',
    category: 'Frontend Development',
    role: 'Design System and Styling',
    tag: 'DESIGN SYSTEM',
    color: '#06B6D4',
    useCase:
      'Constructs responsive design systems, dark glassmorphism surfaces, and GPU-friendly transitions with minimal CSS overhead.',
    snippet: `className="bg-[#0c1018]/90 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-400/40"`,
  },
  uiux: {
    name: 'UI/UX Engineering',
    category: 'UI/UX and Creative Design',
    role: 'Accessibility and Spatial Layouts',
    tag: 'ACCESSIBILITY',
    color: '#8B5CF6',
    useCase:
      'Applies WCAG AA contrast standards, keyboard navigation support, responsive grid layouts, and clear interaction feedback.',
    snippet: `<HUDCard role="region" aria-label="Status Overview" onKeyDown={handleKeyNav} tabIndex={0} />`,
  },
  motion: {
    name: 'Interactive Motion',
    category: 'UI/UX and Creative Design',
    role: 'Animation and Scroll Transitions',
    tag: 'FLUID MOTION',
    color: '#FF2E93',
    useCase:
      'Implements smooth frame interpolation and hardware-accelerated entrance transitions that respect reduced-motion preferences.',
    snippet: `currentFrameRef.current += (targetFrame - currentFrameRef.current) * 0.12; ctx.drawImage(frame);`,
  },
  designsystems: {
    name: 'Spatial Glass and Visual Hierarchy',
    category: 'UI/UX and Creative Design',
    role: 'Neon Noir Design Tokens',
    tag: 'CREATIVE UI',
    color: '#F472B6',
    useCase:
      'Crafts layered dark obsidian surfaces, specular rim lighting, editorial typography scales, and tactile hover states.',
    snippet: `backdrop-filter: blur(22px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.09);`,
  },
  python: {
    name: 'Python',
    category: 'Python and Programming',
    role: 'Backend Services and Automation',
    tag: 'FASTAPI',
    color: '#FFE052',
    useCase:
      'Develops asynchronous FastAPI services, automated data ETL pipelines, and multi-step prompt engineering frameworks.',
    snippet: `@app.post("/api/v1/stream") async def process_telemetry(payload: IngestSchema) -> JSONResponse:`,
  },
  typescript: {
    name: 'TypeScript',
    category: 'Python and Programming',
    role: 'Contract-First Type Safety',
    tag: 'STRICT',
    color: '#3178C6',
    useCase:
      'Enforces strict type systems, discriminated unions, and invariant checks spanning client-side stores to backend payloads.',
    snippet: `type InvariantResult<T> = { status: 'success'; data: T } | { status: 'error'; message: string };`,
  },
  javascript: {
    name: 'JavaScript (ESNext)',
    category: 'Python and Programming',
    role: 'Asynchronous V8 Execution',
    tag: 'ESNEXT',
    color: '#F7DF1E',
    useCase:
      'Leverages the non-blocking event loop, Web Workers, and memory-conscious asynchronous operations for interactive web apps.',
    snippet: `const [stream, cache] = await Promise.all([connectWebSocket(endpoint), initWorkerMemory()]);`,
  },
  cpp: {
    name: 'C / C++',
    category: 'Python and Programming',
    role: 'Low-Level Systems and Memory',
    tag: 'SYSTEMS',
    color: '#00F5FF',
    useCase:
      'Studies memory pointer mechanics, cache alignment, and foundational data structures to understand zero-overhead execution.',
    snippet: `void* ring_buffer = malloc(BUFFER_SIZE); memcpy(ring_head, input_packet, packet_len);`,
  },
  nodejs: {
    name: 'Node.js',
    category: 'Backend Development',
    role: 'Event-Driven Streaming Ingress',
    tag: 'INGRESS NODE',
    color: '#68A063',
    useCase:
      'Constructs scalable microservice entrypoints and real-time event loops processing high-concurrency requests.',
    snippet: `const pipeline = stream.pipeline(readableStream, transformGzip, destinationSocket);`,
  },
  restwebsockets: {
    name: 'REST and WebSockets',
    category: 'Backend Development',
    role: 'Full-Duplex Telemetry Broker',
    tag: 'BROKER',
    color: '#10B981',
    useCase:
      'Maintains persistent bidirectional WebSocket connections for instant client state updates and structured OpenAPI endpoints.',
    snippet: `ws.on('message', (packet) => broadcastTelemetry(JSON.parse(packet), { binary: true }));`,
  },
  pythonmicroservices: {
    name: 'Python FastAPI',
    category: 'Backend Development',
    role: 'Background Compute and ETL',
    tag: 'PROCESSING',
    color: '#38BDF8',
    useCase:
      'Orchestrates asynchronous background workers, task queues, and generative AI model interactions with FastAPI.',
    snippet: `async with httpx.AsyncClient() as client: response = await client.post(MODEL_ENDPOINT, json=query)`,
  },
  ai_prompt: {
    name: 'AI Prompt Engineering',
    category: 'AI Integration and Automation',
    role: 'Structured Schema and Context Design',
    tag: 'PROMPT OPS',
    color: '#A855F7',
    useCase:
      'Designs deterministic prompt chains, few-shot templates, and structured JSON output validation for reliable LLM workflows.',
    snippet: `const res = await llm.generate({ schema: OutputZodSchema, system: SYSTEM_ROLE, context });`,
  },
  ai_workflows: {
    name: 'Automation Pipelines',
    category: 'AI Integration and Automation',
    role: 'Multi-Step Orchestration',
    tag: 'PIPELINES',
    color: '#00F5FF',
    useCase:
      'Connects language models with local scripts, file ingestion, and webhooks to automate analysis and reporting tasks.',
    snippet: `await pipeline.run([ingestDocs, extractEntities, validateSchema, publishSummary]);`,
  },
  ai_apis: {
    name: 'LLM API Integration',
    category: 'AI Integration and Automation',
    role: 'Streaming and Tool Calling',
    tag: 'MODEL API',
    color: '#C084FC',
    useCase:
      'Integrates streaming model responses, function-calling routers, and fallback handling cleanly into full-stack apps.',
    snippet: `for await (const chunk of modelStream) { socket.emit('token', chunk.delta); }`,
  },
  database: {
    name: 'PostgreSQL Architecture',
    category: 'Database Management',
    role: 'Structured Persistence and Indexing',
    tag: 'PERSISTENCE',
    color: '#00F5FF',
    useCase:
      'Designs relational schemas with PostgreSQL, indexing strategies, and clean persistence models for responsive applications.',
    snippet: `CREATE INDEX CONCURRENTLY idx_telemetry_timestamp ON metrics (created_at DESC);`,
  },
  sql: {
    name: 'SQL',
    category: 'Database Management',
    role: 'Relational Modeling and Query Tuning',
    tag: 'RELATIONAL',
    color: '#38BDF8',
    useCase:
      'Writes normalized schemas, joins, window functions, and indexed queries for reliable transactional data integrity.',
    snippet: `SELECT p.title, COUNT(e.id) AS hits FROM projects p LEFT JOIN events e ON e.project_id = p.id GROUP BY p.id;`,
  },
  neon: {
    name: 'Neon',
    category: 'Database Management',
    role: 'Serverless Postgres and Branching',
    tag: 'SERVERLESS PG',
    color: '#00E599',
    useCase:
      'Deploys serverless PostgreSQL databases with instant copy-on-write branches for preview environments and auto-scaling compute.',
    snippet: `import { neon } from '@neondatabase/serverless'; const sql = neon(process.env.DATABASE_URL);`,
  },
  cloudflare: {
    name: 'Cloudflare',
    category: 'Database Management and Edge',
    role: 'Workers, Pages, DNS and R2 Storage',
    tag: 'EDGE NETWORK',
    color: '#F38020',
    useCase:
      'Runs low-latency serverless edge APIs via Cloudflare Workers, protects domains with DNS/WAF, and distributes static assets globally.',
    snippet: `export default { async fetch(req, env) { return Response.json({ edge: req.cf?.colo, status: 'OK' }); } };`,
  },
  vercel: {
    name: 'Vercel',
    category: 'Database Management and Edge',
    role: 'Frontend Cloud and Edge Functions',
    tag: 'DEPLOYMENT',
    color: '#FFFFFF',
    useCase:
      'Ships Vite, React, and Next.js applications with instant Git preview deployments, edge caching, and serverless API routes.',
    snippet: `export const config = { runtime: 'edge' }; export default (req) => new Response('Edge Active');`,
  },
  railway: {
    name: 'Railway',
    category: 'Database Management and Edge',
    role: 'Managed Containers and APIs',
    tag: 'BACKEND HOST',
    color: '#C084FC',
    useCase:
      'Deploys FastAPI, Node.js microservices, and persistent databases cleanly with automated builds and environment variables.',
    snippet: `railway up --service backend-api --environment production`,
  },
  firebase: {
    name: 'Firebase',
    category: 'Database Management and Edge',
    role: 'Realtime Auth, Firestore and Hosting',
    tag: 'REALTIME BAAS',
    color: '#FFA000',
    useCase:
      'Integrates OAuth authentication, live Firestore document listeners, and cloud storage rules for responsive multi-user apps.',
    snippet: `onSnapshot(doc(db, 'profiles', uid), (snap) => setProfile(snap.data()));`,
  },
  supabase: {
    name: 'Supabase',
    category: 'Database Management and Edge',
    role: 'Postgres, Auth, Storage and RLS',
    tag: 'OPEN BAAS',
    color: '#3ECF8E',
    useCase:
      'Builds full-stack PostgreSQL backends protected with Row-Level Security policies, realtime subscriptions, and bucket storage.',
    snippet: `const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });`,
  },
};

/* =========================================================================
   MAIN BENTO SHOWCASE COMPONENT
   ========================================================================= */

export default function SkillsMatrix() {
  const [selectedSkillKey, setSelectedSkillKey] = useState('react');
  const [frontendPreviewMode, setFrontendPreviewMode] = useState('glass');
  const [activeFocus, setActiveFocus] = useState('all'); // 'all' | 'frontend' | 'core' | 'cloud'
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const selectedSkill = SKILL_DETAILS[selectedSkillKey] || SKILL_DETAILS.react;

  const handleSelectSkill = (key) => {
    cyberAudio.playHover();
    setSelectedSkillKey(key);
  };

  const handleCopySnippet = () => {
    cyberAudio.playClick();
    if (selectedSkill?.snippet) {
      navigator.clipboard.writeText(selectedSkill.snippet).catch(() => {});
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const focusTabs = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend and UI' },
    { id: 'core', label: 'Languages and AI' },
    { id: 'cloud', label: 'Backend and Cloud' },
  ];

  const isDimmed = (group) => activeFocus !== 'all' && activeFocus !== group;

  return (
    <section id="skills" className="relative py-28 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Multi-Layered Neon Noir Ambient Glows */}
      <div className="ambient-glow bg-[#00F5FF] -top-40 -right-40 opacity-15" />
      <div className="ambient-glow bg-[#8B5CF6] top-1/2 -left-40 opacity-15" />
      <div className="ambient-glow bg-[#FF2E93] bottom-0 right-1/4 opacity-10" />

      {/* =========================================================================
         SECTION HEADER & INTERACTIVE MATRIX FOCUS FILTER
         ========================================================================= */}
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-12 gap-6">
        <div>
          <ScrollReveal y={16} blur={6} delay={0}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-[#00F5FF] tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse shadow-[0_0_8px_#00F5FF]" />
                [ TECHNICAL SKILLS ]
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-xs font-mono text-zinc-300 tracking-wide">
                Core Stack and Architecture
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal y={26} blur={10} delay={0.1}>
            <h2 className="font-space font-light text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.04]">
              Technical skills. <br />
              <span className="font-normal italic bg-gradient-to-r from-white via-[#00F5FF] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(0,245,255,0.28)]">
                Structured and applied.
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Interactive Focus Tabs + Status */}
        <ScrollReveal y={20} blur={8} delay={0.18}>
          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-1 p-1.5 rounded-2xl bg-[#080d16]/90 border border-white/[0.1] backdrop-blur-xl shadow-lg">
              {focusTabs.map((tab) => {
                const active = activeFocus === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      cyberAudio.playClick();
                      setActiveFocus(tab.id);
                    }}
                    onMouseEnter={() => cyberAudio.playHover()}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-mono text-[11px] tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? 'bg-[#00F5FF] text-[#060b0e] font-bold shadow-[0_0_16px_rgba(0,245,255,0.4)]'
                        : 'text-zinc-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Select any tile to inspect stack context</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollDivider
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#00F5FF]/50 via-[#A855F7]/35 to-transparent"
          delay={0.15}
        />
      </div>

      {/* =========================================================================
         ASYMMETRIC BENTO GRID (6 Distinct Showcase Cards + Languages Strip)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 mb-8">

        {/* -----------------------------------------------------------------------
           01. FRONTEND DEVELOPMENT (lg:col-span-7) — Live Interactive UI Stage
           ----------------------------------------------------------------------- */}
        <ScrollReveal className="lg:col-span-7" y={30} blur={10} delay={0.08}>
          <CyberBentoCard
            className="p-6 sm:p-8 justify-between"
            accent="#00F5FF"
            glowColor="rgba(0, 245, 255, 0.2)"
            dimmed={isDimmed('frontend')}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.07]">
                <span className="text-[11px] font-mono text-[#00F5FF] tracking-wider flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5" />
                  <span>Client Interfaces</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30">
                  Frontend
                </span>
              </div>

              <h3 className="font-space font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                Frontend Development
              </h3>
              <p className="font-inter text-sm text-zinc-200 leading-relaxed max-w-xl font-normal mb-5">
                Building responsive, component-driven, and accessible web interfaces with clean TypeScript patterns and smooth rendering.
              </p>

              {/* Two Tactile Core Tiles + Live Interactive Mini Stage */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5">
                <div className="md:col-span-6 space-y-3">
                  {[
                    {
                      key: 'react',
                      title: 'React.js',
                      badge: 'REACT 19',
                      color: '#00D8FF',
                      desc: 'Hooks, State and Concurrent Rendering',
                      Icon: ReactIcon,
                      mode: 'react',
                    },
                    {
                      key: 'tailwind',
                      title: 'Tailwind CSS',
                      badge: 'DESIGN SYS',
                      color: '#06B6D4',
                      desc: 'Design Tokens and Utility Styling',
                      Icon: TailwindIcon,
                      mode: 'glass',
                    },
                  ].map(({ key, title, badge, color, desc, Icon, mode }) => (
                    <motion.button
                      key={key}
                      type="button"
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleSelectSkill(key);
                        setFrontendPreviewMode(mode);
                      }}
                      className={`w-full p-3.5 rounded-2xl text-left transition-all border cursor-pointer flex items-center gap-3.5 ${
                        selectedSkillKey === key
                          ? 'bg-cyan-400/[0.1] border-[#00F5FF] shadow-[0_0_24px_rgba(0,245,255,0.22)]'
                          : 'bg-[#060a12]/80 border-white/[0.08] hover:border-cyan-400/45 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl bg-[#0a101b] border flex items-center justify-center shrink-0"
                        style={{ borderColor: `${color}45`, boxShadow: `0 0 14px ${color}20` }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-space font-semibold text-sm text-white">{title}</span>
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                            style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}33` }}
                          >
                            {badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-400 font-inter truncate mt-0.5">{desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Live Interactive UI Preview Sandbox */}
                <div className="md:col-span-6 rounded-2xl bg-[#04070d] border border-cyan-400/25 p-4 flex flex-col justify-between relative overflow-hidden min-h-[156px]">
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pb-2 border-b border-white/[0.06]">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Eye className="w-3 h-3" />
                      <span>Preview: {frontendPreviewMode.toUpperCase()}</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-ping" />
                  </div>

                  <AnimatePresence mode="wait">
                    {frontendPreviewMode === 'glass' && (
                      <motion.div
                        key="glass"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.25 }}
                        className="my-auto py-2 flex items-center justify-center"
                      >
                        <div className="w-full p-3 rounded-xl bg-gradient-to-br from-cyan-400/15 to-purple-500/10 border border-white/20 backdrop-blur-md shadow-[0_8px_24px_rgba(0,245,255,0.18)]">
                          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-200 mb-1.5">
                            <span>Glass Surface</span>
                            <span>Backdrop Blur</span>
                          </div>
                          <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-[#00F5FF] to-purple-400" />
                        </div>
                      </motion.div>
                    )}

                    {frontendPreviewMode === 'react' && (
                      <motion.div
                        key="react"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="my-auto py-2 flex items-center justify-between gap-2 text-[9px] font-mono"
                      >
                        <span className="px-2 py-1.5 rounded-lg bg-cyan-400/15 border border-cyan-400/40 text-cyan-300">
                          STATE
                        </span>
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse" />
                        <span className="px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white">
                          VDOM
                        </span>
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse" />
                        <span className="px-2 py-1.5 rounded-lg bg-emerald-400/15 border border-emerald-400/40 text-emerald-300">
                          RENDER
                        </span>
                      </motion.div>
                    )}

                    {frontendPreviewMode === 'motion' && (
                      <motion.div
                        key="motion"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="my-auto py-2 flex flex-col items-center gap-2"
                      >
                        <svg className="w-full h-10" viewBox="0 0 180 40" fill="none">
                          <path
                            d="M4 34 C 45 34, 60 6, 95 16 C 125 24, 145 6, 176 6"
                            stroke="#FF2E93"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle cx="95" cy="16" r="3.5" fill="#00F5FF" />
                        </svg>
                        <div className="text-[9px] font-mono text-pink-300">cubic-bezier(0.16, 1, 0.3, 1)</div>
                      </motion.div>
                    )}

                    {frontendPreviewMode === 'hud' && (
                      <motion.div
                        key="hud"
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.25 }}
                        className="my-auto py-2 relative flex items-center justify-center"
                      >
                        <div className="w-full p-2.5 rounded-lg border border-purple-400/40 bg-purple-500/10 flex items-center justify-between text-[9px] font-mono text-purple-200">
                          <span>WCAG AA Contrast</span>
                          <span className="text-[#00F5FF]">Focus Ring: On</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-[9px] font-mono text-zinc-400 flex justify-between pt-2 border-t border-white/[0.06]">
                    <span>GPU Composited</span>
                    <span className="text-cyan-400">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mode Switcher Bar */}
            <div className="p-3 rounded-2xl bg-[#05080d]/90 border border-cyan-400/20 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-zinc-400 pl-1">
                Preview Stage:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'glass', label: 'Glass UI', skill: 'tailwind' },
                  { id: 'react', label: 'React 19', skill: 'react' },
                  { id: 'motion', label: 'Motion', skill: 'motion' },
                  { id: 'hud', label: 'HUD', skill: 'uiux' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      cyberAudio.playClick();
                      setFrontendPreviewMode(mode.id);
                      setSelectedSkillKey(mode.skill);
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                      frontendPreviewMode === mode.id
                        ? 'bg-[#00F5FF] text-[#060b0e] font-bold shadow-[0_0_14px_rgba(0,245,255,0.45)]'
                        : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </CyberBentoCard>
        </ScrollReveal>

        {/* -----------------------------------------------------------------------
           02. PYTHON & PROGRAMMING (lg:col-span-5) — Luminous Neon-Capped Engine
           ----------------------------------------------------------------------- */}
        <ScrollReveal className="lg:col-span-5" y={30} blur={10} delay={0.18}>
          <CyberBentoCard
            className="p-6 sm:p-8 justify-between"
            accent="#FFE052"
            glowColor="rgba(255, 224, 82, 0.18)"
            dimmed={isDimmed('core')}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.07]">
                <span className="text-[11px] font-mono text-[#FFE052] tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Core Languages</span>
                </span>
                <span className="text-[10px] font-mono text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                  Systems and Logic
                </span>
              </div>

              <h3 className="font-space font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                Python and Programming
              </h3>
              <p className="font-inter text-sm text-zinc-200 leading-relaxed font-normal mb-5">
                Writing clean, type-safe, and algorithmic software spanning dynamic runtimes and foundational memory models.
              </p>

              {/* 2x2 Language Matrix with Crisp Redesigned Vector Logos */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  {
                    key: 'python',
                    title: 'Python',
                    tag: 'FASTAPI',
                    desc: 'Automation and Backend',
                    color: '#FFE052',
                    Icon: PythonIcon,
                  },
                  {
                    key: 'typescript',
                    title: 'TypeScript',
                    tag: 'STRICT',
                    desc: 'Types and Generics',
                    color: '#3B82F6',
                    Icon: TSIcon,
                  },
                  {
                    key: 'javascript',
                    title: 'JavaScript',
                    tag: 'ESNEXT',
                    desc: 'Async and Web APIs',
                    color: '#F7DF1E',
                    Icon: JSIcon,
                  },
                  {
                    key: 'cpp',
                    title: 'C / C++',
                    tag: 'SYSTEMS',
                    desc: 'Memory and Algorithms',
                    color: '#00F5FF',
                    Icon: CIcon,
                  },
                ].map(({ key, title, tag, desc, color, Icon }) => {
                  const active = selectedSkillKey === key;
                  return (
                    <motion.button
                      key={key}
                      type="button"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectSkill(key)}
                      className={`relative overflow-hidden p-3.5 rounded-2xl text-left border transition-all duration-300 cursor-pointer group/tile ${
                        active
                          ? 'bg-white/[0.09] shadow-[0_0_24px_rgba(255,224,82,0.2)]'
                          : 'bg-[#060911]/85 border-white/[0.08] hover:border-white/[0.25] hover:bg-white/[0.05]'
                      }`}
                      style={active ? { borderColor: color, boxShadow: `0 0 22px ${color}30` } : undefined}
                    >
                      {/* Colored Top Neon Accent Strip */}
                      <div
                        className="pointer-events-none absolute top-0 inset-x-0 h-[2px] opacity-65 group-hover/tile:opacity-100 transition-opacity"
                        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                      />

                      <div className="flex items-center justify-between mb-2.5">
                        <div
                          className="w-10 h-10 rounded-xl bg-[#0b111c] border flex items-center justify-center group-hover/tile:scale-110 transition-transform"
                          style={{ borderColor: `${color}45`, boxShadow: `0 0 16px ${color}20` }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span
                          className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wider"
                          style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}35` }}
                        >
                          {tag}
                        </span>
                      </div>
                      <div className="font-space font-semibold text-sm text-white">{title}</div>
                      <div className="text-[11px] font-inter text-zinc-400 mt-0.5">{desc}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Live Terminal Strip */}
            <div className="px-3.5 py-2.5 rounded-xl bg-[#04070c] border border-amber-400/20 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="truncate">
                <span className="text-[#FFE052]">$</span> python3 main.py &amp;&amp; tsc --noEmit
              </span>
              <span className="w-1.5 h-3.5 bg-[#FFE052] animate-pulse shrink-0 ml-2" />
            </div>
          </CyberBentoCard>
        </ScrollReveal>

        {/* -----------------------------------------------------------------------
           03. BACKEND DEVELOPMENT (lg:col-span-8) — Kinetic Streaming Pipeline
           ----------------------------------------------------------------------- */}
        <ScrollReveal className="lg:col-span-8" y={30} blur={10} delay={0.1}>
          <CyberBentoCard
            className="p-6 sm:p-8 justify-between"
            accent="#10B981"
            glowColor="rgba(16, 185, 129, 0.2)"
            dimmed={isDimmed('cloud')}
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-white/[0.07] gap-3">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 tracking-wider flex items-center gap-2 mb-1">
                    <Server className="w-3.5 h-3.5" />
                    <span>Services and APIs</span>
                  </span>
                  <h3 className="font-space font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    Backend Development
                  </h3>
                </div>
                <span className="self-start sm:self-auto text-[10px] font-mono text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>API Pipeline</span>
                </span>
              </div>

              <p className="font-inter text-sm text-zinc-200 leading-relaxed max-w-2xl font-normal mb-7">
                Building structured backend services, RESTful API endpoints, and real-time bidirectional communication streams.
              </p>

              {/* Kinetic Conduit + Traveling Neon Light Packets */}
              <div className="relative pt-2 pb-2">
                <div className="hidden md:block absolute top-11 left-[14%] right-[14%] h-[2px] bg-white/[0.08] overflow-hidden z-0 rounded-full">
                  <div className="h-full w-24 bg-gradient-to-r from-transparent via-[#10B981] to-[#00F5FF] shadow-[0_0_12px_#10B981] animate-packet-stream" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                  {[
                    {
                      key: 'nodejs',
                      stage: 'Stage 01',
                      title: 'Node.js',
                      role: 'Ingress Runtime',
                      desc: 'Event Loop, Express APIs and Async Streams',
                      color: '#68A063',
                      Icon: NodeIcon,
                    },
                    {
                      key: 'restwebsockets',
                      stage: 'Stage 02',
                      title: 'REST and WebSockets',
                      role: 'Duplex Broker',
                      desc: 'Structured REST Contracts and Live Socket Events',
                      color: '#10B981',
                      Icon: Radio,
                    },
                    {
                      key: 'pythonmicroservices',
                      stage: 'Stage 03',
                      title: 'Python FastAPI',
                      role: 'Service Workers',
                      desc: 'Async Endpoints, ETL Jobs and AI Orchestration',
                      color: '#38BDF8',
                      Icon: Server,
                    },
                  ].map(({ key, stage, title, role, desc, color, Icon }) => {
                    const active = selectedSkillKey === key;
                    return (
                      <motion.button
                        key={key}
                        type="button"
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectSkill(key)}
                        className={`relative overflow-hidden p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          active
                            ? 'bg-emerald-500/10 border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.22)]'
                            : 'bg-[#060911]/90 border-white/[0.09] hover:border-emerald-400/50'
                        }`}
                      >
                        <div
                          className="pointer-events-none absolute top-0 inset-x-0 h-[2px]"
                          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                        />
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center border"
                            style={{ backgroundColor: `${color}18`, borderColor: `${color}45` }}
                          >
                            <Icon className="w-5 h-5" style={{ color }} />
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300">
                            {stage}
                          </span>
                        </div>
                        <h4 className="font-space font-semibold text-base text-white">{title}</h4>
                        <div className="text-[10px] font-mono mt-0.5 mb-2 uppercase" style={{ color }}>
                          {role}
                        </div>
                        <p className="text-xs text-zinc-400 font-inter leading-relaxed">{desc}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </CyberBentoCard>
        </ScrollReveal>

        {/* -----------------------------------------------------------------------
           04. AI INTEGRATION & AUTOMATION (lg:col-span-4) — Holographic Neural Core
           ----------------------------------------------------------------------- */}
        <ScrollReveal className="lg:col-span-4" y={30} blur={10} delay={0.18}>
          <CyberBentoCard
            className="p-6 sm:p-8 justify-between"
            accent="#A855F7"
            glowColor="rgba(168, 85, 247, 0.22)"
            dimmed={isDimmed('core')}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.07]">
                <span className="text-[11px] font-mono text-purple-300 tracking-wider flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>Applied AI</span>
                </span>
                <span className="text-[10px] font-mono text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/35">
                  Automation
                </span>
              </div>

              <h3 className="font-space font-bold text-2xl text-white tracking-tight mb-2">
                AI Integration and Automation
              </h3>
              <p className="font-inter text-sm text-zinc-200 leading-relaxed mb-5">
                Building LLM-powered pipelines, structured prompt workflows, and automated task orchestration.
              </p>

              {/* Rotating Neural Core HUD Visualizer */}
              <div className="p-4 rounded-2xl bg-[#04070d] border border-purple-400/30 mb-5 flex items-center justify-between gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border border-dashed border-purple-400/50 animate-spin-slow" />
                  <div className="absolute inset-1.5 rounded-full border border-cyan-400/40" />
                  <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center shadow-[0_0_16px_rgba(168,85,247,0.45)]">
                    <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono text-purple-300 tracking-wider uppercase">Applied AI Core</div>
                  <div className="text-[11px] font-mono text-zinc-300 truncate">LLM Orchestration</div>
                </div>
                <div className="flex items-end gap-1 h-6 shrink-0">
                  <span className="w-1 bg-purple-400 rounded-full animate-wave-1" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-2" />
                  <span className="w-1 bg-purple-400 rounded-full animate-wave-3" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-4" />
                </div>
              </div>

              {/* Interactive AI Capability Triggers */}
              <div className="space-y-2.5">
                {[
                  { key: 'ai_prompt', label: 'AI Prompt Engineering', tag: 'SCHEMAS', Icon: Sparkles, color: '#A855F7' },
                  { key: 'ai_workflows', label: 'Automation Pipelines', tag: 'PIPELINES', Icon: Workflow, color: '#00F5FF' },
                  { key: 'ai_apis', label: 'LLM API Integration', tag: 'STREAMING', Icon: Cpu, color: '#C084FC' },
                ].map(({ key, label, tag, Icon, color }) => (
                  <motion.button
                    key={key}
                    type="button"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectSkill(key)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedSkillKey === key
                        ? 'bg-purple-500/15 border-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.25)]'
                        : 'bg-[#060911]/80 border-white/[0.08] hover:border-purple-400/45 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" style={{ color }} />
                      <span className="font-space font-medium text-sm text-white">{label}</span>
                    </div>
                    <span
                      className="text-[9px] font-mono px-2 py-0.5 rounded"
                      style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}33` }}
                    >
                      {tag}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </CyberBentoCard>
        </ScrollReveal>

        {/* -----------------------------------------------------------------------
           05. DATABASE MANAGEMENT (lg:col-span-7) — Dual-Tier Data & Edge Mesh
           ----------------------------------------------------------------------- */}
        <ScrollReveal className="lg:col-span-7" y={30} blur={10} delay={0.1}>
          <CyberBentoCard
            className="p-6 sm:p-8 justify-between"
            accent="#38BDF8"
            glowColor="rgba(56, 189, 248, 0.18)"
            dimmed={isDimmed('cloud')}
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/[0.07]">
                <span className="text-[11px] font-mono text-[#38BDF8] tracking-wider flex items-center gap-2">
                  <Database className="w-3.5 h-3.5" />
                  <span>Data and Cloud Infrastructure</span>
                </span>
                <span className="text-[10px] font-mono text-sky-300 px-2.5 py-0.5 rounded-full bg-sky-400/10 border border-sky-400/30">
                  Storage and Edge
                </span>
              </div>

              <h3 className="font-space font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                Database Management
              </h3>
              <p className="font-inter text-sm text-zinc-200 leading-relaxed mb-5">
                Designing normalized SQL schemas, serverless PostgreSQL instances, managed auth, and cloud deployment workflows.
              </p>

              {/* Tier 1: Data & Persistence */}
              <div className="text-[10px] font-mono text-sky-400/90 uppercase tracking-wider mb-2.5">
                Data Persistence and Realtime
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
                {[
                  { key: 'sql', label: 'SQL', sub: 'Queries', color: '#38BDF8', Icon: SqlIcon },
                  { key: 'neon', label: 'Neon', sub: 'Serverless', color: '#00E599', Icon: NeonIcon },
                  { key: 'supabase', label: 'Supabase', sub: 'Postgres', color: '#3ECF8E', Icon: SupabaseIcon },
                  { key: 'firebase', label: 'Firebase', sub: 'Firestore', color: '#FFA000', Icon: FirebaseIcon },
                  { key: 'database', label: 'PostgreSQL', sub: 'Schemas', color: '#00F5FF', Icon: Database },
                ].map(({ key, label, sub, color, Icon }) => (
                  <motion.button
                    key={key}
                    type="button"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectSkill(key)}
                    className={`relative overflow-hidden p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedSkillKey === key
                        ? 'bg-sky-400/10 border-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.22)]'
                        : 'bg-[#060911]/85 border-white/[0.08] hover:border-sky-400/45'
                    }`}
                  >
                    <div
                      className="pointer-events-none absolute top-0 inset-x-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                    />
                    <Icon className="w-5 h-5 mb-2" style={{ color }} />
                    <div className="font-space font-semibold text-xs text-white">{label}</div>
                    <div className="text-[10px] font-mono text-zinc-400">{sub}</div>
                  </motion.button>
                ))}
              </div>

              {/* Tier 2: Edge & Cloud Hosting */}
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                Edge and Cloud Hosting
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'cloudflare', label: 'Cloudflare', tag: 'EDGE', color: '#F38020', Icon: CloudflareIcon },
                  { key: 'vercel', label: 'Vercel', tag: 'DEPLOY', color: '#FFFFFF', Icon: VercelIcon },
                  { key: 'railway', label: 'Railway', tag: 'CLOUD', color: '#C084FC', Icon: RailwayIcon },
                ].map(({ key, label, tag, color, Icon }) => (
                  <motion.button
                    key={key}
                    type="button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectSkill(key)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedSkillKey === key
                        ? 'bg-white/[0.1] border-[#00F5FF]'
                        : 'bg-[#060911]/85 border-white/[0.08] hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span className="font-space font-semibold text-xs text-white">{label}</span>
                    </div>
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                      style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}33` }}
                    >
                      {tag}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </CyberBentoCard>
        </ScrollReveal>

        {/* -----------------------------------------------------------------------
           06. UI/UX & CREATIVE DESIGN (lg:col-span-5) — 3D Layered Glass Studio
           ----------------------------------------------------------------------- */}
        <ScrollReveal className="lg:col-span-5" y={30} blur={10} delay={0.18}>
          <CyberBentoCard
            className="p-6 sm:p-8 justify-between"
            accent="#FF2E93"
            glowColor="rgba(255, 46, 147, 0.2)"
            dimmed={isDimmed('frontend')}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.07]">
                <span className="text-[11px] font-mono text-pink-400 tracking-wider flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Interface and Motion</span>
                </span>
                <span className="text-[10px] font-mono text-pink-300 px-2.5 py-0.5 rounded-full bg-pink-500/15 border border-pink-400/35">
                  Design Systems
                </span>
              </div>

              <h3 className="font-space font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                UI/UX and Creative Design
              </h3>
              <p className="font-inter text-sm text-zinc-200 leading-relaxed mb-5">
                Translating structured typography, layered glassmorphism, and interactive motion into clear digital products.
              </p>

              {/* 3D Depth Fan Stack Visual Centerpiece */}
              <div className="relative h-24 mb-5 flex items-center justify-center">
                <div className="w-4/5 h-12 rounded-xl bg-purple-500/15 border border-purple-400/35 backdrop-blur-sm -translate-y-3 -rotate-2 group-hover:-translate-y-5 group-hover:-rotate-3 transition-all duration-300 flex items-center justify-between px-4 text-[9px] font-mono text-purple-200">
                  <span>Typography</span>
                  <span>Space Grotesk</span>
                </div>
                <div className="absolute w-4/5 h-12 rounded-xl bg-pink-500/15 border border-pink-400/40 backdrop-blur-md translate-y-1 rotate-1 group-hover:translate-y-2 group-hover:rotate-2 transition-all duration-300 flex items-center justify-between px-4 text-[9px] font-mono text-pink-200">
                  <span>Visual Depth</span>
                  <span>Glassmorphism</span>
                </div>
                <div className="absolute w-4/5 h-12 rounded-xl bg-[#070b14]/90 border border-[#00F5FF]/50 backdrop-blur-xl translate-y-5 group-hover:translate-y-8 transition-all duration-300 shadow-[0_10px_24px_rgba(0,0,0,0.65)] flex items-center justify-between px-4 text-[9px] font-mono text-cyan-300">
                  <span>Motion System</span>
                  <span>Frame Interpolation</span>
                </div>
              </div>

              {/* Clickable Creative UX Items */}
              <div className="space-y-2 pt-3">
                {[
                  { key: 'uiux', title: 'UI/UX Engineering', badge: 'WCAG AA', color: '#8B5CF6', Icon: Layers },
                  { key: 'motion', title: 'Interactive Motion', badge: 'GPU MOTION', color: '#FF2E93', Icon: Sparkles },
                  { key: 'designsystems', title: 'Glass and Visual Systems', badge: 'TOKENS', color: '#F472B6', Icon: Palette },
                ].map(({ key, title, badge, color, Icon }) => (
                  <motion.button
                    key={key}
                    type="button"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectSkill(key)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedSkillKey === key
                        ? 'bg-pink-500/15 border-[#FF2E93] shadow-[0_0_18px_rgba(255,46,147,0.22)]'
                        : 'bg-[#060911]/80 border-white/[0.08] hover:border-pink-400/45 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" style={{ color }} />
                      <span className="font-space font-medium text-sm text-white">{title}</span>
                    </div>
                    <span
                      className="text-[9px] font-mono px-2 py-0.5 rounded"
                      style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}33` }}
                    >
                      {badge}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </CyberBentoCard>
        </ScrollReveal>

        {/* -----------------------------------------------------------------------
           GLOBAL COMMUNICATION RIBBON (lg:col-span-12)
           ----------------------------------------------------------------------- */}
        <ScrollReveal className="lg:col-span-12" y={26} blur={8} delay={0.12}>
          <div className="relative overflow-hidden rounded-3xl cyber-panel-hud border border-emerald-400/20 p-5 sm:p-6">
            <div className="pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-400 tracking-wider">
                <Globe className="w-4 h-4" />
                <span>Communication: Spoken Languages</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-300">
                Multilingual collaboration across regional and international teams
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { name: 'Khmer', code: 'KH', accent: '#00F5FF', note: 'Native' },
                { name: 'English', code: 'EN', accent: '#10B981', note: 'Professional' },
                { name: 'Lao', code: 'LA', accent: '#38BDF8', note: 'Working' },
                { name: 'Chinese', code: 'ZH', accent: '#F59E0B', note: 'Conversational' },
                { name: 'Spanish', code: 'ES', accent: '#A855F7', note: 'Elementary' },
              ].map((lang) => (
                <div
                  key={lang.name}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#060911]/80 border border-white/[0.08] hover:border-white/[0.24] hover:bg-white/[0.04] transition-all cursor-default"
                >
                  <span
                    className="w-8 h-8 rounded-lg font-mono text-[10px] font-bold flex items-center justify-center border shrink-0"
                    style={{
                      color: lang.accent,
                      backgroundColor: `${lang.accent}18`,
                      borderColor: `${lang.accent}40`,
                    }}
                  >
                    {lang.code}
                  </span>
                  <div className="min-w-0">
                    <div className="font-space font-medium text-sm text-white leading-tight">{lang.name}</div>
                    <div className="text-[10px] font-mono text-zinc-400 truncate">{lang.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* =========================================================================
         CYBERDECK ARCHITECTURE INSPECTOR (Bottom Interactive Console)
         ========================================================================= */}
      <ScrollReveal y={28} blur={10} delay={0.14}>
        <div className="relative overflow-hidden rounded-3xl cyber-panel-hud border border-cyan-400/25 p-6 sm:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_60px_-15px_rgba(0,0,0,0.85)]">
          <div className="pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F5FF]/70 to-transparent" />
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-5 border-b border-white/[0.06] gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse shadow-[0_0_8px_#00F5FF]" />
              <span className="text-xs font-mono text-cyan-300 tracking-wider">
                Stack Inspector: Technical Context
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-300">
              Select any technology tile above to inspect usage details
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-6 space-y-2.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-space font-bold text-xl sm:text-2xl text-white">
                    {selectedSkill.name}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded tracking-wider uppercase"
                    style={{
                      backgroundColor: `${selectedSkill.color}18`,
                      color: selectedSkill.color,
                      border: `1px solid ${selectedSkill.color}40`,
                    }}
                  >
                    {selectedSkill.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {selectedSkill.category}
                  </span>
                </div>
                <p className="font-inter text-sm text-zinc-300 leading-relaxed font-normal">
                  {selectedSkill.useCase}
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-2xl bg-[#04070c] border border-cyan-400/25 p-4 overflow-hidden shadow-[inset_0_0_24px_rgba(0,245,255,0.05)]">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-[10px] font-mono text-zinc-400">
                    <span className="text-cyan-400/90 uppercase tracking-wider">Code Example</span>
                    <button
                      type="button"
                      onClick={handleCopySnippet}
                      className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-[#00F5FF] hover:text-white hover:bg-cyan-400/20 transition-colors cursor-pointer"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-cyan-100/90 overflow-x-auto whitespace-pre-wrap leading-relaxed selection:bg-[#00F5FF]/30 selection:text-white">
                    <code>{selectedSkill.snippet}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  );
}
