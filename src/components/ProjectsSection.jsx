import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  X,
  Plus,
  Pencil,
  Trash2,
  Lock,
  Unlock,
  Download,
  RotateCcw,
  Image as ImageIcon,
  ExternalLink,
  Check,
} from 'lucide-react';

const GitHubIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
import { cyberAudio } from '../utils/cyberAudio';
import { ScrollReveal, ScrollDivider } from './ScrollReveal';
import GitHubSection from './GitHubSection';

const STORAGE_KEY = 'sotheavan_projects_v1';
const ADMIN_PIN = '2026';

/* =========================================================================
   3D PERSPECTIVE TILT CARD WITH CURSOR SPOTLIGHT
   ========================================================================= */

function TiltCard({ children, className = '', accent = '#00F5FF' }) {
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

      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(450px circle at ${x.toFixed(0)}px ${y.toFixed(0)}px, ${accent}22, transparent 65%)`;
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
      style={{
        transition:
          'transform 0.18s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.35s ease, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden luxury-glass p-7 sm:p-9 rounded-2xl flex flex-col justify-between group border border-white/[0.08] hover:border-white/[0.22] hover:shadow-[0_24px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(0,245,255,0.14)] cursor-default ${className}`}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0 opacity-0"
      />

      {/* Cyberpunk HUD Corner Brackets */}
      <span className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-white/20 group-hover:border-[#00F5FF]/70 transition-colors select-none pointer-events-none z-10" aria-hidden="true" />
      <span className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/20 group-hover:border-[#00F5FF]/70 transition-colors select-none pointer-events-none z-10" aria-hidden="true" />
      <span className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-white/20 group-hover:border-[#00F5FF]/70 transition-colors select-none pointer-events-none z-10" aria-hidden="true" />
      <span className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-white/20 group-hover:border-[#00F5FF]/70 transition-colors select-none pointer-events-none z-10" aria-hidden="true" />

      <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
    </div>
  );
}

/* =========================================================================
   DEFAULT PROJECTS DATA & ANIMATED PREVIEWS
   ========================================================================= */

const DEFAULT_PROJECTS = [
  {
    id: 'ai-orchestrator',
    category: 'AI and Automation',
    accent: '#00F5FF',
    title: 'AI Workflow Orchestrator',
    subtitle: 'Intelligent Task Pipeline and Prompt System',
    description:
      'A multi-step automation engine built with Python and Node.js that integrates language models to automate document summarization, code analysis, and structured data generation.',
    techStack: ['Python', 'Node.js', 'AI Prompt Engineering', 'REST APIs', 'Git'],
    metrics: [
      { label: 'Role', value: 'Solo Developer' },
      { label: 'Focus', value: 'AI Integration' },
      { label: 'Stack', value: 'Python / Node.js' },
    ],
    highlights: [
      'Structured prompt chaining and schema validation to guarantee deterministic JSON outputs.',
      'Automated file ingestion, batch processing, and markdown report generation.',
      'Extensible pipeline design allowing interchangeable model backends.',
    ],
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'fullstack-platform',
    category: 'Full-Stack Development',
    accent: '#8B5CF6',
    title: 'Full-Stack Web Platform',
    subtitle: 'Component-Driven Application Architecture',
    description:
      'A responsive web application built with React, TypeScript, and Node.js, featuring a modular component architecture, structured REST endpoints, and synchronized client state.',
    techStack: ['React.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Docker'],
    metrics: [
      { label: 'Role', value: 'Full-Stack Dev' },
      { label: 'Focus', value: 'Web Architecture' },
      { label: 'Stack', value: 'React / Node.js' },
    ],
    highlights: [
      'Strict end-to-end type safety with TypeScript across frontend components and backend payloads.',
      'Accessible, mobile-first interface built with Tailwind CSS and responsive layout principles.',
      'Structured RESTful API endpoints with input validation, logging, and error handling.',
    ],
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'creative-scrolly',
    category: 'Frontend UI Development',
    accent: '#00F5FF',
    title: 'Interactive Web Experience',
    subtitle: 'Fluid Motion and Canvas Scrollytelling',
    description:
      'An interactive web interface combining smooth HTML5 Canvas image-sequence scrubbing, procedural Web Audio API synthesis, and structured editorial layouts.',
    techStack: ['React.js', 'JavaScript', 'HTML5 Canvas', 'Web Audio API', 'Tailwind'],
    metrics: [
      { label: 'Role', value: 'Frontend Dev' },
      { label: 'Focus', value: 'User Experience' },
      { label: 'Rendering', value: 'HTML5 Canvas' },
    ],
    highlights: [
      'Smooth frame interpolation synced directly with scroll progress.',
      'Zero external audio dependencies using native Web Audio API synthesis.',
      'Dark glassmorphic UI with high-contrast, readable typography.',
    ],
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'dev-utilities',
    category: 'Developer Tools and Systems',
    accent: '#10B981',
    title: 'Developer Utility and Automation Suite',
    subtitle: 'Containerized Scripts and System Experiments',
    description:
      'A set of command-line tools and Dockerized environments designed to automate routine developer tasks, code formatting, repository scaffolding, and algorithmic explorations in C and Python.',
    techStack: ['Python', 'C', 'Docker', 'Git', 'GitHub'],
    metrics: [
      { label: 'Role', value: 'Systems Dev' },
      { label: 'Focus', value: 'Developer Tools' },
      { label: 'Stack', value: 'Python / C / Docker' },
    ],
    highlights: [
      'Reproducible containerized development workflows using Docker Compose.',
      'Explorations of memory allocation and low-level data structure mechanics in C.',
      'Automated git hook workflows for continuous code quality and linting.',
    ],
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
  },
];

function renderBuiltinPreview(project) {
  if (project.imageUrl) {
    return (
      <div className="relative h-36 sm:h-40 rounded-xl bg-[#08090d]/70 border border-white/[0.1] mb-6 overflow-hidden group-hover:border-[#00F5FF]/40 transition-colors">
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d]/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-200">
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: project.accent }}
            />
            <span className="uppercase">{project.category}</span>
          </span>
          <span className="text-zinc-300">Custom Preview</span>
        </div>
      </div>
    );
  }

  switch (project.id) {
    case 'ai-orchestrator':
      return (
        <div className="relative h-32 sm:h-36 rounded-xl bg-[#08090d]/70 backdrop-blur-sm border border-white/[0.08] mb-6 overflow-hidden flex flex-col justify-between p-3.5 group-hover:border-[#00F5FF]/40 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-ping" />
              <span>Workflow Pipeline</span>
            </span>
            <span className="text-zinc-300">Python &bull; Node.js</span>
          </div>
          <div className="flex items-center justify-center gap-4 my-auto">
            <div className="w-8 h-8 rounded-lg bg-[#00F5FF]/10 border border-[#00F5FF]/30 flex items-center justify-center text-[#00F5FF] text-[10px] font-mono group-hover:scale-110 transition-transform">
              IN
            </div>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#00F5FF] via-purple-500 to-[#00F5FF] relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-[10px] font-mono group-hover:scale-110 transition-transform">
              LLM
            </div>
            <div className="h-[2px] w-12 bg-gradient-to-r from-purple-500 via-[#00F5FF] to-emerald-400 relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] font-mono group-hover:scale-110 transition-transform">
              OUT
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-300 flex justify-between">
            <span>Schema Validated</span>
            <span className="text-emerald-400">Structured JSON</span>
          </div>
        </div>
      );

    case 'fullstack-platform':
      return (
        <div className="relative h-32 sm:h-36 rounded-xl bg-[#08090d]/70 backdrop-blur-sm border border-white/[0.08] mb-6 overflow-hidden flex flex-col justify-between p-3.5 group-hover:border-[#8B5CF6]/40 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-ping" />
              <span>Full-Stack App</span>
            </span>
            <span className="text-zinc-300">React &bull; TypeScript</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-auto">
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-[9px] font-mono text-zinc-400 uppercase">Frontend</div>
              <div className="text-xs font-mono font-semibold text-[#8B5CF6] mt-0.5">Modular UI</div>
            </div>
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-[9px] font-mono text-zinc-400 uppercase">Types</div>
              <div className="text-xs font-mono font-semibold text-white mt-0.5">Strict TS</div>
            </div>
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-[9px] font-mono text-zinc-400 uppercase">Backend</div>
              <div className="text-xs font-mono font-semibold text-emerald-400 mt-0.5">REST API</div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-300 flex justify-between">
            <span>Component Architecture</span>
            <span className="text-zinc-200">Validated Contracts</span>
          </div>
        </div>
      );

    case 'creative-scrolly':
      return (
        <div className="relative h-32 sm:h-36 rounded-xl bg-[#08090d]/70 backdrop-blur-sm border border-white/[0.08] mb-6 overflow-hidden flex flex-col justify-between p-3.5 group-hover:border-[#00F5FF]/40 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
              <span>Canvas Viewport</span>
            </span>
            <span className="text-zinc-300">Frame Sync &bull; 74 Frames</span>
          </div>
          <div className="flex items-end justify-center gap-1.5 my-auto h-10">
            <div className="w-1 bg-[#00F5FF] rounded-full animate-wave-1" />
            <div className="w-1 bg-[#00F5FF]/80 rounded-full animate-wave-2" />
            <div className="w-1 bg-purple-400 rounded-full animate-wave-3" />
            <div className="w-1 bg-purple-400 rounded-full animate-wave-4" />
            <div className="w-1 bg-[#00F5FF] rounded-full animate-wave-5" />
            <div className="w-1 bg-[#00F5FF]/80 rounded-full animate-wave-2" />
            <div className="w-1 bg-purple-400 rounded-full animate-wave-1" />
            <div className="w-1 bg-[#00F5FF] rounded-full animate-wave-4" />
            <div className="w-1 bg-purple-400 rounded-full animate-wave-3" />
          </div>
          <div className="text-[10px] font-mono text-zinc-300 flex justify-between">
            <span>Web Audio &bull; Procedural</span>
            <span className="text-[#00F5FF]">Zero Audio Dependencies</span>
          </div>
        </div>
      );

    case 'dev-utilities':
      return (
        <div className="relative h-32 sm:h-36 rounded-xl bg-[#08090d]/70 backdrop-blur-sm border border-white/[0.08] mb-6 overflow-hidden flex flex-col justify-between p-3.5 group-hover:border-emerald-400/40 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>CLI and Containers</span>
            </span>
            <span className="text-zinc-300">C and Python Tooling</span>
          </div>
          <div className="space-y-1 font-mono text-[10px] my-auto">
            <div className="text-zinc-300 flex items-center gap-1.5">
              <span className="text-emerald-400">$</span>
              <span>docker compose up --build -d</span>
            </div>
            <div className="text-zinc-200 flex items-center gap-1.5 pl-3">
              <span className="text-emerald-400">&#10003;</span>
              <span>container env: python:3.12-slim</span>
            </div>
            <div className="text-zinc-200 flex items-center gap-1.5 pl-3">
              <span className="text-[#00F5FF]">&#10003;</span>
              <span>gcc -O3 memory_alloc.c -o bench</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-300 flex justify-between">
            <span>Reproducible Environments</span>
            <span className="text-emerald-400">Docker Compose</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative h-32 sm:h-36 rounded-xl bg-[#08090d]/70 backdrop-blur-sm border border-white/[0.08] mb-6 overflow-hidden flex flex-col justify-between p-3.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: project.accent }}
              />
              <span>Custom Build</span>
            </span>
            <span className="text-zinc-300 uppercase">{project.category}</span>
          </div>
          <div className="my-auto font-mono text-xs text-zinc-300 space-y-1">
            <div className="text-cyan-300 truncate">&gt; deploy --project &quot;{project.title}&quot;</div>
            <div className="text-zinc-200 text-[11px] truncate">
              Stack: {project.techStack.slice(0, 4).join(', ')}
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-300 flex justify-between">
            <span>Project Preview</span>
            <span style={{ color: project.accent }}>Active</span>
          </div>
        </div>
      );
  }
}

