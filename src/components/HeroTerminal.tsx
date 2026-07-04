import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Scenario {
  query: string;
  lines: { marker: '✓' | '→' | ' '; text: string }[];
}

const SCENARIOS: Scenario[] = [
  {
    query: 'Why did my AWS bill spike this month?',
    lines: [
      { marker: '✓', text: 'intent → cost_explorer.get_cost_anomalies' },
      { marker: '✓', text: 'assumed role via STS · account 4821****' },
      { marker: '→', text: 'EC2 us-east-1 ↑ 43% — 3 idle g5.xlarge found' },
      { marker: ' ', text: 'est. monthly waste $1,247 · severity HIGH' },
    ],
  },
  {
    query: 'Any critical security findings today?',
    lines: [
      { marker: '✓', text: 'intent → security_hub.get_findings' },
      { marker: '✓', text: 'GuardDuty scan across 4 connected accounts' },
      { marker: '→', text: '2 critical: public S3 bucket · active root key' },
      { marker: ' ', text: 'remediation steps attached · severity CRITICAL' },
    ],
  },
  {
    query: 'Which services are wasting money right now?',
    lines: [
      { marker: '✓', text: 'intent → cost_engine.scan_all — 8 services, parallel' },
      { marker: '✓', text: 'CloudWatch metrics + Pricing API joined' },
      { marker: '→', text: '11 findings ranked by dollar impact' },
      { marker: ' ', text: 'top: unattached EBS volumes · $312/mo · HIGH' },
    ],
  },
];

const TYPE_MS = 42;
const LINE_MS = 380;
const HOLD_MS = 3400;
const PAUSE_BEFORE_RESPONSE_MS = 550;

/**
 * Auto-typing terminal demoing the real product: plain-English questions
 * answered against live AWS accounts. Loops through scenarios; renders the
 * first one statically when reduced motion is preferred.
 */
const HeroTerminal = () => {
  const reduceMotion = useReducedMotion();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [shownLines, setShownLines] = useState(0);

  const scenario = SCENARIOS[scenarioIdx];

  useEffect(() => {
    if (reduceMotion) return;
    let timer: number;
    if (typedChars < scenario.query.length) {
      timer = window.setTimeout(() => setTypedChars((c) => c + 1), TYPE_MS);
    } else if (shownLines < scenario.lines.length) {
      timer = window.setTimeout(
        () => setShownLines((l) => l + 1),
        shownLines === 0 ? PAUSE_BEFORE_RESPONSE_MS : LINE_MS
      );
    } else {
      timer = window.setTimeout(() => {
        setScenarioIdx((i) => (i + 1) % SCENARIOS.length);
        setTypedChars(0);
        setShownLines(0);
      }, HOLD_MS);
    }
    return () => clearTimeout(timer);
  }, [typedChars, shownLines, scenarioIdx, reduceMotion, scenario]);

  const query = reduceMotion ? scenario.query : scenario.query.slice(0, typedChars);
  const lines = reduceMotion ? scenario.lines : scenario.lines.slice(0, shownLines);

  return (
    <div className="glass-card border-glow rounded-2xl overflow-hidden font-mono text-[13px] leading-relaxed select-none">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-muted-foreground text-xs truncate">
          aicloudinsights — natural language → AWS
        </span>
      </div>

      {/* body — fixed min height so the loop never shifts layout */}
      <div className="p-5 min-h-[200px]">
        <div className="flex gap-2">
          <span className="text-primary shrink-0">❯</span>
          <span className="text-foreground break-words">
            {query}
            <span className="inline-block w-[7px] h-[15px] ml-0.5 align-middle bg-primary cursor-blink" />
          </span>
        </div>

        <div className="mt-3 space-y-1.5">
          {lines.map((line, i) => (
            <motion.div
              key={`${scenarioIdx}-${i}`}
              className="flex gap-2"
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className={`shrink-0 w-4 ${
                  line.marker === '✓'
                    ? 'text-primary'
                    : line.marker === '→'
                      ? 'text-sky-400'
                      : ''
                }`}
              >
                {line.marker}
              </span>
              <span
                className={
                  line.marker === '→'
                    ? 'text-foreground'
                    : line.marker === ' '
                      ? 'text-amber-300/90'
                      : 'text-muted-foreground'
                }
              >
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroTerminal;
