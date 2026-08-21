import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';

// Isometric "product being built" background for the Hero — a base plate
// with a few blocks that slide/drop in from different sides and settle,
// like components landing on a board. Pure SVG (crisp at any size) using
// the standard iso projection: screenX = (x - y) * cos30, screenY = (x +
// y) * sin30 - z. Inspired by the reference PCB-assembly screenshot, but
// abstracted to read as "system assembling itself" rather than literal
// circuitry.

const UNIT = 26;
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

const project = (x: number, y: number, z: number) => ({
  x: (x - y) * COS30 * UNIT,
  y: (x + y) * SIN30 * UNIT - z * UNIT,
});

const pts = (p: { x: number; y: number }[]) => p.map((v) => `${v.x},${v.y}`).join(' ');

// Renders the three visible faces of an axis-aligned box on the iso grid:
// top (x0..x1, y0..y1 at height h), left (x = x0 face), right (y = y1 face).
const isoBoxFaces = (x0: number, y0: number, x1: number, y1: number, z0: number, h: number) => {
  const top = pts([
    project(x0, y0, h),
    project(x1, y0, h),
    project(x1, y1, h),
    project(x0, y1, h),
  ]);
  const left = pts([
    project(x0, y0, h),
    project(x0, y0, z0),
    project(x0, y1, z0),
    project(x0, y1, h),
  ]);
  const right = pts([
    project(x0, y1, h),
    project(x0, y1, z0),
    project(x1, y1, z0),
    project(x1, y1, h),
  ]);
  return { top, left, right };
};

// Base plate footprint, in iso grid units.
const PLATE = { x0: -1, y0: -1, x1: 8.5, y1: 7 };
const plateFaces = isoBoxFaces(PLATE.x0, PLATE.y0, PLATE.x1, PLATE.y1, -0.4, 0);

// Grid lines across the plate top face, clipped to its diamond.
const gridLines = () => {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let x = Math.ceil(PLATE.x0); x <= PLATE.x1; x += 1) {
    const a = project(x, PLATE.y0, 0);
    const b = project(x, PLATE.y1, 0);
    lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
  }
  for (let y = Math.ceil(PLATE.y0); y <= PLATE.y1; y += 1) {
    const a = project(PLATE.x0, y, 0);
    const b = project(PLATE.x1, y, 0);
    lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
  }
  return lines;
};

// Five blocks, each standing in for a real part of the stack the headline
// talks about — not just AI+guardrail+queue in isolation, but the shape of
// an actual event-driven service: an entry point, the model with its
// guardrail cap, the store it reads/writes, and the queue connecting them.
const blocks = [
  {
    // Entry point — where a request first lands. Slides in from the left,
    // opposite QUEUE, so the two "ends" of the request flow read as a pair.
    id: 'api',
    name: 'API',
    faces: isoBoxFaces(-0.6, 4.0, 1.2, 5.6, 0, 0.9),
    labelP: project(-0.6, 4.0, 0.9),
    labelAnchor: 'start' as const,
    labelDx: -4,
    labelDy: -16,
    accent: false,
    from: { x: -170, y: 30 },
    delay: 300,
  },
  {
    // The base block: does the actual work. Labeled from its west corner —
    // its north corner is where GUARDRAIL sits (it caps this block from
    // above).
    id: 'ai',
    name: 'AI',
    faces: isoBoxFaces(1.0, 0.3, 4.0, 3.0, 0, 1.4),
    labelP: project(1.0, 3.0, 1.4),
    labelAnchor: 'end' as const,
    labelDx: -6,
    labelDy: -8,
    accent: false,
    from: { x: 0, y: -140 },
    delay: 0,
  },
  {
    // Sits directly on top of AI's footprint (z0 = AI's own height) and
    // slightly inset, reading as a guardrail layer wrapping the model
    // rather than a separate component next to it. Drops in after AI lands.
    id: 'guardrail',
    name: 'GUARDRAIL',
    faces: isoBoxFaces(1.15, 0.45, 3.85, 2.85, 1.4, 1.85),
    labelP: project(1.15, 0.45, 1.85),
    labelAnchor: 'end' as const,
    labelDx: -6,
    labelDy: -10,
    accent: true,
    from: { x: 0, y: -100 },
    delay: 650,
  },
  {
    // Persistence layer, opposite corner from API — the state AI/guardrail
    // read and write, not just a request/response pair with nothing behind it.
    id: 'store',
    name: 'STORE',
    faces: isoBoxFaces(5.3, -0.4, 7.5, 1.2, 0, 1.1),
    labelP: project(5.3, -0.4, 1.1),
    labelAnchor: 'start' as const,
    labelDx: 6,
    labelDy: -10,
    accent: false,
    from: { x: 170, y: -50 },
    delay: 380,
  },
  {
    // Placed clear of every other block's screen footprint, so it doesn't
    // read as nested inside them.
    id: 'queue',
    name: 'QUEUE',
    faces: isoBoxFaces(5.2, 4.2, 7.2, 5.8, 0, 0.9),
    labelP: project(5.2, 4.2, 0.9),
    labelAnchor: 'start' as const,
    labelDx: 6,
    labelDy: -10,
    accent: false,
    from: { x: 160, y: 60 },
    delay: 500,
  },
] as const;

