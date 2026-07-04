import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import SectionHeading from '@/components/motion/SectionHeading';

interface Project {
  number: string;
  status: 'LIVE' | 'R&D PROTOTYPE';
  title: string;
  description: string;
  tech: string[];
  points: string[];
  demo?: string;
}

const projects: Project[] = [
  {
    number: '01',
    status: 'LIVE',
    title: 'AI Cloud Insights Platform',
    description:
      'Multi-tenant SaaS — enterprises connect AWS accounts and query costs, security posture, and resource usage in plain English.',
    tech: [
      'Node.js',
      'TypeScript',
      'Express.js',
      'Lambda',
      'Bedrock (Claude)',
      'STS',
      'CloudWatch',
      'MongoDB',
      'RBAC',
      'Docker',
    ],
    points: [
      'Bedrock function calling / tool use — Claude parses intent, selects AWS tool schemas (Cost Explorer, Security Hub, GuardDuty, CloudWatch, IAM), system executes in real time.',
      'Cross-account STS role assumption with strict per-tenant isolation; cost engine analyses 8 services in parallel, findings ranked by dollar impact.',
      'JWT + RBAC stored in MongoDB with per-user, per-account visibility across the multi-tenant deployment.',
    ],
    demo: 'https://aicloudinsights.ai',
  },
  {
    number: '02',
    status: 'R&D PROTOTYPE',
    title: 'Cloud Infrastructure Automation Platform',
    description:
      'Kubernetes-native provisioning engine — describe infrastructure in plain English, deploy automatically.',
    tech: [
      'Node.js',
      'Fastify',
      'Bedrock',
      'Crossplane',
      'Kubernetes',
      'WebSocket',
      'SSM',
      'Redis',
      'MongoDB',
    ],
    points: [
      'Plain English → Bedrock intent parsing → Crossplane CRD provisioning, GitOps-style with automatic drift detection.',
      'WebSocket in-browser SSH terminal (xterm.js + SSM Session Manager); D3.js real-time infrastructure visualisation.',
      'Internal R&D prototype — deprioritised before broader rollout due to funding reallocation.',
    ],
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="relative w-[min(85vw,46rem)] flex-shrink-0 glass-card border-glow rounded-2xl overflow-hidden group hover:border-primary/30 transition-colors duration-300">
    {/* terminal-style chrome */}
    <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 font-mono text-xs text-muted-foreground truncate">
        ~/projects/{project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
      </span>
      <span
        className={`ml-auto font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full border ${
          project.status === 'LIVE'
            ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
            : 'text-amber-300 border-amber-300/30 bg-amber-300/10'
        }`}
      >
        {project.status === 'LIVE' ? '● LIVE' : '◦ R&D'}
      </span>
    </div>

    <div className="relative p-8 md:p-10">
      <span
        className="absolute -top-6 right-6 font-display font-bold text-[7rem] leading-none text-transparent select-none pointer-events-none"
        style={{ WebkitTextStroke: '1px hsl(172 66% 50% / 0.22)' }}
        aria-hidden="true"
      >
        {project.number}
      </span>

      <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors duration-300 pr-24">
        {project.title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-xl">{project.description}</p>

      <ul className="space-y-3 mb-8">
        {project.points.map((point, i) => (
          <li key={i} className="flex gap-3 text-muted-foreground text-sm md:text-[0.95rem] leading-relaxed">
            <span className="text-primary mt-0.5">▹</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs text-primary/90 bg-primary/[0.07] border border-primary/15 rounded-full px-3 py-1"
          >
            {tech}
          </span>
        ))}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-primary-foreground bg-primary rounded-full px-4 py-2 hover:brightness-110 transition-all duration-200 cursor-pointer"
          >
            See It Running
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  </article>
);

const CtaCard = () => (
  <article className="relative w-[min(85vw,46rem)] flex-shrink-0 glass-card rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-6 min-h-[26rem]">
    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
      <Github className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground">
      More on <span className="text-gradient">GitHub</span>
    </h3>
    <p className="text-muted-foreground max-w-sm">
      Explore experiments, infrastructure tooling, and works in progress.
    </p>
    <a
      href="https://github.com/Akhilesh-Varute"
      target="_blank"
      rel="noopener noreferrer"
      className="btn-outline glow"
    >
      Visit GitHub
      <ArrowUpRight className="w-4 h-4" />
    </a>
  </article>
);

const SLIDE_COUNT = projects.length + 1;

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // Measure how far the track must travel so the last card lands fully in view
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  // Direct 1:1 mapping — a spring here trails the scroll and reads as lag
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveSlide(Math.min(SLIDE_COUNT - 1, Math.floor(v * SLIDE_COUNT)));
  });

  // Reduced motion: plain vertical stack, no pinning
  if (reduceMotion) {
    return (
      <section id="projects" className="py-32 px-6">
        <div className="container max-w-6xl mx-auto">
          <SectionHeading number="03" title="Featured Projects" kicker="what I've built" />
          <div className="space-y-10 flex flex-col items-center">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
            <CtaCard />
          </div>
        </div>
      </section>
    );
  }

  return (
    // Tall section provides the scroll runway; inner viewport stays pinned
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: `${SLIDE_COUNT * 100 + 60}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 w-full">
          <SectionHeading number="03" title="Featured Projects" kicker="what I've built" />
        </div>

        <motion.div
          ref={trackRef}
          className="flex gap-8 items-stretch"
          style={{
            x,
            willChange: 'transform',
            paddingLeft: 'max(1.5rem, calc(50vw - min(42.5vw, 23rem)))',
            paddingRight: 'max(1.5rem, calc(50vw - min(42.5vw, 23rem)))',
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
          <CtaCard />
        </motion.div>

        {/* slide progress */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="flex gap-2">
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-8 bg-primary' : 'w-3 bg-muted'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeSlide + 1).padStart(2, '0')} / {String(SLIDE_COUNT).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
