import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';

// Full-bleed animated dot grid behind the hero content — inspired by
// animejs.com's own homepage background. Anime.js drives a continuous
// staggered breathing wave from the grid center, and reacts to the
// pointer with a localized ripple, using stagger's grid/from-index math.
const COLS = 20;
const ROWS = 12;
const CELL_COUNT = COLS * ROWS;

// Fades the grid out where the headline/subtext sit (top ~60% of the
// section) and lets it read at full strength in the empty space below,
// so it feels like a full-bleed background without fighting legibility.
const MASK = 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.85) 62%, black 100%)';

const HeroGridBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const dots = container.querySelectorAll<HTMLElement>('.hero-grid-dot');
    if (reduceMotion || isMobile || dots.length === 0) return;

    const breathe = animate(dots, {
      scale: [
        { to: 1.5, duration: 1100 },
        { to: 1, duration: 1100 },
      ],
      opacity: [
        { to: 0.45, duration: 1100 },
        { to: 0.1, duration: 1100 },
      ],
      delay: stagger(45, { grid: [COLS, ROWS], from: 'center' }),
      loop: true,
      ease: 'inOutSine',
    });

    let lastIndex = -1;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const col = Math.floor(((e.clientX - rect.left) / rect.width) * COLS);
      const row = Math.floor(((e.clientY - rect.top) / rect.height) * ROWS);
      if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return;
      const index = row * COLS + col;
      if (index === lastIndex) return;
      lastIndex = index;

      animate(dots, {
        scale: [{ to: 2.2 }, { to: 1, delay: 250 }],
        opacity: [{ to: 0.8 }, { to: 0.1, delay: 250 }],
        delay: stagger(28, { grid: [COLS, ROWS], from: index }),
        duration: 500,
        ease: 'outQuad',
      });
    };

    const section = container.closest('section');
    section?.addEventListener('pointermove', handlePointerMove);

    return () => {
      breathe.pause();
      section?.removeEventListener('pointermove', handlePointerMove);
      utils.remove(dots);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:grid absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        padding: '2rem',
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    >
      {Array.from({ length: CELL_COUNT }).map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          <span
            className="hero-grid-dot block w-[4px] h-[4px] rounded-full bg-foreground"
            style={{ opacity: 0.1 }}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroGridBackground;
