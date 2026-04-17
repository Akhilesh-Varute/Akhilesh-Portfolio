const Projects = () => {
    const projects = [
        {
            title: 'AI Cloud Insights Platform',
            description: 'Live multi-tenant SaaS platform — natural language querying of AWS infrastructure',
            tech: 'Node.js · AWS Lambda · Bedrock · API Gateway · Cognito · Cost Explorer · Security Hub · GuardDuty · CloudWatch · IAM · STS · MongoDB · React',
            points: [
                'Primary engineer and sole builder — planned, designed, and deployed every feature independently. Coordinates a 3-person team via GitHub Projects and PR reviews.',
                'Bedrock-powered (Claude) conversational interface — users query AWS costs, resource usage, and security posture across multiple connected accounts in plain English. No dashboard navigation required.',
                'Secure cross-account architecture using IAM role assumption via STS; strict per-tenant data isolation across 8+ AWS services per account.',
                'Parallel cost optimisation engine analysing 8 AWS services simultaneously using CloudWatch metrics and the Pricing API; findings ranked by dollar impact — critical / high / medium / low.',
                'JWT + RBAC auth with per-user, per-account visibility; Cognito-backed across the full multi-tenant deployment.',
                'Live at aicloudinsights.ai',
            ],
            links: {
                github: '#',
                demo: 'https://aicloudinsights.ai',
            },
        },
        {
            title: 'Cloud Infrastructure Automation Platform',
            description: 'Kubernetes-native provisioning engine — describe infrastructure in plain English, deploy automatically',
            tech: 'Node.js · Fastify · AWS Bedrock · Crossplane · Kubernetes · WebSocket · SSM · Redis · MongoDB',
            points: [
                'Full-stack platform where users describe AWS infrastructure in plain English — Bedrock parses intent and provisions resources automatically via Kubernetes Custom Resources (Crossplane + Upbound), GitOps-style with automatic drift detection.',
                'WebSocket-based in-browser SSH terminal using xterm.js and AWS SSM Session Manager — secure real-time EC2 access without VPN or bastion hosts.',
                'D3.js dashboards for real-time infrastructure visualisation; resource state reflected live via WebSocket updates.',
                'Full audit logging for every provisioning action across accounts.',
                'Project was sunset due to company funding reallocation.',
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