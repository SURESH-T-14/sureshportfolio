import { useWorldStore, CHAPTERS } from '../stores/useWorldStore';

// Stay mounted/visible slightly before and after a chapter's own scroll
// range so nothing pops in/out abruptly right at the boundary. Proportional
// to the chapter's own span, not a fixed value — a fixed margin (previously
// 0.06) was larger than some chapters' entire span (several are only
// 0.04-0.05), which meant adjacent scenes were BOTH fully visible and
// rendering on top of each other for most of their length, not just at the
// boundary. That's what caused scenes to visibly bleed into one another.
const MARGIN_FRACTION = 0.06;

/**
 * Whether a given chapter's 3D content is worth rendering right now. With
 * 14 full scenes' worth of GLB models + particle fields all coexisting in
 * one persistent canvas, drawing every one of them every frame regardless
 * of scroll position is the single biggest cost in this scene — this is
 * the fix: chapters far from the current scroll position report false and
 * get wrapped in an invisible group (see VisibilityGate), which skips
 * their draw calls (and any nested lights) entirely without unmounting
 * them, so there's no re-creation cost when scrolling back into range.
 */
export function useChapterVisible(chapterId: string): boolean {
  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  return useWorldStore((s) => {
    if (!chapter) return true;
    const margin = (chapter.end - chapter.start) * MARGIN_FRACTION;
    return s.globalProgress >= chapter.start - margin && s.globalProgress <= chapter.end + margin;
  });
}
