import { GITHUB_CONFIG } from '../config/github.js';

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_PREFIX = 'sotheavan_github_cache_v1_';
const memoryCache = new Map();

export const LANGUAGE_COLORS = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#387EB8',
  C: '#00599C',
  'C++': '#004482',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Shell: '#10B981',
  Rust: '#DEA584',
  Go: '#00ADD8',
  Java: '#B07219',
  Vue: '#41B883',
  Svelte: '#FF3E00',
  Jupyter: '#DA5B0B',
};

function readCache(username) {
  const key = `${CACHE_PREFIX}${username.toLowerCase()}`;
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      memoryCache.set(key, parsed);
      return parsed;
    }
  } catch {
    // Ignore storage access errors (e.g. private browsing)
  }
  return null;
}

function writeCache(username, payload) {
  const key = `${CACHE_PREFIX}${username.toLowerCase()}`;
  memoryCache.set(key, payload);
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(payload));
    }
  } catch {
    // Ignore quota or storage errors
  }
}

function parseRateLimit(headers) {
  if (!headers) return null;
  const limit = headers.get('x-ratelimit-limit');
  const remaining = headers.get('x-ratelimit-remaining');
  const reset = headers.get('x-ratelimit-reset');
  if (limit === null && remaining === null && reset === null) return null;
  return {
    limit: limit !== null ? Number(limit) : null,
    remaining: remaining !== null ? Number(remaining) : null,
    resetAt: reset !== null ? Number(reset) * 1000 : null,
  };
}

export function formatActivityEvent(event) {
  if (!event || !event.type) return null;
  const repoName = event.repo?.name || '';
  const repoUrl = repoName ? `https://github.com/${repoName}` : '';

  let actionLabel = event.type.replace(/Event$/, '');
  let detail = '';

  switch (event.type) {
    case 'PushEvent': {
      const count = event.payload?.size ?? event.payload?.commits?.length;
      const branch = event.payload?.ref?.replace('refs/heads/', '');
      actionLabel = 'PUSH';
      detail =
        typeof count === 'number' && count > 0
          ? `${count} commit${count > 1 ? 's' : ''}${branch ? ` → ${branch}` : ''}`
          : branch
          ? `Branch ${branch}`
          : 'Code pushed';
      break;
    }
    case 'CreateEvent': {
      const refType = event.payload?.ref_type || 'resource';
      const ref = event.payload?.ref;
      actionLabel = 'CREATE';
      detail = ref ? `${refType}: ${ref}` : `Created ${refType}`;
      break;
    }
    case 'PullRequestEvent': {
      actionLabel = 'PR';
      detail = event.payload?.action
        ? `${event.payload.action} pull request`
        : 'Pull request activity';
      break;
    }
    case 'IssuesEvent': {
      actionLabel = 'ISSUE';
      detail = event.payload?.action
        ? `${event.payload.action} issue`
        : 'Issue activity';
      break;
    }
    case 'WatchEvent': {
      actionLabel = 'STAR';
      detail = 'Starred repository';
      break;
    }
    case 'ForkEvent': {
      actionLabel = 'FORK';
      detail = 'Forked repository';
      break;
    }
    case 'ReleaseEvent': {
      actionLabel = 'RELEASE';
      detail = event.payload?.release?.tag_name || 'Published release';
      break;
    }
    default:
      actionLabel = actionLabel.toUpperCase();
      detail = 'Public repository activity';
  }

  return {
    id: event.id,
    actionLabel,
    repoName,
    repoUrl,
    detail,
    createdAt: event.created_at,
  };
}

