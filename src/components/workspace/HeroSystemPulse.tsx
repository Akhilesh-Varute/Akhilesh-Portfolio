import { motion, useReducedMotion } from 'framer-motion';

// Ambient decoration only — a small "system alive" scene echoing the
// architecture-diagram visual language (flat nodes, dashed edges) used
// elsewhere on the site. Not a real diagram, so it's aria-hidden.
type NodeDef = { id: string; x: number; y: number; ping?: boolean };
type EdgeDef = { from: string; to: string; delay: number };

const nodes: NodeDef[] = [
  { id: 'a', x: 30, y: 40, ping: true },
  { id: 'b', x: 170, y: 18 },
  { id: 'c', x: 320, y: 55, ping: true },
  { id: 'd', x: 270, y: 175 },
  { id: 'e', x: 95, y: 205, ping: true },
  { id: 'f', x: 195, y: 130 },
];

const edges: EdgeDef[] = [
  { from: 'a', to: 'b', delay: 0 },
  { from: 'b', to: 'c', delay: 0.4 },
  { from: 'c', to: 'd', delay: 0.8 },
  { from: 'd', to: 'e', delay: 1.2 },
  { from: 'e', to: 'a', delay: 1.6 },
  { from: 'b', to: 'f', delay: 0.6 },
  { from: 'f', to: 'd', delay: 1.0 },
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

const HeroSystemPulse = () => {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-full"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      {edges.map((e, i) => {
        const from = byId[e.from];
        const to = byId[e.to];
        return (
          <g key={i}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="hsl(var(--foreground) / 0.16)"
              strokeWidth={1}
              strokeDasharray="3 5"
            />
            {!reduceMotion && (
              <motion.circle
                r={2.5}
                fill="hsl(var(--primary))"
                initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                animate={{
                  cx: [from.x, to.x, to.x],
                  cy: [from.y, to.y, to.y],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: e.delay,
                  ease: 'easeInOut',
                  repeatDelay: 1.4,
                }}
              />
            )}
          </g>
        );
      })}

      {nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x - 5}
            y={n.y - 5}
            width={10}
            height={10}
            fill="hsl(var(--background))"
            stroke="hsl(var(--foreground) / 0.35)"
            strokeWidth={1}
          />
          {n.ping && (
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={2}
              fill="hsl(var(--primary))"
              initial={{ scale: 1, opacity: 0.9 }}
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 3.2, 1], opacity: [0.9, 0, 0.9] }
              }
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </g>
      ))}
    </svg>
  );
};

export default HeroSystemPulse;
