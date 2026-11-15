import { lazy, Suspense, useEffect } from 'react';
import CustomCursor from '@/components/workspace/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
const AiWorkflow = lazy(() => import('@/components/workspace/AiWorkflow'));
const StatBars = lazy(() => import('@/components/workspace/StatBars'));
const Projects = lazy(() => import('@/components/Projects'));
import About from '@/components/About';
const Experience = lazy(() => import('@/components/Experience'));
const Skills = lazy(() => import('@/components/Skills'));
const EducationCertifications = lazy(() => import('@/components/EducationCertifications'));
const Contact = lazy(() => import('@/components/Contact'));
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

        <Suspense fallback={null}>
          <AiWorkflow />
          <StatBars />
          <Projects />
          <Experience />
          <Skills />
          <EducationCertifications />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
