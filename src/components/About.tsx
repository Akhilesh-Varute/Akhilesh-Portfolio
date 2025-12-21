const About = () => {
  const technologies = [
    'Python',
    'FastAPI',
    'React.js',
    'AWS Services',
    'Docker',
    'PostgreSQL',
    'TypeScript',
    'Kubernetes',
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="container max-w-5xl mx-auto">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-12">
          <span className="font-mono text-primary text-xl">01.</span>
          About Me
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-4 text-muted-foreground">
            <p>
              Hello! I'm Akhilesh, a software engineer based in Pune, India. I enjoy building 
              robust backend systems and exploring the intersection of cloud computing and 
              artificial intelligence.
            </p>
            
            <p>
              With experience in developing GenAI chatbots, cloud insight platforms, and 
              GPU marketplace solutions, I've had the opportunity to work on diverse projects 
              that scale from concept to production.
            </p>
            
            <p>
              I'm an{' '}
              <span className="text-primary">AWS Certified Developer – Associate</span>, 
              which has strengthened my ability to architect and deploy cloud-native applications 
              using AWS services like Bedrock, Lambda, EC2, and S3.
            </p>

            <p className="pt-2">
              Here are some technologies I've been working with recently:
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

          <div className="relative group">
            <div className="relative z-10 rounded-lg overflow-hidden">
              <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-secondary rounded-lg flex items-center justify-center">
                <span className="text-6xl font-bold text-primary/30 font-mono">AV</span>
              </div>
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
            <div className="absolute inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
