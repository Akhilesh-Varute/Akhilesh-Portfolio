const Skills = () => {
  const skillCategories = [
    {
      title: 'Cloud & AWS',
      skills: ['Lambda', 'API Gateway', 'S3', 'EC2', 'Bedrock', 'Cognito', 'IAM', 'CloudWatch', 'STS', 'SQS', 'CodePipeline', 'CodeBuild'],
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'TypeScript', 'Express.js', 'Fastify', 'REST APIs', 'Microservices', 'WebSockets'],
    },
    {
      title: 'Auth & Security',
      skills: ['JWT', 'RBAC', 'OAuth 2.0', 'Multi-tenant architecture', 'IAM least-privilege'],
    },
    {
      title: 'Infrastructure',
      skills: ['Docker', 'Kubernetes', 'Crossplane IaC', 'CI/CD', 'GitHub Actions'],
    },
    {
      title: 'AI & GenAI',
      skills: ['AWS Bedrock', 'LLMs', 'Prompt Engineering', 'NLP Workflow Design', 'AI API Integration'],
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'Redis', 'PostgreSQL'],
    },
    {
      title: 'Frontend',
      skills: ['React.js', 'JavaScript (supporting knowledge)'],
    },
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      code: 'DVA-C02',
      date: 'August 2028',
      badge: '☁️',
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-secondary/30">
      <div className="container max-w-5xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-12">
          <span className="font-mono text-primary text-xl">04.</span>
          Skills & Certifications
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-mono text-primary text-sm uppercase tracking-wider">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-card border border-border rounded-full text-sm text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <h3 className="text-xl font-bold text-foreground mb-6">Certifications</h3>
        <div className="grid gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {cert.badge}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {cert.issuer} · {cert.code}
                  </p>
                  <p className="font-mono text-primary text-xs mt-2">
                    Valid until {cert.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
