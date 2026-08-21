import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const stages = [
  { label: 'PLAN', detail: 'scoping the ticket, mapping edge cases' },
  { label: 'BUILD', detail: 'implementing against the service contract' },
  { label: 'REVIEW', detail: 'PR open, CI running, review requested' },
  { label: 'SHIP', detail: 'merged, deployed, dashboards green' },
];

const checklist = [
  { sign: '✓', text: 'Unit tests added', tone: 'text-[#3f8a5c]' },
  { sign: '✓', text: 'CI passing', tone: 'text-[#3f8a5c]' },
  { sign: '~', text: '1 review comment addressed', tone: 'text-primary' },
];

/**
 * A lightweight delivery-loop scene for the Experience section — how a
 * ticket actually moves from plan to shipped, not a CloudFormation-specific
 * deploy (that's a real part of the job, but not the whole of it).
 */
const DeployPipelineScene = () => {
  const [stage, setStage] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setStage(stages.length - 1);
      return;
    }
    const id = setInterval(() => setStage((s) => (s + 1) % stages.length), 1500);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="flex flex-col items-center py-4 gap-8">
      <div className="w-full">
        <div className="flex items-center">
          {stages.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-4 h-4 rounded-full border-2 border-foreground"
                  animate={{
                    backgroundColor: i <= stage ? 'hsl(var(--primary))' : 'hsl(var(--background))',
                    scale: i === stage ? 1.25 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span className={`font-mono text-[11px] ${i === stage ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
              {i < stages.length - 1 && (
                <div className="flex-1 h-px bg-border mx-2 relative -translate-y-3">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary"
                    animate={{ width: i < stage ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="h-6 mt-6 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stage}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              className="font-mono text-xs text-muted-foreground"
            >
              {stages[stage].detail}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full border border-border bg-background">
        <div className="px-4 py-2 border-b border-border font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          PR #482 — checklist
        </div>
        <div className="p-4 font-mono text-[12px] space-y-1.5">
          {checklist.map((line, i) => (
            <motion.p
              key={line.text}
              className={line.tone}
              initial={reduceMotion ? undefined : { opacity: 0, x: -6 }}
              animate={{ opacity: stage >= 2 ? 1 : 0.15, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            >
              {line.sign} {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeployPipelineScene;
