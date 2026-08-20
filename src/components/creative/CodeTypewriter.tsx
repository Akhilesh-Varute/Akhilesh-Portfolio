import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotionGsap } from '@/hooks/use-reduced-motion-gsap';

type Token = { text: string; cls?: string };

const KEYWORD = 'text-[#f0955a]';
const STRING = 'text-[#8fd4a8]';
const COMMENT = 'text-[#6b7280] italic';
const PUNCT = 'text-[#e8e2d4]/70';
const PLAIN = 'text-[#e8e2d4]';

const lines: Token[][] = [
  [{ text: '// agentic-gate — src/gate.ts', cls: COMMENT }],
  [{ text: 'if', cls: KEYWORD }, { text: ' (this.', cls: PUNCT }, { text: 'isCircuitOpen', cls: PLAIN }, { text: '(toolName)) {', cls: PUNCT }],
  [{ text: '  return', cls: KEYWORD }, { text: ' this.', cls: PUNCT }, { text: 'fail', cls: PLAIN }, { text: '(', cls: PUNCT }],
  [{ text: '    toolName, rawArguments,', cls: PLAIN }],
  [{ text: '    ', cls: PUNCT }, { text: '"circuit-open"', cls: STRING }, { text: ',', cls: PUNCT }],
  [{ text: '    ', cls: PUNCT }, { text: '`Tool failed too many times in a row.`', cls: STRING }],
  [{ text: '  );', cls: PUNCT }],
  [{ text: '}', cls: PUNCT }],
  [{ text: '', cls: PLAIN }],
  [{ text: 'const', cls: KEYWORD }, { text: ' parseResult = tool.schema.', cls: PLAIN }, { text: 'safeParse', cls: PLAIN }, { text: '(rawArguments);', cls: PUNCT }],
  [{ text: 'if', cls: KEYWORD }, { text: ' (!parseResult.success) {', cls: PUNCT }],
  [{ text: '  return', cls: KEYWORD }, { text: ' this.', cls: PUNCT }, { text: 'fail', cls: PLAIN }, { text: '(toolName, rawArguments,', cls: PLAIN }],
  [{ text: '    ', cls: PUNCT }, { text: '"validation"', cls: STRING }, { text: ', formattedError);', cls: PUNCT }],
  [{ text: '}', cls: PUNCT }],
];

const CodeTypewriter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionGsap();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const curtains = gsap.utils.toArray<HTMLSpanElement>('[data-curtain]', section);

      gsap.set(curtains, { scaleX: reduceMotion ? 0 : 1, transformOrigin: 'right center' });

      if (reduceMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      curtains.forEach((c, i) => {
        const len = lines[i].reduce((n, t) => n + t.text.length, 0);
        tl.to(c, { scaleX: 0, duration: Math.max(0.15, len * 0.018), ease: 'none' }, i === 0 ? 0 : '+=0.02');
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="code" className="py-28 md:py-36 px-6">
      <div className="container max-w-4xl mx-auto">
        <p className="eyebrow mb-3">Guardrails, not vibes</p>
        <h2 className="text-3xl md:text-5xl font-medium font-display text-foreground mb-12">
          Deterministic by default
        </h2>

        <div ref={sectionRef} className="rounded-xl overflow-hidden border border-border shadow-lg">
          <div className="flex items-center gap-2 px-5 py-3 bg-[#161311] border-b border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-[#8a8378]">gate.ts</span>
          </div>
          <pre className="bg-[#1a1613] px-6 py-6 overflow-x-auto">
            <code className="font-mono text-[13px] md:text-sm leading-[1.7] block">
              {lines.map((tokens, i) => (
                <span key={i} className="relative flex whitespace-pre">
                  <span aria-hidden="true" className="select-none text-[#5a5248] w-7 shrink-0 text-right pr-3">
                    {i + 1}
                  </span>
                  <span className="relative flex-1">
                    {tokens.map((t, ti) => (
                      <span key={ti} className={t.cls}>
                        {t.text}
                      </span>
                    ))}
                    <span
                      data-curtain
                      className="absolute inset-y-0 right-0 left-0 bg-[#1a1613]"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              ))}
            </code>
          </pre>
        </div>

        <p className="text-muted-foreground text-sm max-w-xl mt-6">
          The actual circuit-breaker and validation gate from{' '}
          <a
            href="https://github.com/Akhilesh-Varute/agentic-gate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary link-hover"
          >
            agentic-gate
          </a>
          — it fails fast on invalid tool arguments before they ever reach execution.
        </p>
      </div>
    </section>
  );
};

export default CodeTypewriter;
