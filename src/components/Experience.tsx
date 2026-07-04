import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/motion/SectionHeading';

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Timeline line draws itself as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.45'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const experience = {
    title: 'Software Developer',
    company: 'GPUonCLOUD',
    companyNote: 'Expert Cloud Consulting',
    location: 'Pune',
    period: 'June 2024 — Present',
    points: [
      'Primary engineer on aicloudinsights.ai — built and shipped every feature of the live multi-tenant SaaS end-to-end. Drive architectural decisions and review PRs across a 3-person team using GitHub Projects.',
      'Built a Bedrock-powered (Claude) conversational interface using function calling / tool use — backend defines AWS tool schemas (Cost Explorer, Security Hub, GuardDuty, CloudWatch, IAM); Claude parses plain-English intent, selects the right tool, and the system executes it in real time across connected accounts.',
      'Designed cross-account architecture using IAM role assumption via STS — strict per-tenant data isolation across 8+ AWS services per account, no shared credentials.',
      'Built a parallel cost optimisation engine analysing 8 AWS services simultaneously using CloudWatch + Pricing API; findings auto-ranked by dollar impact (critical / high / medium / low).',
      'JWT-based auth + RBAC stored in MongoDB with per-user, per-account visibility. CI/CD via CodePipeline + CodeBuild; CloudWatch dashboards for production monitoring.',
      'Previously: Kubernetes-native provisioning engine (Crossplane + Upbound + Bedrock) — plain-English AWS resource description → automatic CRD provisioning, GitOps-style with drift detection. Internal R&D prototype; deprioritised before broader rollout due to funding reallocation.',
      'Mentored 2 junior engineers through code reviews, architecture standards, and technical guidance.',
    ],
  };

  const education = [
    {
      degree: 'PG Diploma in Advanced Computing (PG-DAC)',
      institution: 'Sunbeam Infotech, Pune',
      year: '2024',
    },
    {
      degree: 'B.Tech',
      institution: 'DKTE Institute of Technology',
      year: '2022',
    },
  ];

  return (
    <section id="experience" className="py-32 px-6">
      <div className="container max-w-6xl mx-auto">
        <SectionHeading number="02" title="Experience" kicker="where I've worked" />

        {/* Work Experience — timeline draws in as you scroll */}
        <div ref={timelineRef} className="relative pl-8 md:pl-10">
          {/* static faint track */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border" />
          {/* animated fill */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-0.5 origin-top"
            style={{
              scaleY: reduceMotion ? 1 : lineScale,
              background: 'var(--gradient-primary)',
            }}
          />
          <motion.div
            className="absolute top-0 w-3 h-3 bg-primary rounded-full animate-pulse-glow"
            // framer's scale transform clobbers Tailwind translate — offset via left instead
            style={{ left: '-5px' }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
          />

          <div className="space-y-5">
            <Reveal>
              <h3 className="text-2xl font-semibold font-display text-foreground">
                {experience.title} <span className="text-primary">@ {experience.company}</span>
              </h3>
              <p className="font-mono text-sm text-muted-foreground mt-1.5">
                {experience.period} · {experience.location} ·{' '}
                <span className="text-muted-foreground/70">{experience.companyNote}</span>
              </p>
            </Reveal>

            <Stagger className="space-y-3.5">
              {experience.points.map((point, i) => (
                <StaggerItem key={i}>
                  <span className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5">▹</span>
                    <span>{point}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        {/* Education */}
        <Reveal>
          <h3 className="text-xl font-bold font-display text-foreground mt-20 mb-8">Education</h3>
        </Reveal>
        <Stagger className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="p-6 rounded-xl glass-card h-full hover:border-primary/40 transition-colors duration-300"
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <p className="font-mono text-primary text-sm mb-2">{edu.year}</p>
                <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                <p className="text-muted-foreground text-sm mt-1">{edu.institution}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Experience;
