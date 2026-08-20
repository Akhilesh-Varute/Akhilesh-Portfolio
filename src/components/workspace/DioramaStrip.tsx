import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const racks = [40, 130, 220, 310, 430, 520, 610, 700, 820, 910, 1000, 1090, 1200, 1290, 1380];

interface DioramaStripProps {
  index: string;
  title: string;
  subtitle: string;
}

/**
 * A flat, looping "infra diorama" — a row of server racks with blinking
 * status lights and a request packet that continuously travels the line,
 * plus a scroll-linked parallax drift so the skyline itself visibly shifts
 * as the page scrolls, not just on a timer.
 */
const DioramaStrip = ({ index, title, subtitle }: DioramaStripProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start end', 'end start'] });
  const racksX = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <div ref={wrapperRef} className="border-y border-border">
      <div className="flex items-center justify-between px-6 py-2 font-mono text-xs text-muted-foreground">
        <span>
          <span className="text-primary">{index}</span> &nbsp;{title}
          <span className="text-muted-foreground/60"> — {subtitle}</span>
        </span>
        <span className="hidden sm:inline">NEXT PROJECTS</span>
      </div>

      <svg viewBox="0 0 1440 140" className="w-full h-[110px] block" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <line x1="0" y1="120" x2="1440" y2="120" stroke="hsl(var(--border))" strokeWidth="1" />

        <motion.g style={reduceMotion ? undefined : { x: racksX }}>
          {racks.map((x, i) => (
            <g key={x} transform={`translate(${x}, 40)`}>
              <rect x="0" y="0" width="46" height="80" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              {[0, 1, 2, 3].map((row) => (
                <g key={row}>
                  <rect x="6" y={8 + row * 18} width="34" height="10" fill="none" stroke="hsl(var(--foreground) / 0.4)" strokeWidth="1" />
                  <motion.circle
                    cx="34"
                    cy={13 + row * 18}
                    r="1.6"
                    fill="hsl(var(--primary))"
                    animate={reduceMotion ? undefined : { opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: (i * 0.3 + row * 0.2) % 2, ease: 'easeInOut' }}
                  />
                </g>
              ))}
            </g>
          ))}
        </motion.g>

        {!reduceMotion && (
          <motion.circle
            r="5"
            fill="hsl(var(--primary))"
            initial={{ cx: -10, cy: 118 }}
            animate={{ cx: [-10, 1450], cy: [118, 118] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </svg>
    </div>
  );
};

export default DioramaStrip;
