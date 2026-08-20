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
  category: string;
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
    category: 'Cloud & AI Architecture',
    isCompanyProject: true,
    company: 'ASCP GPUonCLOUD',
    providers: ['AWS', 'Azure', 'GCP'],
    stack: ['AWS Bedrock', 'Multi-Cloud APIs (AWS, Azure, GCP)', 'AWS Lambda', 'EventBridge', 'Node.js', 'Python', 'Amazon ECS'],
    problem:
      'Managing cost optimization and monitoring across multi-cloud environments required logging into 3 separate provider consoles (AWS, Azure, GCP), creating fragmented data silos and severe operational overhead.',
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
    category: 'Open Source Package',
    stack: ['TypeScript', 'Python', 'Zod', 'Pydantic', 'GitHub Actions', 'npm', 'PyPI'],
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
    category: 'Automation & Microservices',
    stack: ['Node.js', 'n8n', 'Telegram Bot API', 'REST APIs', 'Docker'],
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

const ProjectEntry = ({ project }: { project: Project }) => (
  <Reveal className="rule py-14 first:border-t-0">
    <div className="flex items-baseline gap-4 mb-3">
      <span className="font-mono text-xs text-muted-foreground">{project.number}</span>
      {project.isCompanyProject ? (
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-primary border border-primary/30 px-2.5 py-1">
          <Building2 className="w-3 h-3" />
          Professional work @ {project.company}
        </span>
      ) : (
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          {project.category}
        </span>
      )}
    </div>

    <h3 className="font-display text-3xl md:text-5xl italic mb-2">{project.title}</h3>
    <p className="text-muted-foreground text-base md:text-lg max-w-2xl mb-6">{project.tagline}</p>

    {project.providers && (
      <div className="flex flex-wrap gap-2 mb-4">
        {project.providers.map((p) => (
          <span key={p} className="font-mono text-[11px] border border-border px-2.5 py-1">
            {p}
          </span>
        ))}
      </div>
    )}

    <div className="grid md:grid-cols-[1fr_1fr] gap-x-10 gap-y-4 max-w-3xl">
      <p className="font-mono text-sm leading-relaxed text-foreground/85">
        <span className="text-primary block mb-1 text-xs uppercase tracking-wider">
          {project.isCompanyProject ? 'System problem' : 'Problem'}
        </span>
        {project.problem}
      </p>
      <p className="font-mono text-sm leading-relaxed text-foreground/85">
        <span className="text-primary block mb-1 text-xs uppercase tracking-wider">
          {project.isCompanyProject ? 'Architecture' : 'Solution'}
        </span>
        {project.solution}
      </p>
    </div>

    <ul className="space-y-2 mt-6 max-w-2xl">
      {project.impact.map((point, i) => (
        <li key={i} className="flex gap-3 font-mono text-sm text-muted-foreground leading-relaxed">
          <span className="text-primary">→</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>

    <div className="flex flex-wrap items-center gap-2 mt-6">
      {project.stack.map((tech) => (
        <span key={tech} className="font-mono text-[11px] text-muted-foreground border border-border px-2 py-1">
          {tech}
        </span>
      ))}
    </div>

    {project.links.length > 0 ? (
      <div className="flex flex-wrap items-center gap-4 mt-6">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-sm text-foreground hover:text-primary link-hover"
          >
            {link.label}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ))}
      </div>
    ) : project.note ? (
      <p className="font-mono text-xs text-muted-foreground italic mt-6">{project.note}</p>
    ) : null}
  </Reveal>
);

const Projects = () => (
  <section id="work" className="py-20">
    <div className="offset-col-wide">
      <p className="eyebrow mb-2">Build</p>
      <h2 className="font-display italic text-4xl md:text-6xl mb-2">Selected work</h2>

      <div>
        {projects.map((project) => (
          <ProjectEntry key={project.title} project={project} />
        ))}
      </div>

      <p className="pt-6">
        <a
          href="https://github.com/Akhilesh-Varute"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          More on GitHub
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </p>
    </div>
  </section>
);

export default Projects;
