const About = () => {
  const technologies = [
    'Node.js',
    'TypeScript',
    'AWS Lambda',
    'API Gateway',
    'AWS Bedrock',
    'Cognito',
    'CloudWatch',
    'STS',
    'S3',
    'EC2',
    'Docker',
    'Kubernetes',
    'Crossplane',
    'MongoDB',
    'Redis',
    'CI/CD',
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="container max-w-5xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-12">
          <span className="font-mono text-primary text-xl">01.</span>
          About Me
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="max-w-2xl space-y-4 text-muted-foreground">
            <p>
              Hello! I'm Akhilesh, a Software Engineer based in Pune, India.
              I specialise in building AI-powered cloud infrastructure platforms on AWS —
              multi-tenant SaaS architecture, natural language interfaces powered by Amazon Bedrock,
              and Kubernetes-based infrastructure automation.
            </p>

            <p>
              In ~2 years I've shipped two production platforms from scratch. The first —
              aicloudinsights.ai — is a live multi-tenant SaaS platform where enterprises query
              their entire AWS infrastructure through natural language, powered by Amazon Bedrock
              (Claude). I am the primary engineer on this platform, coordinating a 3-person team,
              owning all architectural decisions, and managing delivery via GitHub Projects and PR
              reviews. The second was a Kubernetes-native infrastructure provisioning engine
              (Crossplane + Upbound + Bedrock) that deployed real AWS resources from plain-English
              commands — project was sunset due to company funding reallocation.
            </p>

            <p>
              I'm AWS Certified Developer – Associate and hold a PG-DAC from
              Sunbeam Infotech, Pune.
            </p>

            <p className="pt-2">
              Technologies I work with:
            </p>

            <ul className="grid grid-cols-2 gap-2 pt-2">
              {technologies.map((tech) => (
                <li key={tech} className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-primary">▹</span>
                  {tech}
                </li>
              ))}
            </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
