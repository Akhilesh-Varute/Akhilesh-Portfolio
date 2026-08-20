import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const lanes = [
  { id: 'client', label: 'Client', x: 90 },
  { id: 'service', label: 'Service', x: 380 },
  { id: 'cache', label: 'Redis', x: 670 },
];

const steps = [
  { from: 0, to: 1, label: 'GET /cost-report?tenant=4471' },
  { from: 1, to: 2, label: 'GET cache:4471' },
  { from: 2, to: 1, label: 'HIT · 4ms' },
  { from: 1, to: 0, label: '200 OK' },
];

const ROW_Y = [90, 160, 230, 300];

/**
 * A vertical sequence-diagram scene for the Backend Systems track — request
 * arrows travel between Client / Service / Redis lanes in order, one step
 * lighting up at a time, then the whole thing resets and replays.
 */
const SequenceDiagramScene = () => {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setStep(steps.length);
      return;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % (steps.length + 2)), 1100);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="flex items-center justify-center py-4">
      <svg viewBox="0 0 760 360" className="w-full max-w-2xl h-auto" aria-hidden="true">
        {lanes.map((lane) => (
          <g key={lane.id}>
            <rect x={lane.x - 55} y={10} width={110} height={32} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth={1.5} />
            <text x={lane.x} y={30} textAnchor="middle" className="font-mono" fontSize={12} fontWeight={600} fill="hsl(var(--foreground))">
              {lane.label}
            </text>
            <line x1={lane.x} y1={42} x2={lane.x} y2={330} stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="3 4" />
          </g>
        ))}

        {steps.map((s, i) => {
          const fromX = lanes[s.from].x;
          const toX = lanes[s.to].x;
          const y = ROW_Y[i];
          const drawn = step > i;
          const drawing = step === i;
          const dir = toX > fromX ? 1 : -1;

          return (
            <g key={i} opacity={drawn || drawing ? 1 : 0.12}>
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
