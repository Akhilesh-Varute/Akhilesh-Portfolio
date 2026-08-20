import { useEffect, useRef } from 'react';
import { ArrowUpRight, Building2 } from 'lucide-react';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/motion/SectionHeading';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotionGsap } from '@/hooks/use-reduced-motion-gsap';

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
  metrics: string;
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
    metrics: 'Unified 3 major cloud providers under one roof; cut assessment overhead by 40%',
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
    metrics: 'Published to npm & PyPI with 100% test coverage up to v1.4.0',
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
    metrics: 'Automated natural language expense logging and real-time categorization',
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

const ProjectScene = ({ project, index }: { project: Project; index: number }) => {
  const reversed = index % 2 === 1;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionGsap();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(content, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(content, { opacity: 0, y: 70, scale: 0.97 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      tl.to(content, { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: 'power2.out' }, 0)
        .to(content, { opacity: 1 }, 0.32)
        .to(content, { opacity: 0, y: -50, scale: 0.97, duration: 0.28, ease: 'power2.in' }, 0.72);
    }, wrapper);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={wrapperRef} className="relative rule first:border-t-0" style={{ height: '170vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden px-6">
        <div ref={contentRef} className="container max-w-6xl mx-auto">
          <div className={`grid md:grid-cols-12 gap-x-10 gap-y-6`}>
            <div className={`md:col-span-4 ${reversed ? 'md:order-2 md:text-right' : ''}`}>
              <span className="font-display italic text-6xl text-primary/70 leading-none">
                {project.number}
              </span>

              {project.isCompanyProject ? (
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-primary border border-primary/30 bg-primary/[0.06] rounded-full px-3 py-1.5 mt-4 ${
                    reversed ? 'md:ml-auto' : ''
                  }`}
                >
                  <Building2 className="w-3 h-3" />
                  Professional Work @ {project.company}
                </span>
              ) : (
                <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-muted-foreground mt-4">
                  {project.category}
                </p>
              )}

              {project.providers && (
                <div className={`mt-4 ${reversed ? 'md:text-right' : ''}`}>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Providers unified
                  </p>
                  <div className={`flex flex-wrap gap-2 ${reversed ? 'md:justify-end' : ''}`}>
                    {project.providers.map((p) => (
                      <span
                        key={p}
                        className="font-mono text-[11px] font-medium text-foreground border border-border rounded-full px-3 py-1"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={`flex flex-wrap gap-2 mt-4 ${reversed ? 'md:justify-end' : ''}`}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] text-muted-foreground border border-border rounded-full px-2.5 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={`md:col-span-8 ${reversed ? 'md:order-1' : ''}`}>
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-lg mb-6">{project.tagline}</p>

              <div className="space-y-4 text-foreground/85 leading-relaxed">
                <p>
                  <span className="font-mono text-primary text-xs uppercase tracking-wider mr-2">
                    {project.isCompanyProject ? 'System Problem' : 'Problem'}
                  </span>
                  {project.problem}
                </p>
                <p>
                  <span className="font-mono text-primary text-xs uppercase tracking-wider mr-2">
                    {project.isCompanyProject ? 'Architecture' : 'Solution'}
                  </span>
                  {project.solution}
                </p>
              </div>

              <p className="font-mono text-primary text-xs uppercase tracking-wider mt-6 mb-2.5">
                {project.isCompanyProject ? 'Enterprise Impact' : 'Impact'}
              </p>
              <ul className="space-y-2.5 mb-7">
                {project.impact.map((point, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                    <span className="text-primary mt-1">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {project.links.length > 0 ? (
                <div className="flex flex-wrap items-center gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs border border-border rounded-full px-4 py-2 hover:border-primary hover:text-primary transition-colors duration-200 cursor-pointer"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              ) : project.note ? (
                <p className="font-mono text-xs text-muted-foreground italic">{project.note}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => (
  <section id="projects" className="py-28 md:py-20">
    <div className="container max-w-6xl mx-auto px-6">
      <SectionHeading number="02" title="Selected Work" kicker="What I've built" />
    </div>

    <div>
      {projects.map((project, i) => (
        <ProjectScene key={project.title} project={project} index={i} />
      ))}
    </div>

    <Stagger className="mt-4 px-6">
      <StaggerItem>
        <p className="text-center pt-6">
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
      </StaggerItem>
    </Stagger>
  </section>
);

export default Projects;
