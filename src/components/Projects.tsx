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
  video?: { src: string; poster: string; caption: string };
}

const projects: Project[] = [
  {
    number: '01',
    title: 'AI Cloud Insights',
    tagline: 'Multi-Cloud GenAI Infrastructure Monitoring & Cost Optimization Platform',
    status: 'ACTIVE · LIVE',
    isCompanyProject: true,
    company: 'Expert Cloud Consulting',
    providers: ['AWS', 'Azure', 'GCP'],
    stack: ['AWS Bedrock', 'Multi-Cloud APIs', 'AWS Lambda', 'EventBridge', 'Node.js', 'Python', 'Amazon ECS'],
    problem:
      'Monitoring infrastructure health and finding cost savings across cloud accounts meant working through separate provider consoles, with fragmented data and heavy manual effort.',
    solution:
      'Architected and deployed a multi-tenant GenAI platform that unifies billing and resource monitoring across AWS, Azure and GCP into a single dashboard, with AWS Bedrock powering natural-language queries.',
    impact: [
      'Built the platform end to end as the sole engineer, then onboarded and led 3 developers ahead of its public launch.',
      'Engineered GenAI bots (SecurityBot, CostBot, Activity Assistant) that use LLM function calling to answer natural-language queries over cloud billing and health APIs.',
      'Ships to production about 13 times a week with a 3.6-minute median deploy time through CI/CD.',
    ],
    links: [{ label: 'Live site', href: 'https://aicloudinsights.ai' }],
    note: 'Proprietary software built at Expert Cloud Consulting (ASCP GPUonCLOUD Pvt Ltd)',
  },
  {
    number: '02',
    title: 'Agentic-Gate',
    tagline: 'Deterministic Guardrails & Schema Validation Engine for LLM Agents',
    status: 'OPEN SOURCE · npm v1.4.0 + PyPI',
    stack: ['TypeScript', 'Python', 'Zod', 'Pydantic', 'GitHub Actions'],
    problem:
      'Non-deterministic tool calling in LLM agents causes execution loops, invalid argument passing, and unnecessary cloud API token expenses.',
    solution:
      'Designed and published a lightweight cross-language validation engine in TypeScript and Python that intercepts agent tool calls locally and enforces schema-based guardrails prior to execution.',
    impact: [
      'Eliminated agent loops by failing fast on invalid LLM tool arguments.',
      'Cut cloud API overhead by reducing unnecessary downstream tool invocations.',
      'Automated dual-registry releases to npm and PyPI via GitHub Actions Trusted Publishers, with automated tests and CI.',
    ],
    video: {
      src: '/videos/agentic-gate-promo.mp4',
      poster: '/videos/agentic-gate-poster.jpg',
      caption: 'agentic-gate in about a minute: the problem, the fix and a reproducible benchmark.',
    },
    links: [
      { label: 'GitHub', href: 'https://github.com/Akhilesh-Varute/agentic-gate' },
      { label: 'npm', href: 'https://www.npmjs.com/package/agentic-gate' },
      { label: 'PyPI', href: 'https://pypi.org/project/agentic-gate/' },
    ],
  },
  {
    number: '03',
    title: 'EcoScheduler',
    tagline: 'Serverless AWS EC2 Cost-Optimization Scheduler',
    status: 'SIDE PROJECT · 2026',
    stack: ['Python', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'EventBridge', 'STS AssumeRole', 'Next.js', 'TypeScript', 'CloudFormation'],
    problem:
      'Unmanaged non-production EC2 instances running 24/7 across multiple client AWS accounts waste compute budgets, while existing tools lack secure cross-account RBAC and dry-run safety modes.',
    solution:
      'Built a multi-tenant serverless scheduler: a Python backend on AWS Lambda, API Gateway, DynamoDB and EventBridge, with a Next.js dashboard, that automates cross-account EC2 stop/start schedules with a full audit trail.',
    impact: [
      'Cross-account EC2 access through AWS STS AssumeRole, with self-service account onboarding via a CloudFormation template (no long-lived credentials).',
      'Three-role RBAC (admin, developer, finance) with a custom JWT Lambda authorizer, per-schedule dry-run mode and audit logging.',
      'Debugged real integration issues along the way: EventBridge UTC schedule sync, Lambda resource policies and DynamoDB attribute serialization.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Akhilesh-Varute/ecoscheduler' }],
  },
  {
    number: '04',
    title: 'Nock',
    tagline: 'A Tiny Native Notch and Top Bar for Windows',
    status: 'OPEN SOURCE · RELEASED · Windows 10/11',
    stack: ['Rust (AI-assisted)', 'GitHub Actions', 'Inno Setup'],
    problem:
      'Windows has no lightweight, native take on the macOS notch and menu bar. Existing options tend to pull in a webview or a runtime, and sit idle burning CPU and memory.',
    solution:
      'Designed and shipped a native Windows notch and top bar. I chose Rust for its tiny footprint and built it with AI coding tools, directing the design and testing. No webview, framework or runtime; it ships as a single small .exe or a per-user installer, with media controls, Wi-Fi and Bluetooth dropdowns, a focus timer, clipboard history and an app launcher.',
    impact: [
      'Event-driven design with no polling loop: about 0% CPU and about 32 MB of memory while idle, in a download of roughly 1 MB.',
      'Automated release pipeline on GitHub Actions that builds the installer on every version tag, with an in-app update check.',
      'Published under the MIT license with a demo, install guide and public issue tracker.',
    ],
    video: {
      src: '/videos/nock-demo.mp4',
      poster: '/videos/nock-poster.jpg',
      caption: 'Nock running on Windows 11: media, focus timer, Wi-Fi and Bluetooth, clipboard.',
    },
    links: [
      { label: 'Live', href: 'https://nock.akhileshvarute.me/' },
      { label: 'GitHub', href: 'https://github.com/Akhilesh-Varute/Nock' },
    ],
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

        {project.video && (
          <figure className="mb-6">
            <video
              className="w-full aspect-video border border-border bg-black"
              src={project.video.src}
              poster={project.video.poster}
              controls
              playsInline
              preload="none"
              aria-label={project.video.caption}
            />
            <figcaption className="font-mono text-[11px] text-muted-foreground mt-2">{project.video.caption}</figcaption>
          </figure>
        )}

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
                className="inline-flex items-center gap-1 font-mono text-xs border border-border px-3 py-1.5 hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
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
        Not tutorials. A live product, published packages and shipped releases.
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
