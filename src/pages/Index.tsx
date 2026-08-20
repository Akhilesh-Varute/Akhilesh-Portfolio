import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import StatCounters from '@/components/creative/StatCounters';
import About from '@/components/About';
import ArchitectureDiagram from '@/components/creative/ArchitectureDiagram';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import CodeTypewriter from '@/components/creative/CodeTypewriter';
import Skills from '@/components/Skills';
import EducationCertifications from '@/components/EducationCertifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SocialSidebar from '@/components/SocialSidebar';
import ScrollProgress from '@/components/ScrollProgress';

const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="relative">
      <ScrollProgress />
      <Navigation />
      <SocialSidebar />

      <main>
        <Hero />
        <StatCounters />
        <About />
        <ArchitectureDiagram />
        <Projects />
        <Experience />
        <CodeTypewriter />
        <Skills />
        <EducationCertifications />
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
