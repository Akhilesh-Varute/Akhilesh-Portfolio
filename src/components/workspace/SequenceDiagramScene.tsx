import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const lanes = [
  { id: 'client', label: 'Client', x: 90 },
  { id: 'service', label: 'Service', x: 380 },
  { id: 'cache', label: 'Redis', x: 670 },
  { id: 'db', label: 'DB', x: 940 },
];

// Two request paths through the same request flow, alternating on each
// replay — a cache hit alone only shows the read path; the miss path is
// where cache invalidation/write-back actually shows up.
const scenarios = [
  {
    label: 'CACHE HIT',
    steps: [
      { from: 0, to: 1, label: 'GET /cost-report?tenant=4471' },
      { from: 1, to: 2, label: 'GET cache:4471' },
      { from: 2, to: 1, label: 'HIT · 4ms' },
      { from: 1, to: 0, label: '200 OK' },
    ],
  },
  {
    label: 'CACHE MISS',
    steps: [
      { from: 0, to: 1, label: 'GET /cost-report?tenant=4471' },
      { from: 1, to: 2, label: 'GET cache:4471' },
      { from: 2, to: 1, label: 'MISS' },
      { from: 1, to: 3, label: 'SELECT … WHERE tenant=4471' },
      { from: 3, to: 1, label: '42 rows · 180ms' },
      { from: 1, to: 2, label: 'SET cache:4471 ttl=60s' },
      { from: 1, to: 0, label: '200 OK' },
    ],
  },
];

const ROW_START = 90;
const ROW_END = 330;

/**
 * A vertical sequence-diagram scene for the Backend Systems track — request
 * arrows travel between Client / Service / Redis / DB lanes in order, one
 * step lighting up at a time. Alternates between the cache-hit and
 * cache-miss paths on each replay instead of only ever showing the happy
 * path.
 */
const SequenceDiagramScene = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const scenario = scenarios[scenarioIndex];

  useEffect(() => {
    if (reduceMotion) {
      setStep(scenario.steps.length);
      return;
    }
    const id = setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next > scenario.steps.length + 1) {
          setScenarioIndex((i) => (i + 1) % scenarios.length);
          return 0;
        }
        return next;
      });
    }, 1100);
    return () => clearInterval(id);
  }, [reduceMotion, scenario.steps.length]);

  const rowY = (i: number, total: number) =>
    total > 1 ? ROW_START + i * ((ROW_END - ROW_START) / (total - 1)) : ROW_START;

  return (
    <div className="flex items-center justify-center py-4">
      <svg viewBox="0 0 1030 360" className="w-full max-w-3xl h-auto" aria-hidden="true">
        <text x={1030} y={22} textAnchor="end" className="font-mono" fontSize={10} letterSpacing="0.08em" fill="hsl(var(--primary))">
          {scenario.label}
        </text>

        {lanes.map((lane) => (
          <g key={lane.id}>
            <rect x={lane.x - 55} y={10} width={110} height={32} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth={1.5} />
            <text x={lane.x} y={30} textAnchor="middle" className="font-mono" fontSize={12} fontWeight={600} fill="hsl(var(--foreground))">
              {lane.label}
            </text>
            <line x1={lane.x} y1={42} x2={lane.x} y2={330} stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="3 4" />
          </g>
        ))}

        {scenario.steps.map((s, i) => {
          const fromX = lanes[s.from].x;
          const toX = lanes[s.to].x;
          const y = rowY(i, scenario.steps.length);
          const drawn = step > i;
          const drawing = step === i;
          const dir = toX > fromX ? 1 : -1;

          return (
            <g key={`${scenarioIndex}-${i}`} opacity={drawn || drawing ? 1 : 0.12}>
              <motion.line
                x1={fromX}
                y1={y}
                y2={y}
                stroke={drawing ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'}
                strokeWidth={1.5}
                initial={{ x2: fromX }}
                animate={{ x2: drawn || drawing ? toX : fromX }}
                transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeInOut' }}
              />
              <motion.polygon
                points={`0,-4 8,0 0,4`}
                fill={drawing ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'}
                initial={{ x: fromX - (dir > 0 ? 8 : 0), y, rotate: dir > 0 ? 0 : 180, opacity: 0 }}
                animate={{
                  x: (drawn || drawing ? toX : fromX) - (dir > 0 ? 8 : 0),
                  y,
                  rotate: dir > 0 ? 0 : 180,
                  opacity: drawn || drawing ? 1 : 0,
                }}
                transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeInOut' }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
              <text x={(fromX + toX) / 2} y={y - 8} textAnchor="middle" className="font-mono" fontSize={11} fill="hsl(var(--muted-foreground))">
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SequenceDiagramScene;
