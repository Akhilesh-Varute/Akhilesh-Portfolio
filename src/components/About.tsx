import profilePhoto from '@/assets/profile-photo.png';

const About = () => {
  const technologies = [
    'Node.js',
    'React.js',
    'Express.js',
    'TypeScript',
    'AWS Bedrock',
    'Docker',
    'MongoDB',
    'Kubernetes',
    'PostgreSQL',
    'GitHub Actions',
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
              Hello! I'm Akhilesh, a Full-Stack Software Engineer based in Pune, India.
              I build production-grade cloud platforms that combine scalability,
              performance, and modern architecture.
            </p>

            <p>
              My work spans backend microservices (Node.js/Express), frontend development
              (React), and cloud infrastructure (AWS, Docker, Kubernetes). I've engineered
              systems serving 500+ daily users with 99.5% uptime, integrated GenAI applications
              using AWS Bedrock, and automated deployment pipelines reducing release cycles
              from 2 hours to 15 minutes.
            </p>

            <p>
              I'm AWS Certified Developer – Associate and hold a PG-DAC in Advanced Computing
              from Sunbeam Infotech.
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
                alt="Akhilesh Varute"
                className="w-full aspect-[3/4] object-cover object-center rounded-lg"
              />
            </div>
            <div className="absolute inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
