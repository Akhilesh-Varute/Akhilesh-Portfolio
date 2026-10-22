import { useEffect } from 'react';
import CustomCursor from '@/components/workspace/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
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
      <SmoothScroll />
      <CustomCursor />
      <Navigation />

      <main>
        <Hero />
        <About />

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
