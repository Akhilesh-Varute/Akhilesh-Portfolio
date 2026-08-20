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

        <section className="py-16 rule">
          <div className="wrap">
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground mb-3">
                AWS · LIVE — how a request moves through my systems
              </p>
              <CloudArchitectureCanvas />
            </Reveal>
          </div>
        </section>

        <AiWorkflow />
        <StatBars />
        <Projects />
        <About />
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
