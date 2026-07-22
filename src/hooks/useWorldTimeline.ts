import { useLenis } from 'lenis/react';
import { useWorldStore, CHAPTERS } from '../stores/useWorldStore';

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

/**
 * Drives the single shared `globalProgress` value by measuring every
 * chapter's own DOM anchor (`#<chapter.id>`) and summing each chapter's
 * local (0..1) scroll progress weighted by its (end - start) span:
 *
 *   globalProgress = Σ weight(chapter) * local(chapter)
 *
 * Chapters are not all measured the same way — a 'stage' chapter is a tall
 * wrapper with a `sticky` inner frame (progress = how far scrolled through
 * the pinned range), while a 'flow' chapter is an ordinary section that
 * simply passes by (progress = how much of it has scrolled past the top).
 * Because only one chapter is "in progress" at a time in practice (the
 * others sit at a clean 0 or 1), this naturally produces a smooth 0->1
 * ramp across the whole page with no special-casing per chapter.
 */
export function useWorldTimeline() {
  const setGlobalProgress = useWorldStore((s) => s.setGlobalProgress);

  useLenis(() => {
    const viewportHeight = window.innerHeight;
    let progress = 0;

    for (const chapter of CHAPTERS) {
      const el = document.getElementById(chapter.id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const weight = chapter.end - chapter.start;

      let local: number;
      if (chapter.mode === 'stage') {
        const scrollable = rect.height - viewportHeight;
        local = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
      } else {
        local = clamp01(1 - rect.bottom / rect.height);
      }

      progress += weight * local;
    }

    setGlobalProgress(clamp01(progress));
  });
}
