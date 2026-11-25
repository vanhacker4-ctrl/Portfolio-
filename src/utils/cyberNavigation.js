import { cyberAudio } from './cyberAudio';

/**
 * Triggers the Cyberpunk Glitch Page Transition when navigating between
 * sections or routes, while preserving hash URL routing and accessibility.
 */
export function navigateWithGlitch(href, label = '') {
  if (typeof window === 'undefined') return;

  cyberAudio.playClick();

  const detail = {
    href: href || '#hero',
    label,
  };

  window.dispatchEvent(new CustomEvent('cyber:navigate', { detail }));
}
