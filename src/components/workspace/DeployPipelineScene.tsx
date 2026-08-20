import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const stages = [
  { label: 'PLAN', detail: 'diffing against current stack state' },
  { label: 'DIFF', detail: '+3 resources · ~0 to destroy' },
  { label: 'APPLY', detail: 'ECS service updating, 3/3 tasks' },
  { label: 'VERIFY', detail: 'health checks passing' },
];

const diffLines = [
  { sign: '+', text: 'aws_ecs_service.api', tone: 'text-[#3f8a5c]' },
  { sign: '+', text: 'aws_cloudwatch_alarm.cpu_high', tone: 'text-[#3f8a5c]' },
  { sign: '~', text: 'aws_iam_role_policy.exec', tone: 'text-primary' },
];

/**
 * A CI-style deploy pipeline for the Automation track — a stage tracker
 * that advances on its own, with a small diff panel that fills in as the
 * PLAN/DIFF stages run.
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
    <div className="h-[420px] flex flex-col items-center justify-center px-6 gap-10">
      <div className="w-full max-w-xl">
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

      <div className="w-full max-w-xl border border-border bg-background">
        <div className="px-4 py-2 border-b border-border font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          template.yaml — plan
        </div>
        <div className="p-4 font-mono text-[12px] space-y-1.5">
          {diffLines.map((line, i) => (
            <motion.p
              key={line.text}
              className={line.tone}
              initial={reduceMotion ? undefined : { opacity: 0, x: -6 }}
              animate={{ opacity: stage >= 1 ? 1 : 0.15, x: 0 }}
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