export async function fetchGitHubPortfolioData({ forceRefresh = false } = {}) {
  const username = (GITHUB_CONFIG.username || '').trim();

  if (!username) {
    return {
      status: 'unconfigured',
      profile: null,
      repos: [],
      featuredRepos: [],
      events: [],
      rateLimit: null,
      fromCache: false,
      error: null,
    };
  }

  const cached = readCache(username);
  const now = Date.now();
  const isCacheFresh = cached && now - cached.timestamp < GITHUB_CONFIG.cacheTtlMs;

  if (!forceRefresh && isCacheFresh) {
    return {
      status: 'ready',
      profile: cached.profile,
      repos: cached.repos,
      featuredRepos: selectFeaturedRepos(cached.repos),
      events: cached.events,
      rateLimit: cached.rateLimit,
      fromCache: true,
      cachedAt: cached.timestamp,
      error: null,
    };
  }

  const headers = {
    Accept: 'application/vnd.github+json',
  };

  try {
    const encodedUser = encodeURIComponent(username);
    const [profileRes, reposRes, eventsRes] = await Promise.all([
      fetch(`${GITHUB_API_BASE}/users/${encodedUser}`, { headers }),
      fetch(`${GITHUB_API_BASE}/users/${encodedUser}/repos?sort=updated&per_page=100&type=owner`, {
        headers,
      }),
      fetch(`${GITHUB_API_BASE}/users/${encodedUser}/events/public?per_page=15`, { headers }),
    ]);

    const rateLimit =
      parseRateLimit(profileRes.headers) ||
      parseRateLimit(reposRes.headers) ||
      parseRateLimit(eventsRes.headers);

    // Rate limit protection
    if (profileRes.status === 403 || profileRes.status === 429 || reposRes.status === 403 || reposRes.status === 429) {
      const resetText = rateLimit?.resetAt
        ? new Date(rateLimit.resetAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'shortly';

      if (cached) {
        return {
          status: 'rate_limited_cached',
          profile: cached.profile,
          repos: cached.repos,
          featuredRepos: selectFeaturedRepos(cached.repos),
          events: cached.events,
          rateLimit,
          fromCache: true,
          cachedAt: cached.timestamp,
          error: `GitHub API rate limit reached (resets at ${resetText}). Showing cached data.`,
        };
      }

      return {
        status: 'error',
        profile: null,
        repos: [],
        featuredRepos: [],
        events: [],
        rateLimit,
        fromCache: false,
        error: `GitHub API rate limit exceeded. Please retry after ${resetText}.`,
      };
    }

    if (profileRes.status === 404) {
      return {
        status: 'error',
        profile: null,
        repos: [],
        featuredRepos: [],
        events: [],
        rateLimit,
        fromCache: false,
        error: `GitHub user "${username}" was not found.`,
      };
    }

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API returned HTTP ${!profileRes.ok ? profileRes.status : reposRes.status}`);
    }

    const profileData = await profileRes.json();
    const rawRepos = await reposRes.json();
    const rawEvents = eventsRes.ok ? await eventsRes.json() : [];

    const filteredRepos = (Array.isArray(rawRepos) ? rawRepos : [])
      .filter((repo) => GITHUB_CONFIG.includeForks || !repo.fork)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

    const formattedEvents = (Array.isArray(rawEvents) ? rawEvents : [])
      .map(formatActivityEvent)
      .filter(Boolean)
      .slice(0, 6);

    const cachePayload = {
      timestamp: Date.now(),
      profile: profileData,
      repos: filteredRepos,
      events: formattedEvents,
      rateLimit,
    };

    writeCache(username, cachePayload);

    return {
      status: 'ready',
      profile: profileData,
      repos: filteredRepos,
      featuredRepos: selectFeaturedRepos(filteredRepos),
      events: formattedEvents,
      rateLimit,
      fromCache: false,
      cachedAt: cachePayload.timestamp,
      error: null,
    };
  } catch (err) {
    if (cached) {
      return {
        status: 'error_cached',
        profile: cached.profile,
        repos: cached.repos,
        featuredRepos: selectFeaturedRepos(cached.repos),
        events: cached.events,
        rateLimit: cached.rateLimit,
        fromCache: true,
        cachedAt: cached.timestamp,
        error: err?.message || 'Network error while contacting GitHub API. Showing cached data.',
      };
    }

    return {
      status: 'error',
      profile: null,
      repos: [],
      featuredRepos: [],
      events: [],
      rateLimit: null,
      fromCache: false,
      error: err?.message || 'Unable to reach GitHub API.',
    };
  }
}

function selectFeaturedRepos(repos) {
  if (!Array.isArray(repos) || repos.length === 0) return [];

  const pinnedNames = (GITHUB_CONFIG.featuredRepos || [])
    .map((n) => String(n).trim().toLowerCase())
    .filter(Boolean);

  if (pinnedNames.length > 0) {
    const matched = pinnedNames
      .map((name) => repos.find((r) => r.name.toLowerCase() === name))
      .filter(Boolean);
    if (matched.length > 0) return matched.slice(0, 2);
  }

  return repos.slice(0, 2);
}
