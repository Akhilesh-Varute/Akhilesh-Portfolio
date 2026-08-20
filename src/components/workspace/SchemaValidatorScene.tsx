import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';

const payload = [
  { key: 'toolName', value: '"CostBot.query"', rule: 'z.string()' },
  { key: 'tenantId', value: '"4471"', rule: 'z.string().uuid()' },
  { key: 'range', value: '"30d"', rule: 'z.enum([...])' },
];

const PHASES = payload.length + 2; // + "checking" pause + "valid" banner

/**
 * A live-feeling schema-validation demo for the AI Guardrails track:
 * each field of a tool-call payload gets checked against its Zod rule in
 * sequence, then a VALID banner flashes before the loop resets.
 */
const SchemaValidatorScene = () => {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setStep(PHASES - 1);
      return;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % (PHASES + 2)), 1000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const checkedCount = Math.min(step, payload.length);
  const showValid = step >= payload.length + 1;

  return (
    <div className="h-[420px] flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="border border-border bg-background">
          <div className="px-4 py-2 border-b border-border font-mono text-[10px] uppercase tracking-wide text-muted-foreground flex justify-between">
            <span>CostBot.query — rawArguments</span>
            <span className="text-primary">gate.ts</span>
          </div>
          <div className="p-4 font-mono text-[13px] space-y-1">
            <span className="text-muted-foreground">{'{'}</span>
            {payload.map((f, i) => (
              <div key={f.key} className="flex items-center justify-between pl-4">
                <span>
                  <span className="text-primary">{f.key}</span>
                  <span className="text-muted-foreground">: </span>
                  <span>{f.value}</span>
                  {i < payload.length - 1 && <span className="text-muted-foreground">,</span>}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-muted-foreground/60 text-[10px]">{f.rule}</span>
                  <AnimatePresence>
                    {i < checkedCount && (
                      <motion.span
                        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </div>
            ))}
            <span className="text-muted-foreground">{'}'}</span>
          </div>
        </div>

        <div className="h-9 mt-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {showValid ? (
              <motion.p
                key="valid"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                className="font-mono text-xs border border-primary text-primary px-3 py-1.5"
              >
                ✓ schema valid — executing tool call
              </motion.p>
            ) : (
              <motion.p
                key="checking"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                className="font-mono text-xs text-muted-foreground"
              >
                checking {checkedCount}/{payload.length} fields against ToolDefinition…
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SchemaValidatorScene;
