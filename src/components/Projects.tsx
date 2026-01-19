const Projects = () => {
    const projects = [
        {
            title: 'AI Cloud Insights Platform',
            description: 'Full-stack cloud observability platform for real-time AWS monitoring',
            tech: 'Node.js · Express.js · React · MongoDB · AWS Bedrock · Docker · Kubernetes',
            points: [
                'Built production platform serving 500+ daily users with 99.5% uptime',
                'Integrated AWS Bedrock for GenAI-powered insights',
                'Processed 10K+ API requests daily at 100ms latency',
                'Reduced manual audit work by 40 hours/month per client',
            ],
            links: {
                demo: 'https://aicloudinsights.ai',
                github: '#',
            },
        },
        {
            title: 'AI-Powered Dockerfile Optimizer',
            description: 'GenAI tool using GPT-4 to analyze and optimize Dockerfiles',
            tech: 'Python · FastAPI · GPT-4 · Docker · AWS EC2',
            points: [],
            links: {
                github: 'https://github.com/Akhilesh-Varute/dockerfile-optimizer',
            },
        },
        {
            title: 'Infrastructure Orchestrator',
            description: 'Automation tool converting natural language to AWS resources',
            tech: 'AWS · Crossplane · Kubernetes · Node.js',
            points: [
                'Reduced infrastructure setup from 30 minutes to 2 minutes',
                'Enabled 10+ concurrent weekly deployments',
                'Built Node.js APIs for Kubernetes resource management',
                '99%+ deployment success rate',
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