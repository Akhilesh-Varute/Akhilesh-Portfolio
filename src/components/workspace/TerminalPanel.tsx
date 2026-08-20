import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Line = { icon: string; text: string; tone?: 'default' | 'warn' | 'ok' | 'dim' };

const script: Line[] = [
  { icon: '·', text: 'the portfolio — type `help`, or press a key below', tone: 'dim' },
  { icon: '❯', text: 'open workspace' },
  { icon: '·', text: 'opening the workspace', tone: 'dim' },
  { icon: '❯', text: 'gate validate --tool cloud.query' },
  { icon: '·', text: 'checking rawArguments against ToolDefinition schema', tone: 'dim' },
  { icon: '✓', text: 'validation passed — 0 issues', tone: 'ok' },
  { icon: '!', text: 'circuit breaker: 0/3 consecutive failures', tone: 'warn' },
  { icon: '✓', text: 'cloudformation: stack updated, ecs 3/3 tasks healthy', tone: 'ok' },
  { icon: '·', text: 'agentic-gate — 100% test coverage · v1.4.0', tone: 'dim' },
];

const toneClass: Record<NonNullable<Line['tone']>, string> = {
  default: 'text-[#e8e2d4]',
  dim: 'text-[#7d7668]',
  ok: 'text-[#7ed08a]',
  warn: 'text-[#f0b93a]',
};

const TerminalPanel = () => {
  const [count, setCount] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setCount(script.length);
      return;
    }
    const id = setInterval(() => {
      setCount((c) => (c >= script.length ? 1 : c + 1));
    }, 1400);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const visible = script.slice(0, count);

  return (
    <div className="border border-border">
      <div className="bg-[#161311] px-4 py-2.5 border-b border-white/10 font-mono text-[11px] text-[#8a8378] flex items-center justify-between">
        <span>CLAUDE CODE · COPILOT · CURSOR</span>
        <span>LIVE · NEVER FINISHED</span>
      </div>

      <div className="bg-[#141110] px-5 py-5 min-h-[220px]">
        {visible.map((line, i) => (
          <p key={i} className={`font-mono text-[13px] leading-relaxed ${toneClass[line.tone ?? 'default']}`}>
            <span className="inline-block w-4 text-primary">{line.icon}</span>
            {line.text}
          </p>
        ))}
      </div>

      <div className="bg-[#161311] px-4 py-3 border-t border-white/10 flex items-center justify-between">
        <span className="font-mono text-[11px] text-[#8a8378]">
          {count} / {script.length} opened
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCount((c) => (c >= script.length ? 1 : c + 1))}
            className="font-mono text-[11px] border border-white/15 text-[#e8e2d4] px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
          >
            NEXT
          </button>
          <button
            type="button"
            onClick={() => setCount(1)}
            className="font-mono text-[11px] border border-white/15 text-[#e8e2d4] px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalPanel;
