const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="space-y-6">
          <p className="font-mono text-primary text-sm opacity-0 animate-fade-up stagger-1">
            Hi, my name is
          </p>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground opacity-0 animate-fade-up stagger-2">
            Akhilesh Varute.
          </h1>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-muted-foreground opacity-0 animate-fade-up stagger-3">
            I build things for the cloud.
          </h2>
          
          <p className="max-w-xl text-muted-foreground text-lg leading-relaxed opacity-0 animate-fade-up stagger-4">
            I'm a software engineer specializing in building scalable backend services, 
            GenAI applications, and cloud-native solutions. Currently crafting intelligent 
            cloud platforms at{' '}
            <a 
              href="https://gpuoncloud.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary link-hover"
            >
              GPUonCLOUD
            </a>
            .
          </p>
          
          <div className="pt-6 opacity-0 animate-fade-up stagger-5">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-all duration-300 glow"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
