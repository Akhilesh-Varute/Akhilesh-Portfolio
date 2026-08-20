import { ArrowUpRight, Building2 } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  number: string;
  title: string;
  tagline: string;
  status: string;
  isCompanyProject?: boolean;
  company?: string;
  providers?: string[];
  stack: string[];
  problem: string;
  solution: string;
  impact: string[];
  links: ProjectLink[];
  note?: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'AI Cloud Insights',
    tagline: 'Multi-Cloud GenAI Infrastructure Monitoring & Cost Optimization Platform',
    status: 'ACTIVE · LIVE',
    isCompanyProject: true,
    company: 'ASCP GPUonCLOUD',
    providers: ['AWS', 'Azure', 'GCP'],
    stack: ['AWS Bedrock', 'Multi-Cloud APIs', 'AWS Lambda', 'EventBridge', 'Node.js', 'Python', 'Amazon ECS'],
    problem:
      'Managing cost optimization and monitoring across multi-cloud environments required logging into 3 separate provider consoles, creating fragmented data silos and severe operational overhead.',
    solution:
      'Architected and deployed a multi-tenant GenAI platform that unifies billing and resource monitoring metrics across AWS, Azure, and GCP into a single dashboard powered by AWS Bedrock for natural language queries.',
    impact: [
      'Eliminated 3-console context switching by consolidating AWS, Azure, and GCP infrastructure visibility under one roof.',
      'Engineered automated GenAI bots (SecurityBot, CostBot) to process natural language queries across multi-cloud billing and health APIs.',
      'Reduced assessment overhead by 40% and drove 20–30% cloud cost savings across client workloads.',
    ],
    links: [],
    note: 'Proprietary enterprise software built for ASCP GPUonCLOUD',
  },
  {
    number: '02',
    title: 'Agentic-Gate',
    tagline: 'Deterministic Guardrails & Schema Validation Engine for LLM Agents',
    status: 'PACKAGE · npm + PyPI',
    stack: ['TypeScript', 'Python', 'Zod', 'Pydantic', 'GitHub Actions'],
    problem:
      'Non-deterministic tool calling in LLM agents causes execution loops, invalid argument passing, and unnecessary cloud API token expenses.',
    solution:
      'Designed and published a lightweight cross-language validation engine in TypeScript and Python that intercepts agent tool calls locally and enforces schema-based guardrails prior to execution.',
    impact: [
      'Eliminated agent loops by failing fast on invalid LLM tool arguments.',
      'Cut cloud API overhead by reducing unnecessary downstream tool invocations.',
      'Automated dual-registry releases to npm and PyPI via GitHub Actions Trusted Publishers, with 100% test coverage.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Akhilesh-Varute/agentic-gate' },
      { label: 'npm', href: 'https://www.npmjs.com/package/agentic-gate' },
      { label: 'PyPI', href: 'https://pypi.org/project/agentic-gate/' },
    ],
  },
  {
    number: '03',
    title: 'Personal Finance & Expense Automation',
    tagline: 'Event-Driven Natural Language Expense Parsing & Categorization Pipeline',
    status: 'ACTIVE · 2025',
    stack: ['Node.js', 'n8n', 'Telegram Bot API', 'Docker'],
    problem:
      'Manual expense logging creates friction, leading to incomplete or inconsistent personal financial tracking.',
    solution:
      'Built an event-driven automation bot that processes natural language chat messages from Telegram, extracts structured expense data, and categorizes transaction records automatically.',
    impact: [
      'Eliminated manual logging friction using natural language processing.',
      'Engineered reliable webhook pipelines via n8n and Node.js microservices.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Akhilesh-Varute' }],
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <Reveal className="panel">
    <div className="panel-topbar justify-between">
      <span>Portfolio / Work / {project.title}</span>
      <span className="text-primary">{project.status}</span>
    </div>

    <div className="p-6 md:p-8">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="font-mono text-xs text-muted-foreground">{project.number}</span>
            <h3 className="font-display font-bold text-2xl md:text-3xl mt-1">{project.title}</h3>
          </div>
          {project.isCompanyProject && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase border border-primary px-2.5 py-1.5 shrink-0">
              <Building2 className="w-3 h-3" />
              @ {project.company}
            </span>
          )}
        </div>

        <p className="font-mono text-sm text-muted-foreground mb-6 max-w-2xl">{project.tagline}</p>

        {project.providers && (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.providers.map((p) => (
              <span key={p} className="font-mono text-[11px] border border-border px-2.5 py-1">
                {p}
              </span>
            ))}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-primary mb-1.5">Problem</p>
            <p className="font-mono text-sm text-foreground/85 leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-primary mb-1.5">Solution</p>
            <p className="font-mono text-sm text-foreground/85 leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {project.impact.map((point, i) => (
            <li key={i} className="flex gap-3 font-mono text-sm text-muted-foreground leading-relaxed">
              <span className="text-primary">→</span>
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-[11px] text-muted-foreground border border-border px-2 py-1">
              {tech}
            </span>
          ))}
        </div>

        {project.links.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
              >
                {link.label}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
          </div>
        ) : project.note ? (
          <p className="font-mono text-xs text-muted-foreground italic">{project.note}</p>
        ) : null}
      </div>
    </div>
  </Reveal>
);

const Projects = () => (
  <section id="work" className="py-20 rule">
    <div className="wrap">
      <p className="eyebrow mb-4">AI work</p>
      <h2 className="font-display font-bold text-4xl md:text-6xl mb-2">
        Built this way, <span className="text-muted-foreground">and running.</span>
      </h2>
      <p className="font-mono text-sm text-muted-foreground max-w-lg mt-4 mb-14">
        Not experiments. Each of these is in production, published to a registry, or running a
        client's infrastructure.
      </p>

      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
