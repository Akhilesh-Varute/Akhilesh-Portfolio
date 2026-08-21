import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const pipeline = [
  { label: 'Prompt', meta: 'CLAUDE CODE' },
  { label: 'Route', meta: 'MCP · TOOL SELECT' },
  { label: 'Gate', meta: 'AGENTIC-GATE · SCHEMA' },
  { label: 'Deploy', meta: 'CFN · GH ACTIONS' },
  { label: 'Monitor', meta: 'CLOUDWATCH · COST' },
];

const items = [
  {
    n: '01',
    tag: 'AUTOMATION',
    title: 'Infra Automation',
    body: 'CloudFormation templates, CI/CD pipelines, provisioning scaffolding generated and reviewed with AI, off my plate.',
  },
  {
    n: '02',
    tag: 'RESEARCH',
    title: 'Research & Architecture',
    body: 'Comparing AWS, Azure, and GCP tradeoffs, mapping event-driven flows, and surfacing edge cases — before a line of infra code gets written.',
  },
  {
    n: '03',
    tag: 'DEVELOPMENT',
    title: 'Code & Development',
    body: 'Claude Code and GitHub Copilot pairing on Node.js and Python backend services — production-bound, not disposable demos.',
  },
  {
    n: '04',
    tag: 'GUARDRAILS',
    title: 'Guardrails & Testing',
    body: 'Built Agentic-Gate because LLM tool calls need schema validation before they touch real systems — deterministic, not prompt-and-hope. 100% test coverage through v1.4.0 is a fact, not a target.',
  },
  {
    n: '05',
    tag: 'AGENTS',
    title: 'LLM Agents & Tool Orchestration',
    body: 'AWS Bedrock function calling, the SecurityBot / CostBot pair in AI Cloud Insights, structured tool schemas instead of freeform prompting.',
  },
  {
    n: '06',
    tag: 'SYSTEMS',
    title: 'Building Real Systems',
    body: "Not just prompting an API. It's event-driven architecture, multi-tenant isolation, and things staying up.",
  },
];

const PipelineStrip = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex items-center w-full py-8" aria-hidden="true">
      {pipeline.map((step, i) => (
        <div key={step.label} className="flex items-center flex-1 min-w-0">
          <div className="border border-border bg-card px-2 sm:px-4 py-3 w-full min-w-0">
            <p className="font-mono text-xs sm:text-sm font-semibold truncate">{step.label}</p>
            <p className="font-mono text-[9px] sm:text-[10px] text-muted-foreground mt-1 truncate">{step.meta}</p>
          </div>
          {i < pipeline.length - 1 && (
            <div className="relative w-3 sm:w-10 h-px bg-transparent border-t border-dashed border-border mx-1 shrink-0">
              {!reduceMotion && (
                <motion.span
                  className="absolute -top-[3px] w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ left: ['0%', '90%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: i * 0.15 }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const AiWorkflow = () => (
  <section id="ai" className="py-20 rule">
    <div className="wrap">
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <Reveal>
          <p className="eyebrow mb-4">AI workflow</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.05]">
            AI doesn&apos;t ship the system.
            <br />
            <span className="text-muted-foreground">It does the other half.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Using AI daily for faster iteration, safer changes, and shipping production cloud
            systems — not for replacing engineering judgment.
          </p>
        </Reveal>
      </div>

      <PipelineStrip />

      <div className="rule pt-10 mt-2">
        <p className="eyebrow mb-4">The loop</p>
        <h3 className="font-display font-bold text-3xl md:text-4xl mb-2">AI as part of my</h3>
        <h3 className="font-display font-bold text-3xl md:text-4xl text-muted-foreground mb-10">
          everyday workflow.
        </h3>

        <Stagger className="grid sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <StaggerItem key={item.n}>
              <div className="border border-border p-5 h-full hover:border-primary transition-colors duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm text-primary">{item.n}</span>
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                    {item.tag}
                  </span>
                </div>
                <p className="font-display font-semibold text-lg mb-1.5">{item.title}</p>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  </section>
);

export default AiWorkflow;
