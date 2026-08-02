// Native scrolling only. An earlier version of this hook used the Lenis
// library to hand-roll smooth scrolling in JavaScript, but JS-driven scroll
// is expensive to keep at 60fps on anything without a very strong GPU —
// it looked fine on Safari/Apple Silicon but caused real jank on Windows
// laptops and Android. The browser's own scrolling is GPU-accelerated and
// effectively free; `scroll-behavior: smooth` in index.css already covers
// anchor-link jumps, so nothing else is needed here.
export function useSmoothScroll() {
  // intentionally a no-op — kept as a hook so App.tsx doesn't need to change
}
