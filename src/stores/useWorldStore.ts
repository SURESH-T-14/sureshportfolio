import { create } from 'zustand';

export interface ChapterBounds {
  id: string;
  start: number;
  end: number;
  /**
   * 'stage' = tall wrapper with a `sticky` inner viewport-height frame (the
   * camera scrubs through an extended pinned scroll range — used by every
   * cinematic GLB scene). 'flow' = an ordinary ~viewport-height section
   * that simply scrolls past (used by the plain content chapters).
   * See useWorldTimeline for how each mode is measured.
   */
  mode: 'stage' | 'flow';
}

/**
 * Chapter boundaries as fractions (0..1) of the full page scroll range —
 * the full Act I-VI story spine. Order here MUST match DOM render order in
 * page.tsx (see useWorldTimeline: each chapter's progress is measured from
 * its own DOM anchor's actual scroll position, so a mismatch between this
 * declared order and the real render order desyncs the camera from what's
 * on screen).
 */
export const CHAPTERS: ChapterBounds[] = [
  // Act I — The Arrival
  { id: 'tunnel', start: 0, end: 0.055, mode: 'stage' },
  { id: 'elevator', start: 0.055, end: 0.1, mode: 'stage' },
  // Act II — Discovering the Facility
  { id: 'helmet', start: 0.1, end: 0.16, mode: 'stage' },
  { id: 'about', start: 0.16, end: 0.205, mode: 'flow' },
  { id: 'reactor', start: 0.205, end: 0.275, mode: 'stage' },
  { id: 'pillar-hall', start: 0.275, end: 0.335, mode: 'stage' },
  { id: 'bridge', start: 0.335, end: 0.385, mode: 'stage' },
  // Act III — Command Center
  { id: 'command-center', start: 0.385, end: 0.455, mode: 'stage' },
  // 'stage': Skills is a pinned single-card-at-a-time carousel (like
  // Projects), not a scrolling list — each category gets its own frame,
  // in sync with the active data cube highlighted in the 3D scene.
  { id: 'lab', start: 0.455, end: 0.525, mode: 'stage' },
  { id: 'server-core', start: 0.525, end: 0.575, mode: 'stage' },
  // Act IV — Your Work
  { id: 'projects', start: 0.575, end: 0.675, mode: 'stage' },
  { id: 'global-network', start: 0.675, end: 0.725, mode: 'stage' },
  { id: 'ai-assistant', start: 0.725, end: 0.775, mode: 'stage' },
  // Act V — Your Journey
  { id: 'experience', start: 0.775, end: 0.82, mode: 'flow' },
  { id: 'certificates', start: 0.82, end: 0.865, mode: 'flow' },
  { id: 'contact', start: 0.865, end: 0.91, mode: 'flow' },
  // Act VI — The End
  { id: 'observation-deck', start: 0.91, end: 0.96, mode: 'stage' },
  { id: 'shutdown', start: 0.96, end: 1, mode: 'stage' },
];

interface WorldState {
  globalProgress: number;
  setGlobalProgress: (v: number) => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  globalProgress: 0,
  setGlobalProgress: (v) => set({ globalProgress: v }),
}));

/** Local progress (0..1) through a given chapter, derived from globalProgress. */
export function chapterProgress(globalProgress: number, chapter: ChapterBounds): number {
  const span = chapter.end - chapter.start;
  if (span <= 0) return 0;
  const raw = (globalProgress - chapter.start) / span;
  return Math.min(1, Math.max(0, raw));
}
