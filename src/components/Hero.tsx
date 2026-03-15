const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container max-w-5xl mx-auto">
        <div className="space-y-6">
          <p className="font-mono text-primary text-sm opacity-0 animate-fade-up stagger-1">
            Hi, my name is
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground opacity-0 animate-fade-up stagger-2">
            Akhilesh Varute.
          </h1>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-muted-foreground opacity-0 animate-fade-up stagger-3">
            Cloud Backend Engineer specializing in AI-powered AWS systems
          </h2>

          <p className="font-mono text-primary text-sm opacity-0 animate-fade-up stagger-3">
            AWS Certified · Node.js · TypeScript · AWS Serverless · AI Integrations
          </p>

          <p className="font-mono text-primary/90 text-xs opacity-0 animate-fade-up stagger-3">
            AWS Certified Developer – Associate (DVA-C02) · Valid until August 2028
          </p>

          <p className="max-w-xl text-muted-foreground text-lg leading-relaxed opacity-0 animate-fade-up stagger-4">
            I build production-grade cloud backend systems on AWS — from AI-powered chatbots that query live AWS account data, to NLP-driven infrastructure automation engines. Currently building intelligent cloud platforms at{' '}
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

          <div className="pt-6 opacity-0 animate-fade-up stagger-5 flex flex-col items-start gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-all duration-300 glow"
            >
              Get In Touch
            </a>
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Or{' '}
              <a
                href="https://cal.com/akhilesh-varute/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary link-hover"
              >
                book 15-min call
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