const labels = [{ text: 'BUILD', p: project(PLATE.x1, PLATE.y1, 0), dx: 8, dy: 4, anchor: 'start' as const }];

// A small pulse orbiting a fixed point between API and QUEUE — the "event
// loop" isn't a static label, it's this: something actually moving,
// continuously, independent of the assembly sequence above.
const LOOP_PIVOT = project(2.3, 5.1, 0.05);
const LOOP_RADIUS = 16;

// The headline column runs nearly the full section height, so there's no
// safe horizontal band to bleed under — only the right column's empty
// space below its CTA row. The scene's own sizing/position (below) keeps
// it inside that zone; this mask just softens its top edge into the
// section rather than a hard box line.
const MASK = 'linear-gradient(to bottom, transparent 0%, transparent 58%, black 68%, black 100%)';

const HeroBuildScene = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const loopPivotRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    if (!svg || !group) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const blockEls = group.querySelectorAll<SVGGElement>('.build-block');
    const plateEl = group.querySelector<SVGGElement>('.build-plate');
    const gridEls = group.querySelectorAll<SVGLineElement>('.build-grid-line');
    if (reduceMotion || isMobile) return;

    // The event-loop pulse spins independently of the assembly sequence —
    // it's meant to read as an always-on process, not a one-shot entrance.
    animate(loopPivotRef.current, {
      rotate: '360deg',
      loop: true,
      duration: 3200,
      ease: 'linear',
    });

    utils.set(plateEl, { opacity: 0, scale: 0.92 });
    utils.set(gridEls, { opacity: 0 });
    blockEls.forEach((el) => {
      const dx = el.dataset.fromX ?? '0';
      const dy = el.dataset.fromY ?? '0';
      utils.set(el, { opacity: 0, translateX: `${dx}px`, translateY: `${dy}px` });
    });

    const tl = animate(plateEl, {
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: 700,
      ease: 'outQuad',
    });

    animate(gridEls, {
      opacity: [0, 0.5],
      delay: stagger(12, { start: 150 }),
      duration: 500,
      ease: 'outSine',
    });

    blockEls.forEach((el) => {
      const delay = Number(el.dataset.delay ?? 0) + 300;
      animate(el, {
        opacity: [0, 1],
        translateX: [el.dataset.fromX ?? '0px', '0px'],
        translateY: [
          { to: `${Number(el.dataset.fromY ?? 0) < 0 ? 6 : -4}px`, duration: 420, ease: 'outQuad' },
          { to: '0px', duration: 260, ease: 'outBack' },
        ],
        duration: 620,
        delay,
        ease: 'outQuad',
        onComplete: () => {
          animate(el, {
            translateY: [{ to: '-4px', duration: 1600 }, { to: '0px', duration: 1600 }],
            loop: true,
            ease: 'inOutSine',
          });
        },
      });
    });

    // Gentle parallax: whole scene tilts toward the pointer.
    const section = svg.closest('section');
    let raf = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      // The listener is on the whole section, but rect belongs to the much
      // smaller SVG anchored at its corner — moving the cursor toward the
      // far side of the section produces a raw ratio well outside
      // [-0.5, 0.5], so it must be clamped or the scene drags itself
      // off-screen and gets clipped by the section's overflow-hidden.
      const clamp = (v: number) => Math.min(0.5, Math.max(-0.5, v));
      const px = clamp((e.clientX - rect.left) / rect.width - 0.5);
      const py = clamp((e.clientY - rect.top) / rect.height - 0.5);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        animate(group, {
          translateX: px * 14,
          translateY: py * 8,
          duration: 600,
          ease: 'outQuad',
        });
      });
    };
    section?.addEventListener('pointermove', handlePointerMove);

    return () => {
      tl.pause();
      section?.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(raf);
      utils.remove([plateEl, ...Array.from(gridEls), ...Array.from(blockEls), group, loopPivotRef.current]);
    };
  }, []);

  return (
    <div
      className="hidden md:block absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <svg
        ref={svgRef}
        viewBox="-192 -60 420 280"
        className="absolute right-0 bottom-0 w-[26%] min-w-[380px] max-w-[520px] h-auto"
      >
        <g ref={groupRef}>
          <g className="build-plate">
            <polygon
              points={plateFaces.top}
              style={{ fill: 'hsl(var(--foreground) / 0.06)', stroke: 'hsl(var(--foreground) / 0.3)', strokeWidth: 1 }}
            />
            <polygon points={plateFaces.left} style={{ fill: 'hsl(var(--foreground) / 0.04)', stroke: 'hsl(var(--foreground) / 0.2)', strokeWidth: 1 }} />
            <polygon points={plateFaces.right} style={{ fill: 'hsl(var(--foreground) / 0.03)', stroke: 'hsl(var(--foreground) / 0.2)', strokeWidth: 1 }} />
          </g>

          {gridLines().map((l, i) => (
            <line
              key={i}
              className="build-grid-line"
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              style={{ stroke: 'hsl(var(--foreground) / 0.5)', strokeWidth: 0.5 }}
            />
          ))}

          {blocks.map((b) => (
            <g
              key={b.id}
              className="build-block"
              data-from-x={b.from.x}
              data-from-y={b.from.y}
              data-delay={b.delay}
            >
              <polygon points={b.faces.top} style={{ fill: b.accent ? 'hsl(var(--primary) / 0.22)' : 'hsl(var(--foreground) / 0.32)', stroke: 'hsl(var(--foreground) / 0.65)', strokeWidth: 1 }} />
              <polygon points={b.faces.left} style={{ fill: b.accent ? 'hsl(var(--primary) / 0.55)' : 'hsl(var(--foreground) / 0.22)', stroke: 'hsl(var(--foreground) / 0.5)', strokeWidth: 1 }} />
              <polygon
                points={b.faces.right}
                style={{
                  fill: b.accent ? 'hsl(var(--primary) / 0.88)' : 'hsl(var(--foreground) / 0.26)',
                  stroke: b.accent ? 'hsl(var(--primary))' : 'hsl(var(--foreground) / 0.45)',
                  strokeWidth: 1,
                }}
              />
              <text
                x={b.labelP.x + b.labelDx}
                y={b.labelP.y + b.labelDy}
                textAnchor={b.labelAnchor}
                style={{
                  fill: b.accent ? 'hsl(var(--primary) / 0.9)' : 'hsl(var(--foreground) / 0.45)',
                  fontSize: 9,
                  fontFamily: 'var(--font-mono, monospace)',
                  letterSpacing: '0.08em',
                }}
              >
                {b.name}
              </text>
            </g>
          ))}

          {labels.map((l) => (
            <text
              key={l.text}
              x={l.p.x + l.dx}
              y={l.p.y + l.dy}
              textAnchor={l.anchor}
              style={{
                fill: 'hsl(var(--foreground) / 0.4)',
                fontSize: 9,
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.08em',
              }}
            >
              {l.text}
            </text>
          ))}

          <circle
            cx={LOOP_PIVOT.x}
            cy={LOOP_PIVOT.y}
            r={LOOP_RADIUS}
            style={{ fill: 'none', stroke: 'hsl(var(--foreground) / 0.3)', strokeWidth: 1, strokeDasharray: '2 4' }}
          />
          <g ref={loopPivotRef} style={{ transformOrigin: `${LOOP_PIVOT.x}px ${LOOP_PIVOT.y}px` }}>
            <circle cx={LOOP_PIVOT.x + LOOP_RADIUS} cy={LOOP_PIVOT.y} r={2.5} style={{ fill: 'hsl(var(--primary))' }} />
          </g>
          <text
            x={LOOP_PIVOT.x}
            y={LOOP_PIVOT.y + LOOP_RADIUS + 14}
            textAnchor="middle"
            style={{
              fill: 'hsl(var(--foreground) / 0.4)',
              fontSize: 9,
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.08em',
            }}
          >
            EVENT · LOOP
          </text>
        </g>
      </svg>
    </div>
  );
};

export default HeroBuildScene;
