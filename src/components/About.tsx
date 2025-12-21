import profilePhoto from '@/assets/profile-photo.png';

const About = () => {
  const technologies = [
    'Python',
    'FastAPI',
    'TypeScript',
    'React.js',
    'PostgreSQL',
    'Docker',
    'AWS',
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
              Hello! I'm Akhilesh, a software engineer based in Pune, India. I thrive on 
              building systems that are both elegant and scalable — whether that's a robust 
              REST API, an AI-powered chatbot, or a full-stack e-commerce platform.
            </p>
            
            <p>
              My work spans backend development, GenAI applications, and cloud infrastructure. 
              From architecting high-performance APIs with FastAPI to shipping production-ready 
              platforms, I enjoy the full spectrum of software engineering.
            </p>
            
            <p>
              I'm{' '}
              <span className="text-primary">AWS Certified Developer – Associate</span>, 
              but equally comfortable diving deep into Python, designing database schemas, 
              or shipping React frontends.
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
              <img 
                src={profilePhoto} 
                alt="Akhilesh Verma" 
                className="w-full aspect-square object-cover object-top rounded-lg"
              />
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
