import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/motion/SectionHeading';
import profilePhoto from '@/assets/profile-photo.png';

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Photo drifts slightly slower than the text — subtle depth
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  const technologies = [
    'Node.js',
    'TypeScript',
    'AWS Bedrock',
    'Lambda',
    'STS',
    'CloudWatch',
    'Cost Explorer',
    'Security Hub',
    'GuardDuty',
    'Express.js',
    'Fastify',
    'MongoDB',
    'Redis',
    'Docker',
    'Kubernetes',
    'Crossplane',
  ];

  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="container max-w-6xl mx-auto">
        <SectionHeading number="01" title="About Me" kicker="who I am" />

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-14 items-start">
          <div className="space-y-5 text-muted-foreground text-[1.05rem] leading-relaxed">
            <Reveal>
              <p>
                Hello! I'm Akhilesh, a Software Engineer based in Pune, India, with 2 years
                building production AI and cloud infrastructure on AWS. My specialty is the
                unglamorous, hard part of GenAI: wiring large language models to real
                infrastructure — safely, multi-tenant, and in production.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p>
                On{' '}
                <a
                  href="https://aicloudinsights.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary link-hover"
                >
                  aicloudinsights.ai
                </a>{' '}
                I built the Bedrock (Claude) conversational layer end-to-end using{' '}
                <span className="text-foreground">function calling / tool use</span> — the backend
                defines AWS tool schemas (Cost Explorer, Security Hub, GuardDuty, CloudWatch,
                IAM), Claude parses intent from plain English, picks the right tool, and the
                system executes it against live accounts. Strict per-tenant isolation via STS
                role assumption; no shared credentials, ever.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p>
                Before that I built a Kubernetes-native provisioning engine (Crossplane + Upbound
                + Bedrock): describe AWS resources in English, get GitOps-style CRD provisioning
                with drift detection. I'm AWS Certified Developer – Associate, hold a PG-DAC from
                Sunbeam Infotech, and mentor 2 junior engineers through reviews and architecture
                standards.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <blockquote className="border-l-2 border-primary pl-5 py-1 text-foreground/90 italic">
                I ship with AI, too — Claude Code and GitHub Copilot are part of my daily
                toolchain, the same way the terminal is.
              </blockquote>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="pt-2 font-mono text-sm text-primary">Technologies I work with daily:</p>
            </Reveal>

            <Stagger className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {technologies.map((tech) => (
                <StaggerItem key={tech}>
                  <span className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-primary">▹</span>
                    {tech}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Photo with parallax drift + hover lift */}
          <Reveal delay={0.2} className="hidden md:block">
            <motion.div
              className="relative group max-w-xs mx-auto"
              style={reduceMotion ? undefined : { y: photoY }}
            >
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl border-2 border-primary/40 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
              <div className="relative rounded-xl overflow-hidden glass-card">
                <img
                  src={profilePhoto}
                  alt="Akhilesh Varute"
                  className="w-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
              </div>
              <p className="mt-5 text-center font-mono text-xs text-muted-foreground">
                Pune, India ·{' '}
                <a href="https://akhileshvarute.me" className="text-primary link-hover">
                  akhileshvarute.me
                </a>
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
