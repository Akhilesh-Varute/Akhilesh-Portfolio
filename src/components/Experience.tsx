const Experience = () => {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'GPUonCLOUD',
      location: 'Pune',
      period: 'June 2024 — Present',
      points: [
        'Primary engineer on aicloudinsights.ai — a live, multi-tenant SaaS platform for natural-language AWS infrastructure monitoring. Planned, designed, and shipped every feature from scratch. Coordinates a 3-person engineering team through GitHub Projects, PR reviews, and all architectural decision-making.',
        'Built a Bedrock-powered (Claude) conversational interface — users ask natural-language questions about their AWS costs, resource usage, and security posture across multiple connected accounts. Bedrock calls live AWS APIs (Cost Explorer, Security Hub, GuardDuty, CloudWatch, IAM) and returns real-time answers.',
        'Designed a secure multi-tenant architecture using cross-account IAM role assumption via STS, enforcing strict per-tenant data isolation across 8+ AWS services per account.',
        'Developed a parallel cost optimisation engine analysing 8 AWS services simultaneously using CloudWatch metrics and the Pricing API; findings ranked by dollar impact and surfaced through the conversational interface.',
        'Implemented JWT + RBAC authentication using MongoDB and AWS Cognito, with per-user, per-account resource visibility across the multi-tenant deployment.',
        'Established CI/CD pipelines via CodePipeline and CodeBuild; built CloudWatch dashboards for API health, latency, and error monitoring in production.',
        'Previously designed and built a Kubernetes-native infrastructure automation engine (Crossplane + Upbound + Bedrock) — users described AWS resources in plain English and the system provisioned them automatically via CRDs, GitOps-style, with automatic drift detection. Project sunset due to company funding reallocation.',
        'Mentored 2 junior developers through code reviews, architecture standards, and technical guidance.',
      ],
    },
  ];

  const education = [
    {
      degree: 'PG Diploma in Advanced Computing (PG-DAC)',
      institution: 'Sunbeam Infotech',
      year: '2024',
      description: 'Sunbeam Infotech, Pune',
    },
    {
      degree: 'B.Tech',
      institution: 'DKTE Institute of Technology',
      year: '2022',
    },
  ];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="container max-w-5xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-12">
          <span className="font-mono text-primary text-xl">02.</span>
          Experience
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        {/* Work Experience */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-border hover:border-primary transition-colors">
              <div className="absolute left-0 top-0 w-3 h-3 bg-primary rounded-full -translate-x-[7px]" />

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {exp.title}{' '}
                    <span className="text-primary">@ {exp.company}</span>
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground mt-1">
                    {exp.period} · {exp.location}
                  </p>
                </div>

                <ul className="space-y-3">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary mt-1.5">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <h3 className="text-xl font-bold text-foreground mt-16 mb-8">Education</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <p className="font-mono text-primary text-sm mb-2">{edu.year}</p>
              <h4 className="font-semibold text-foreground">{edu.degree}</h4>
              <p className="text-muted-foreground text-sm mt-1">{edu.institution}</p>
              {edu.description && (
                <p className="text-muted-foreground text-sm mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
