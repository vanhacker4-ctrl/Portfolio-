import React, { useEffect, useRef, useState } from 'react';
import {
  Star,
  GitFork,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  Activity,
  MapPin,
  Users,
  FolderGit2,
  Sparkles,
  Lock,
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { GITHUB_CONFIG } from '../config/github.js';
import { fetchGitHubPortfolioData, LANGUAGE_COLORS } from '../utils/githubApi.js';
import { ScrollReveal } from './ScrollReveal';

/* =========================================================================
   ANIMATED CYBERPUNK GITHUB ICON
   ========================================================================= */

function AnimatedGitHubIcon({ size = 'md' }) {
  const dims = size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  const svgDims = size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';

  return (
    <div className={`relative ${dims} flex items-center justify-center shrink-0`}>
      <span
        className="absolute inset-0 rounded-full border border-dashed border-cyan-400/50 animate-spin-slow"
        aria-hidden="true"
      />
      <span
        className="absolute inset-1 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 blur-sm animate-pulse"
        aria-hidden="true"
      />
      <div className="relative w-full h-full rounded-full bg-[#070b12]/90 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_18px_rgba(0,245,255,0.25)]">
        <svg className={`${svgDims} text-white`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      </div>
    </div>
  );
}

/* =========================================================================
   HOLOGRAPHIC 3D TILT GLASS CARD
   ========================================================================= */

function HoloRepoCard({ children, className = '', accent = '#00F5FF' }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width - 0.5) * 2;
    const ny = (y / rect.height - 0.5) * 2;
    setMousePos({ x, y });
    setTilt({ rx: -ny * 3, ry: nx * 3 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        cyberAudio.playHover();
        setIsHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1100px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) translateY(-4px)`
          : 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.14s cubic-bezier(0.2, 0, 0.2, 1)'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-2xl p-[1px] overflow-hidden shadow-[0_22px_50px_-15px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Dynamic Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, ${accent}, rgba(255,255,255,0.08) 58%)`
            : `linear-gradient(135deg, ${accent}38 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)`,
        }}
      />

      {/* Inner Holographic Glass */}
      <div className="relative h-full w-full rounded-[15px] cyber-panel-hud p-6 flex flex-col justify-between overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${accent}20, transparent 65%)`,
          }}
        />
        <span className="pointer-events-none absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-white/20 group-hover:border-[#00F5FF]/75 transition-colors select-none z-10" aria-hidden="true" />
        <span className="pointer-events-none absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/20 group-hover:border-[#00F5FF]/75 transition-colors select-none z-10" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-white/20 group-hover:border-[#00F5FF]/75 transition-colors select-none z-10" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-white/20 group-hover:border-[#00F5FF]/75 transition-colors select-none z-10" aria-hidden="true" />
        <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
      </div>
    </div>
  );
}

