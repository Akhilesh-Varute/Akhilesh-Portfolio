const Experience = () => {
  const experiences = [
    {
      title: 'Software Developer',
      company: 'Expert Cloud Consulting (GPUonCLOUD)',
      location: 'Pune',
      period: 'April 2024 — Present',
      points: [
        'Engineered production GenAI cloud platform (AWS Bedrock) processing 500+ daily user interactions with <100ms latency; built Node.js/Express APIs for authentication and data ingestion.',
        'Built high-throughput Node.js/Express microservices achieving 99.5% uptime and processing 10K+ daily API requests with <100ms response time.',
        'Integrated 5 AWS services (Security Hub, CloudTrail, CloudWatch, S3, Lambda) for real-time compliance analytics; reduced manual audit work by ~40 hours/month.',
        'Architected full-stack AI Cloud Insights platform (Node.js backend + React frontend + MongoDB) serving 500+ daily users with live AWS monitoring.',
        'Designed Infrastructure-as-Code orchestrator reducing deployment time from 30 minutes to 2 minutes; enabled 10+ weekly deployments.',
        'Developed AI-Powered Dockerfile Optimizer achieving 60% image size reduction and 40% faster build times; deployed via AWS EC2.',
      ],
    },
  ];

  const education = [
    {
      degree: 'PG Diploma in Advanced Computing (PG-DAC)',
      institution: 'Sunbeam Infotech',
      year: '2024',
      description: 'CDAC-approved full-stack software engineering program',
    },
    {
      degree: 'B.Tech in Textile Chemistry',
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
