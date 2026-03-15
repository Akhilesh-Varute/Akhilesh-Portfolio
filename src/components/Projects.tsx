const Projects = () => {
    const projects = [
        {
            title: 'AI Cloud Insights Platform',
            description: 'Conversational AI platform for real-time AWS account monitoring',
            tech: 'Node.js · AWS Lambda · Bedrock · API Gateway · Cognito · Cost Explorer · Security Hub · GuardDuty · CloudWatch · IAM · STS · MongoDB · React',
            points: [
                "User asks a natural language question → Bedrock processes intent → dynamically calls AWS APIs → returns live answer from user's account",
                'Lambda-based cost optimisation engine analysing 8 AWS services in parallel across multiple accounts using IAM role assumption via STS',
                'Identifies idle resources and calculates real dollar savings, prioritised by impact — critical / high / medium / low',
                'Multi-tenant RBAC auth with Cognito, serving 500+ daily users with 99.5% uptime',
                'Reduced manual audit work by 40 hours/month per client',
            ],
            links: {
                github: '#',
            },
        },
        {
            title: 'Cloud Infrastructure Automation Platform',
            description: 'NLP-driven infrastructure provisioning engine — chat to deploy real AWS resources',
            tech: 'Node.js · Fastify · AWS Bedrock · Crossplane · Kubernetes · WebSocket · SSM · Redis · MongoDB',
            points: [
                'User types a natural language command → Bedrock parses intent → Crossplane acts as IaC layer to provision EC2, S3, and RDS resources via Kubernetes CRDs — replacing manual Terraform/CloudFormation',
                'WebSocket-based in-browser SSH terminal using xterm.js and AWS SSM Session Manager for secure remote EC2 access',
                'Reduced infrastructure deployment from 30 minutes to 2 minutes',
                '99%+ deployment success rate across 10+ concurrent weekly deployments',
                'Full audit logging for every provisioning action across accounts',
            ],
            links: {
                github: '#',
            },
        },
    ];

    return (
        <section id="projects" className="py-24 px-6">
            <div className="container max-w-5xl mx-auto">
                <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-12">
                    <span className="font-mono text-primary text-xl">03.</span>
                    Featured Projects
                    <span className="h-px bg-border flex-1 max-w-xs" />
                </h2>

                <div className="space-y-16">
                    {projects.map((project, index) => (
                        <div key={index} className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                                <p className="text-muted-foreground">{project.description}</p>
                                <p className="font-mono text-primary text-sm">{project.tech}</p>
                            </div>

                            <ul className="space-y-2">
                                {project.points.map((point, i) => (
                                    <li key={i} className="flex gap-3 text-muted-foreground">
                                        <span className="text-primary">•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex gap-4 pt-2">
                                {project.links.demo && (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline font-mono text-sm"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {project.links.github && project.links.github !== '#' && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline font-mono text-sm"
                                    >
                                        GitHub
                                    </a>
                                )}
                            </div>

                            {index < projects.length - 1 && <hr className="mt-8 border-border" />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;