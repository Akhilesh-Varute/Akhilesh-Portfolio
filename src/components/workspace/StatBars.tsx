import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';

const stats = [
  { value: '2+', label: 'Years shipping production cloud systems', heightPct: 35, filled: true },
  { value: '~13', label: 'Production deploys per week through CI/CD', heightPct: 60, filled: true },
  { value: '3.6 min', label: 'Median deploy time (160+ merged PRs)', heightPct: 28, filled: true },
  { value: '2', label: 'Package registries: Agentic-Gate on npm and PyPI', heightPct: 45, filled: false },
];

const StatBars = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="numbers" className="py-20 rule">
      <div className="wrap">
        <p className="eyebrow mb-4">By the numbers</p>
        <Reveal>
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-2">
            Two years, <span className="text-muted-foreground">by the numbers.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono text-sm text-muted-foreground max-w-lg mt-4 mb-16">
            Deploy cadence and published packages, counted instead of described.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-end">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <p className="font-display font-bold text-3xl md:text-4xl mb-3">{stat.value}</p>
              <div className="h-40 flex items-end border-b border-border">
                <motion.div
                  className={`w-full ${stat.filled ? 'hatch-fill bg-primary/10' : 'border border-foreground'}`}
                  style={{ transformOrigin: 'bottom' }}
                  initial={reduceMotion ? undefined : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <div style={{ height: `${stat.heightPct * 1.6}px` }} />
                </motion.div>
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-3 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatBars;