const ACCENT_PRESETS = [
  { label: 'Cyan', hex: '#00F5FF' },
  { label: 'Purple', hex: '#8B5CF6' },
  { label: 'Emerald', hex: '#10B981' },
  { label: 'Amber', hex: '#F59E0B' },
  { label: 'Pink', hex: '#FF2E93' },
];

const EMPTY_FORM = {
  id: '',
  title: '',
  subtitle: '',
  category: 'Full-Stack Application',
  accent: '#00F5FF',
  description: '',
  techStackText: 'React, TypeScript, Supabase, Vercel',
  role: 'Full-Stack Developer',
  focus: 'Product Engineering',
  stackSummary: 'React / SQL',
  highlightsText:
    'Responsive glassmorphic interface with clean architecture.\nAutomated cloud deployment and database integration.',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
};

/* =========================================================================
   PROJECTS SECTION WITH BUILT-IN PROJECT MANAGER
   ========================================================================= */

export default function ProjectsSection() {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROJECTS;
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [exportedToast, setExportedToast] = useState(false);

  // Sync projects to localStorage automatically
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // ignore quota errors
    }
  }, [projects]);

  // Close top-most active modal on Escape
  useEffect(() => {
    if (!selectedProject && !pinModalOpen && !editorOpen) return;
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (editorOpen) setEditorOpen(false);
      else if (pinModalOpen) setPinModalOpen(false);
      else if (selectedProject) setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, pinModalOpen, editorOpen]);

  const handleOpenModal = (project) => {
    cyberAudio.playClick();
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    cyberAudio.playClick();
    setSelectedProject(null);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      cyberAudio.playChime();
      setIsAdmin(true);
      setPinModalOpen(false);
      setPinInput('');
      setPinError('');
    } else {
      cyberAudio.playClick();
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  const openAddForm = () => {
    cyberAudio.playClick();
    setEditingId(null);
    setFormState(EMPTY_FORM);
    setEditorOpen(true);
  };

  const openEditForm = (proj) => {
    cyberAudio.playClick();
    setEditingId(proj.id);
    setFormState({
      id: proj.id,
      title: proj.title || '',
      subtitle: proj.subtitle || '',
      category: proj.category || '',
      accent: proj.accent || '#00F5FF',
      description: proj.description || '',
      techStackText: (proj.techStack || []).join(', '),
      role: proj.metrics?.[0]?.value || 'Developer',
      focus: proj.metrics?.[1]?.value || 'Engineering',
      stackSummary: proj.metrics?.[2]?.value || 'Full-Stack',
      highlightsText: (proj.highlights || []).join('\n'),
      imageUrl: proj.imageUrl || '',
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
    });
    setEditorOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormState((prev) => ({ ...prev, imageUrl: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!formState.title.trim()) return;
    cyberAudio.playChime();

    const techStack = formState.techStackText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const highlights = formState.highlightsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      id: editingId || `proj-${Date.now()}`,
      title: formState.title.trim(),
      subtitle: formState.subtitle.trim() || 'Custom Built Software',
      category: formState.category.trim() || 'Full-Stack Development',
      accent: formState.accent || '#00F5FF',
      description: formState.description.trim(),
      techStack: techStack.length > 0 ? techStack : ['React', 'TypeScript'],
      metrics: [
        { label: 'Role', value: formState.role.trim() || 'Developer' },
        { label: 'Focus', value: formState.focus.trim() || 'Software Build' },
        { label: 'Stack', value: formState.stackSummary.trim() || 'Full-Stack' },
      ],
      highlights:
        highlights.length > 0 ? highlights : ['Engineered for performance and clean UX.'],
      imageUrl: formState.imageUrl.trim(),
      liveUrl: formState.liveUrl.trim(),
      githubUrl: formState.githubUrl.trim(),
    };

    if (editingId) {
      setProjects((prev) => prev.map((p) => (p.id === editingId ? payload : p)));
    } else {
      setProjects((prev) => [payload, ...prev]);
    }

    setEditorOpen(false);
    setEditingId(null);
  };

  const handleDeleteProject = (id) => {
    cyberAudio.playClick();
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (selectedProject?.id === id) setSelectedProject(null);
  };

  const handleResetDefaults = () => {
    cyberAudio.playClick();
    setProjects(DEFAULT_PROJECTS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleExportJson = () => {
    cyberAudio.playChime();
    const json = JSON.stringify(projects, null, 2);
    navigator.clipboard?.writeText(json).catch(() => {});
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sotheavan-projects.json';
    a.click();
    URL.revokeObjectURL(url);
    setExportedToast(true);
    setTimeout(() => setExportedToast(false), 2500);
  };

  return (
    <section id="projects" className="relative py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10">
      {/* Background Subtle Accent Glow */}
      <div className="ambient-glow bg-[#00F5FF] -top-20 -left-20" />
      <div className="ambient-glow bg-[#8B5CF6] bottom-10 -right-20" />

      {/* Section Header */}
      <div className="relative pb-6 mb-16">
        <ScrollReveal y={16} blur={6} delay={0}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#00F5FF] tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse shadow-[0_0_8px_#00F5FF]" />
                [ SELECTED PROJECTS ]
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-xs font-mono text-zinc-300 tracking-wide">
                Engineering Builds
              </span>
            </div>

            {/* Owner Project Manager Trigger */}
            <div className="flex flex-wrap items-center gap-2">
              {!isAdmin ? (
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playClick();
                    setPinError('');
                    setPinModalOpen(true);
                  }}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-cyan-500/15 border border-white/[0.1] hover:border-cyan-400/50 text-[11px] font-mono text-zinc-200 hover:text-cyan-300 transition-all cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Manage Projects</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={openAddForm}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-[11px] font-semibold transition-all cursor-pointer shadow-[0_0_16px_rgba(0,245,255,0.3)]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-[11px] font-mono text-zinc-200 transition-all cursor-pointer"
                  >
                    {exportedToast ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Exported</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Export JSON</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    title="Reset to default projects"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/40 text-[11px] font-mono text-zinc-200 hover:text-amber-300 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      cyberAudio.playClick();
                      setIsAdmin(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-400/40 text-[11px] font-mono text-emerald-300 transition-all cursor-pointer"
                  >
                    <Unlock className="w-3 h-3" />
                    <span>Lock</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal y={26} blur={10} delay={0.1}>
          <h2 className="font-space font-light text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
            Selected projects. <br />
            <span className="font-normal italic text-zinc-300">Hands-on builds.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal y={20} blur={8} delay={0.18}>
          <p className="font-inter text-sm sm:text-base text-zinc-200 mt-4 max-w-2xl font-normal leading-relaxed">
            A showcase of personal software projects and engineering experiments turning technical curiosity into working, user-facing applications.
          </p>
        </ScrollReveal>
        <ScrollDivider className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.08]" delay={0.16} />
      </div>

      {/* Projects Grid with 3D Tilt Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((proj, idx) => (
          <ScrollReveal
            key={proj.id}
            className="h-full"
            y={32}
            blur={10}
            delay={(idx % 2) * 0.12}
          >
            <TiltCard accent={proj.accent} className="flex flex-col justify-between h-full">
              <div>
                {/* Meta Row + Admin Actions */}
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-zinc-300 tracking-wider">
                    [ FEATURED BUILD ]
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]"
                      style={{ color: proj.accent }}
                    >
                      {proj.category}
                    </span>

                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditForm(proj)}
                          title="Edit Project"
                          className="p-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj.id)}
                          title="Delete Project"
                          className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Animated Visual or Custom Image Preview */}
                {renderBuiltinPreview(proj)}

                {/* Title & Subtitle */}
                <div className="mb-4">
                  <h3 className="font-space font-medium text-2xl sm:text-3xl text-white group-hover:text-[#00F5FF] transition-colors leading-tight">
                    {proj.title}
                  </h3>
                  <div className="text-sm font-inter text-zinc-200 mt-1">{proj.subtitle}</div>
                </div>

                {/* Description */}
                <p className="font-inter text-sm text-zinc-200 leading-relaxed mb-6 font-normal">
                  {proj.description}
                </p>

                {/* Metrics Readout */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-6">
                  {(proj.metrics || []).map((m) => (
                    <div key={m.label} className="text-left min-w-0">
                      <div className="text-[10px] font-mono text-zinc-300 uppercase">{m.label}</div>
                      <div className="text-xs font-mono font-medium text-white mt-1 leading-snug break-words">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {(proj.techStack || []).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-zinc-200 bg-white/[0.03] hover:text-white hover:bg-white/[0.08] px-3 py-1 rounded-full border border-white/[0.04] transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Footer */}
                <div className="pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(proj)}
                    onMouseEnter={() => cyberAudio.playHover()}
                    className="inline-flex items-center gap-2 text-xs font-space font-medium text-white hover:text-[#00F5FF] transition-colors cursor-pointer group/btn"
                  >
                    <span>Project Details and Highlights</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform text-[#00F5FF]" />
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/15 border border-cyan-400/40 text-[11px] font-mono text-cyan-300 hover:bg-cyan-500/25 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Live</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/15 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
                      >
                        <GitHubIcon className="w-3 h-3" />
                        <span>Repo</span>
                      </a>
                    )}
                    {!proj.liveUrl && !proj.githubUrl && (
                      <span className="text-xs font-mono text-zinc-300">Architecture Preview</span>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Integrated Open Source & GitHub Showcase */}
      <GitHubSection />

      {/* ===================================================================
          PROJECT DETAILS MODAL
          =================================================================== */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl luxury-glass p-8 sm:p-10 rounded-2xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto animate-modal-pop"
          >
            <div className="flex items-start justify-between pb-6 mb-8 border-b border-white/[0.08]">
              <div>
                <div
                  className="text-xs font-mono tracking-wider uppercase mb-1 font-semibold"
                  style={{ color: selectedProject.accent }}
                >
                  {selectedProject.category}
                </div>
                <h3 className="font-space font-medium text-3xl text-white">
                  {selectedProject.title}
                </h3>
                <div className="text-sm font-inter text-zinc-200 mt-1">
                  {selectedProject.subtitle}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close project details"
                className="p-2 text-zinc-200 hover:text-white rounded-full bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedProject.imageUrl && (
              <div className="mb-6 rounded-xl overflow-hidden border border-white/10 max-h-64">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-zinc-300 font-inter text-sm leading-relaxed">
              <p>{selectedProject.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                {(selectedProject.metrics || []).map((m) => (
                  <div key={m.label} className="min-w-0">
                    <div className="text-[10px] font-mono text-zinc-300 uppercase">{m.label}</div>
                    <div className="text-xs sm:text-sm font-mono font-medium text-white mt-1 break-words">{m.value}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs font-mono text-zinc-200 uppercase tracking-wider mb-3">
                  Key Implementation Highlights
                </div>
                <div className="space-y-3">
                  {(selectedProject.highlights || []).map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-start gap-3"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: selectedProject.accent }}
                      />
                      <span className="text-zinc-300 text-sm leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-zinc-200 uppercase tracking-wider mb-3">
                  Technologies Applied
                </div>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.techStack || []).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-zinc-300 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(selectedProject.liveUrl || selectedProject.githubUrl) && (
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs font-semibold transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Live Demo</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs transition-all"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                      <span>View Source Code</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          PIN UNLOCK MODAL
          =================================================================== */}
      {pinModalOpen && (
        <div
          onClick={() => setPinModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn"
        >
          <form
            onSubmit={handlePinSubmit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-[#0c1218] border border-cyan-400/35 p-6 shadow-2xl animate-modal-pop"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock Project Manager</span>
              </span>
              <button
                type="button"
                onClick={() => setPinModalOpen(false)}
                aria-label="Close PIN modal"
                className="p-1 rounded-lg text-zinc-200 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <label className="block text-xs font-mono text-zinc-200 mb-2">
              Enter Owner PIN
            </label>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN"
              autoFocus
              className="w-full px-4 py-2.5 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white font-mono tracking-widest text-sm mb-3"
            />
            {pinError && <p className="text-xs font-mono text-rose-400 mb-3">{pinError}</p>}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              Unlock Editor
            </button>
          </form>
        </div>
      )}

      {/* ===================================================================
          ADD / EDIT PROJECT MODAL
          =================================================================== */}
      {editorOpen && (
        <div
          onClick={() => setEditorOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
        >
          <form
            onSubmit={handleSaveProject}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl bg-[#0c1218] border border-cyan-400/35 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-modal-pop space-y-4"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  {editingId ? 'UPDATE EXISTING BUILD' : 'CREATE NEW BUILD'}
                </div>
                <h3 className="font-space font-semibold text-xl text-white mt-0.5">
                  {editingId ? 'Edit Project' : 'Add New Project'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                aria-label="Close project editor"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. AI Smart Portfolio"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  value={formState.category}
                  onChange={(e) => setFormState((p) => ({ ...p, category: e.target.value }))}
                  placeholder="e.g. Full-Stack and AI"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-1.5">
                Subtitle
              </label>
              <input
                type="text"
                value={formState.subtitle}
                onChange={(e) => setFormState((p) => ({ ...p, subtitle: e.target.value }))}
                placeholder="e.g. Real-Time Dashboard and API Integration"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                value={formState.description}
                onChange={(e) => setFormState((p) => ({ ...p, description: e.target.value }))}
                placeholder="Describe what this project does and what problem it solves..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-1.5">
                  Live Demo URL (optional)
                </label>
                <input
                  type="url"
                  value={formState.liveUrl}
                  onChange={(e) => setFormState((p) => ({ ...p, liveUrl: e.target.value }))}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-1.5">
                  GitHub Repo URL (optional)
                </label>
                <input
                  type="url"
                  value={formState.githubUrl}
                  onChange={(e) => setFormState((p) => ({ ...p, githubUrl: e.target.value }))}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono"
                />
              </div>
            </div>

            {/* Cover Image URL or File Upload */}
            <div>
              <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-1.5">
                Cover Image URL or Upload Photo (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={formState.imageUrl}
                  onChange={(e) => setFormState((p) => ({ ...p, imageUrl: e.target.value }))}
                  placeholder="/images/my-project.png or https://..."
                  className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono"
                />
                <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-mono text-zinc-200 cursor-pointer">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {formState.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormState((p) => ({ ...p, imageUrl: '' }))}
                    className="px-3 py-2 rounded-xl bg-rose-500/15 border border-rose-400/30 text-xs font-mono text-rose-300 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-1.5">
                Tech Stack (comma separated)
              </label>
              <input
                type="text"
                value={formState.techStackText}
                onChange={(e) => setFormState((p) => ({ ...p, techStackText: e.target.value }))}
                placeholder="React, Supabase, SQL, Vercel"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-zinc-300 uppercase mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={formState.role}
                  onChange={(e) => setFormState((p) => ({ ...p, role: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-300 uppercase mb-1">
                  Focus
                </label>
                <input
                  type="text"
                  value={formState.focus}
                  onChange={(e) => setFormState((p) => ({ ...p, focus: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-300 uppercase mb-1">
                  Stack Summary
                </label>
                <input
                  type="text"
                  value={formState.stackSummary}
                  onChange={(e) => setFormState((p) => ({ ...p, stackSummary: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-1.5">
                Key Technical Highlights (one per line)
              </label>
              <textarea
                rows={3}
                value={formState.highlightsText}
                onChange={(e) => setFormState((p) => ({ ...p, highlightsText: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a10] border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono resize-none"
              />
            </div>

            {/* Accent Color Swatches */}
            <div>
              <label className="block text-[11px] font-mono text-zinc-200 uppercase mb-2">
                Accent Theme Color
              </label>
              <div className="flex flex-wrap gap-2">
                {ACCENT_PRESETS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setFormState((p) => ({ ...p, accent: c.hex }))}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                      formState.accent === c.hex
                        ? 'bg-white/10 border-white text-white'
                        : 'bg-[#070a10] border-white/10 text-zinc-200 hover:text-white'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-white/15 text-xs font-mono text-zinc-300 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(0,245,255,0.3)] cursor-pointer"
              >
                {editingId ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
