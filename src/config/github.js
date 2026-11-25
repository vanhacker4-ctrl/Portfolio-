/**
 * =========================================================================
 * CENTRALIZED GITHUB CONFIGURATION
 * =========================================================================
 * Connects the portfolio to your real public GitHub account via REST API.
 */

export const GITHUB_USERNAME = 'vanhacker4-ctrl';
export const GITHUB_PROFILE_URL = 'https://github.com/vanhacker4-ctrl';
export const GITHUB_STARS_URL = 'https://github.com/vanhacker4-ctrl?tab=stars';

export const GITHUB_CONFIG = {
  username: GITHUB_USERNAME,
  profileUrl: GITHUB_PROFILE_URL,
  starsUrl: GITHUB_STARS_URL,
  featuredRepos: ['Portfolio-'],
  maxPublicRepos: 6,
  includeForks: false,
  cacheTtlMs: 15 * 60 * 1000, // 15 minutes (protects unauthenticated 60 req/hr limit)
};