function formatRelativeTime(isoDate) {
  if (!isoDate) return '';
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

/* =========================================================================
   MAIN GITHUB INTEGRATION SECTION
   ========================================================================= */

export default function GitHubSection() {
  const [state, setState] = useState({
    status: GITHUB_CONFIG.username?.trim() ? 'loading' : 'unconfigured',
    profile: null,
    repos: [],
    featuredRepos: [],
    events: [],
    rateLimit: null,
    fromCache: false,
    cachedAt: null,
    error: null,
  });
  const [activeLanguage, setActiveLanguage] = useState('ALL');

  const loadGitHub = async ({ forceRefresh = false } = {}) => {
    if (!GITHUB_CONFIG.username?.trim()) {
      setState((prev) => ({ ...prev, status: 'unconfigured', error: null }));
      return;
    }

    setState((prev) => ({ ...prev, status: 'loading', error: null }));
    const result = await fetchGitHubPortfolioData({ forceRefresh });
    setState(result);
  };

  useEffect(() => {
    loadGitHub();
  }, []);

  const configuredProfileUrl =
    (GITHUB_CONFIG.profileUrl || '').trim() || state.profile?.html_url || '';

  const availableLanguages = Array.from(
    new Set(state.repos.map((r) => r.language).filter(Boolean))
  ).slice(0, 6);

  const visibleRepos = (
    activeLanguage === 'ALL'
      ? state.repos
      : state.repos.filter((r) => r.language === activeLanguage)
  ).slice(0, GITHUB_CONFIG.maxPublicRepos);

  const statusBadge = (() => {
    switch (state.status) {
      case 'loading':
        return { label: 'Syncing API', color: '#00F5FF' };
      case 'ready':
        return { label: state.fromCache ? 'Cached Data' : 'Live API Connected', color: '#10B981' };
      case 'rate_limited_cached':
        return { label: 'Rate Limited (Cached)', color: '#F59E0B' };
      case 'error_cached':
        return { label: 'Offline (Cached)', color: '#F59E0B' };
      case 'error':
        return { label: 'API Error', color: '#EF4444' };
      default:
        return { label: 'Configuration Pending', color: '#A855F7' };
    }
  })();

  if (state.status === 'unconfigured') {
    return null;
  }

  return (
    <div id="github" className="mt-14 pt-10 border-t border-white/[0.08] scroll-mt-28">
      {/* Compact Sub-Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <AnimatedGitHubIcon size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-space font-semibold text-xl sm:text-2xl text-white tracking-tight">
                GitHub and Open Source
              </h3>
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.03] border font-mono text-[10px]"
                style={{
                  borderColor: `${statusBadge.color}40`,
                  color: statusBadge.color,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: statusBadge.color }}
                />
                <span>{statusBadge.label}</span>
              </div>
            </div>
            <p className="font-inter text-xs sm:text-sm text-zinc-300 mt-0.5">
              Public repositories, languages, and recent contribution activity.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            cyberAudio.playClick();
            loadGitHub({ forceRefresh: true });
          }}
          onMouseEnter={() => cyberAudio.playHover()}
          disabled={state.status === 'loading'}
          title="Refresh GitHub Data"
          aria-label="Refresh GitHub Data"
          className="p-2 rounded-full bg-white/[0.04] hover:bg-cyan-400/15 border border-white/[0.1] hover:border-cyan-400/45 text-zinc-300 hover:text-cyan-300 transition-all cursor-pointer disabled:opacity-40"
        >
          <RefreshCw className={`w-4 h-4 ${state.status === 'loading' ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* ===================================================================
         STATE 2: LOADING SKELETON
         =================================================================== */}
      {state.status === 'loading' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
          <div className="lg:col-span-4 h-72 rounded-2xl cyber-panel-hud border border-cyan-400/20 p-6 animate-pulse flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/10" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-2/3 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/[0.06]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-white/[0.06]" />
              <div className="h-3 w-4/5 rounded bg-white/[0.06]" />
            </div>
            <div className="h-10 w-full rounded-xl bg-cyan-400/10" />
          </div>

          <div className="lg:col-span-8 h-72 rounded-2xl cyber-panel-hud border border-purple-400/20 p-6 animate-pulse flex flex-col justify-between">
            <div className="h-4 w-48 rounded bg-white/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-36 rounded-xl bg-white/[0.04]" />
              <div className="h-36 rounded-xl bg-white/[0.04]" />
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
         STATE 3: HARD ERROR (NO CACHE)
         =================================================================== */}
      {state.status === 'error' && (
        <HoloRepoCard accent="#EF4444" className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-red-500/15 border border-red-400/40 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="text-xs font-mono text-red-400 uppercase tracking-wider mb-1">
                  GitHub API Error
                </div>
                <h3 className="font-space font-semibold text-xl text-white mb-1">
                  Unable to load GitHub data
                </h3>
                <p className="font-inter text-sm text-zinc-300">{state.error}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                loadGitHub({ forceRefresh: true });
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-400/15 hover:bg-cyan-400/25 border border-cyan-400/50 text-cyan-200 font-mono text-xs tracking-wide flex items-center gap-2 shrink-0 cursor-pointer transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        </HoloRepoCard>
      )}

      {/* ===================================================================
         STATE 4: LIVE / CACHED GITHUB TELEMETRY
         =================================================================== */}
      {(state.status === 'ready' ||
        state.status === 'rate_limited_cached' ||
        state.status === 'error_cached') &&
        state.profile && (
          <div className="space-y-8">
            {/* Optional Rate-Limit / Stale Cache Warning Banner */}
            {state.error && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/35 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-amber-200">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{state.error}</span>
                </div>
                <button
                  type="button"
                  onClick={() => loadGitHub({ forceRefresh: true })}
                  className="px-3 py-1 rounded-lg bg-amber-400/15 border border-amber-400/40 hover:bg-amber-400/25 text-amber-200 cursor-pointer"
                >
                  Retry
                </button>
              </div>
            )}

            {/* TOP BENTO ROW: PROFILE CARD + FEATURED REPOS & CONTRIBUTION ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
              {/* Left (lg:col-span-4): GitHub Profile Card */}
              <ScrollReveal className="lg:col-span-4" y={28} blur={8} delay={0.08}>
                <HoloRepoCard accent="#00F5FF" className="h-full">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
                      <span className="text-[11px] font-mono text-[#00F5FF] tracking-wider uppercase">
                        GitHub Profile
                      </span>
                      <AnimatedGitHubIcon size="sm" />
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                      {state.profile.avatar_url && (
                        <img
                          src={state.profile.avatar_url}
                          alt={`${state.profile.login} avatar`}
                          className="w-16 h-16 rounded-2xl border-2 border-cyan-400/45 shadow-[0_0_20px_rgba(0,245,255,0.22)] object-cover"
                        />
                      )}
                      <div className="min-w-0">
                        <h3 className="font-space font-bold text-xl text-white truncate">
                          {state.profile.name || state.profile.login}
                        </h3>
                        <div className="font-mono text-xs text-cyan-300 truncate">
                          @{state.profile.login}
                        </div>
                        {state.profile.location && (
                          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 mt-1">
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            <span className="truncate">{state.profile.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {state.profile.bio && (
                      <p className="font-inter text-xs sm:text-sm text-zinc-300/90 leading-relaxed mb-6">
                        {state.profile.bio}
                      </p>
                    )}

                    {/* Real Profile Metrics from GitHub API */}
                    <div className="grid grid-cols-3 gap-2.5 mb-6">
                      <div className="p-3 rounded-xl bg-[#05080d]/85 border border-white/[0.06] text-center">
                        <FolderGit2 className="w-3.5 h-3.5 text-[#00F5FF] mx-auto mb-1" />
                        <div className="font-space font-bold text-lg text-white">
                          {state.profile.public_repos ?? 0}
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400 uppercase">REPOS</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#05080d]/85 border border-white/[0.06] text-center">
                        <Users className="w-3.5 h-3.5 text-purple-400 mx-auto mb-1" />
                        <div className="font-space font-bold text-lg text-white">
                          {state.profile.followers ?? 0}
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400 uppercase">FOLLOWERS</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#05080d]/85 border border-white/[0.06] text-center">
                        <Activity className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
                        <div className="font-space font-bold text-lg text-white">
                          {state.profile.following ?? 0}
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400 uppercase">FOLLOWING</div>
                      </div>
                    </div>
                  </div>

                  {/* Visit GitHub Profile & Stars Buttons */}
                  <div className="space-y-2.5">
                    {configuredProfileUrl ? (
                      <a
                        href={configuredProfileUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => cyberAudio.playClick()}
                        data-cursor="GITHUB"
                        className="group/ghbtn relative overflow-hidden w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 hover:from-cyan-400/30 hover:to-purple-500/30 border border-cyan-400/55 hover:border-cyan-300 text-white font-mono text-xs font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(0,245,255,0.18)] hover:shadow-[0_0_28px_rgba(0,245,255,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/ghbtn:opacity-100 animate-shimmer transition-opacity" />
                        <span className="relative z-10">Visit GitHub Profile</span>
                        <ExternalLink className="relative z-10 w-3.5 h-3.5 text-cyan-300" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-500 font-mono text-xs uppercase flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Profile URL Not Set</span>
                      </button>
                    )}

                    {GITHUB_CONFIG.starsUrl && (
                      <a
                        href={GITHUB_CONFIG.starsUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => cyberAudio.playClick()}
                        className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] hover:bg-amber-400/10 border border-white/[0.08] hover:border-amber-400/40 text-zinc-300 hover:text-amber-200 font-mono text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-300" />
                        <span>View Starred Repositories</span>
                      </a>
                    )}
                  </div>
                </HoloRepoCard>
              </ScrollReveal>

              {/* Right (lg:col-span-8): Featured Repositories & Optional Contribution Activity */}
              <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
                {/* Featured Repositories */}
                <ScrollReveal y={28} blur={8} delay={0.14} className="flex-1">
                  <div className="h-full rounded-2xl cyber-panel-hud border border-purple-400/25 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                      <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Featured Repositories</span>
                      </span>
                      <span className="text-[10px] font-mono text-zinc-300">
                        {state.featuredRepos.length} Featured
                      </span>
                    </div>

                    {state.featuredRepos.length === 0 ? (
                      <div className="py-6 text-center text-xs font-mono text-zinc-400">
                        No public repositories available to feature for @{state.profile.login}.
                      </div>
                    ) : (
                      <div
                        className={`grid grid-cols-1 ${
                          state.featuredRepos.length > 1 ? 'md:grid-cols-2' : ''
                        } gap-4 flex-1`}
                      >
                        {state.featuredRepos.map((repo) => {
                          const langColor = LANGUAGE_COLORS[repo.language] || '#00F5FF';
                          return (
                            <div
                              key={repo.id}
                              onMouseEnter={() => cyberAudio.playHover()}
                              className="p-5 rounded-xl bg-[#05080d]/85 border border-white/[0.08] hover:border-purple-400/45 transition-all flex flex-col justify-between gap-4"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2.5">
                                  <h4 className="font-space font-semibold text-lg text-white truncate">
                                    {repo.name}
                                  </h4>
                                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30 shrink-0">
                                    Featured
                                  </span>
                                </div>
                                <p className="font-inter text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2">
                                  {repo.description || 'Public software repository hosted on GitHub.'}
                                </p>
                              </div>

                              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/[0.06] gap-3">
                                <div className="flex flex-wrap items-center gap-3.5 text-[11px] font-mono text-zinc-300">
                                  {repo.language && (
                                    <span className="flex items-center gap-1.5">
                                      <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: langColor }}
                                      />
                                      <span>{repo.language}</span>
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1 text-amber-300">
                                    <Star className="w-3.5 h-3.5" />
                                    {repo.stargazers_count}
                                  </span>
                                  <span className="flex items-center gap-1 text-cyan-300">
                                    <GitFork className="w-3.5 h-3.5" />
                                    {repo.forks_count}
                                  </span>
                                  {repo.updated_at && (
                                    <span className="text-zinc-400">
                                      Updated {formatRelativeTime(repo.updated_at)}
                                    </span>
                                  )}
                                </div>

                                <a
                                  href={repo.html_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={() => cyberAudio.playClick()}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/35 text-xs font-mono text-cyan-300 hover:text-white transition-all shrink-0"
                                >
                                  <span>View Repository</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </ScrollReveal>

                {/* Contribution Activity Feed (shown only when real public events exist) */}
                {state.events.length > 0 && (
                  <ScrollReveal y={28} blur={8} delay={0.2}>
                    <div className="rounded-2xl cyber-panel-hud border border-emerald-400/20 p-6">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                        <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5" />
                          <span>Contribution Activity</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-300">
                          Public Events
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {state.events.map((ev) => (
                          <div
                            key={ev.id}
                            className="px-3.5 py-2.5 rounded-xl bg-[#05080d]/85 border border-white/[0.06] flex items-center justify-between gap-3 text-xs font-mono"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/30 text-[9px] text-emerald-300 shrink-0">
                                  {ev.actionLabel}
                                </span>
                                {ev.repoUrl ? (
                                  <a
                                    href={ev.repoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white hover:text-cyan-300 truncate transition-colors"
                                  >
                                    {ev.repoName}
                                  </a>
                                ) : (
                                  <span className="text-zinc-300 truncate">{ev.repoName}</span>
                                )}
                              </div>
                              <div className="text-[10px] text-zinc-400 truncate mt-1">
                                {ev.detail}
                              </div>
                            </div>
                            <span className="text-[10px] text-zinc-500 shrink-0">
                              {formatRelativeTime(ev.createdAt)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </div>

            {/* BOTTOM BENTO ROW: PUBLIC REPOSITORIES MATRIX (only when additional repos exist beyond featured) */}
            {state.repos.length > state.featuredRepos.length && (
              <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
                  Public Repositories ({state.repos.length})
                </div>

                {availableLanguages.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {['ALL', ...availableLanguages].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          cyberAudio.playClick();
                          setActiveLanguage(lang);
                        }}
                        className={`px-3 py-1 rounded-lg font-mono text-[10px] tracking-wide border transition-all cursor-pointer ${
                          activeLanguage === lang
                            ? 'bg-[#00F5FF] text-[#060b0e] border-[#00F5FF] font-bold shadow-[0_0_14px_rgba(0,245,255,0.4)]'
                            : 'bg-white/[0.04] text-zinc-300 border-white/[0.08] hover:border-cyan-400/45 hover:text-white'
                        }`}
                      >
                        {lang === 'ALL' ? 'All' : lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {visibleRepos.length === 0 ? (
                <div className="rounded-2xl cyber-panel-hud border border-white/[0.08] p-8 text-center text-sm font-mono text-zinc-300">
                  0 public repositories found{activeLanguage !== 'ALL' ? ` for ${activeLanguage}` : ''}.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleRepos.map((repo, idx) => {
                    const langColor = LANGUAGE_COLORS[repo.language] || '#00F5FF';
                    const isWideLead = idx === 0 && visibleRepos.length >= 4;
                    return (
                      <ScrollReveal
                        key={repo.id}
                        className={isWideLead ? 'md:col-span-2 lg:col-span-2 h-full' : 'h-full'}
                        y={28}
                        blur={8}
                        delay={(idx % 3) * 0.08}
                      >
                        <HoloRepoCard accent={langColor} className="h-full">
                          <div>
                            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                              <span className="text-[10px] font-mono text-zinc-300 tracking-wider">
                                [ REPOSITORY ]
                              </span>
                              <div className="flex items-center gap-3 text-[11px] font-mono">
                                <span className="flex items-center gap-1 text-amber-300">
                                  <Star className="w-3.5 h-3.5" />
                                  {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-1 text-cyan-300">
                                  <GitFork className="w-3.5 h-3.5" />
                                  {repo.forks_count}
                                </span>
                              </div>
                            </div>

                            <h4 className="font-space font-semibold text-xl text-white group-hover:text-[#00F5FF] transition-colors mb-2 truncate">
                              {repo.name}
                            </h4>
                            <p className="font-inter text-xs sm:text-sm text-zinc-300/90 leading-relaxed mb-5 line-clamp-3">
                              {repo.description || 'No description provided.'}
                            </p>

                            {Array.isArray(repo.topics) && repo.topics.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-5">
                                {repo.topics.slice(0, 3).map((topic) => (
                                  <span
                                    key={topic}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                                  >
                                    #{topic}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                              {repo.language ? (
                                <>
                                  <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: langColor }}
                                  />
                                  <span>{repo.language}</span>
                                </>
                              ) : (
                                <span className="text-zinc-400">Configuration</span>
                              )}
                            </div>

                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => cyberAudio.playClick()}
                              data-cursor="REPO"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/35 hover:border-cyan-300 text-xs font-mono text-cyan-200 hover:text-white transition-all"
                            >
                              <span>View Repository</span>
                              <ExternalLink className="w-3.5 h-3.5 text-[#00F5FF]" />
                            </a>
                          </div>
                        </HoloRepoCard>
                      </ScrollReveal>
                    );
                  })}
                </div>
              )}
              </div>
            )}
          </div>
        )}
    </div>
  );
}
