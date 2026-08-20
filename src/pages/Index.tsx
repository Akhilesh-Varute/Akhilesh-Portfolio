import { useEffect } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CloudArchitectureCanvas from '@/components/workspace/CloudArchitectureCanvas';
import AiWorkflow from '@/components/workspace/AiWorkflow';
import StatBars from '@/components/workspace/StatBars';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import EducationCertifications from '@/components/EducationCertifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="relative">
      <Navigation />

      <main>
        <Hero />
        <About />

        <section className="py-20 rule">
          <div className="wrap">
            <p className="eyebrow mb-4">System design</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl mb-3">
              A high-availability system, <span className="text-muted-foreground">designed to prove it out.</span>
            </h2>
            <p className="font-mono text-sm text-muted-foreground max-w-lg mb-10">
              Two-AZ VPC, ALB and NAT Gateway per public subnet, an nginx/app Auto Scaling
              Group, and a MongoDB replica set — designed independently to practice
              high-availability patterns. Drag the blocks.
            </p>
            <Reveal>
              <CloudArchitectureCanvas />
            </Reveal>
          </div>
        </section>

        <AiWorkflow />
        <StatBars />
        <Projects />
        <Experience />
        <Skills />
        <EducationCertifications />
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
