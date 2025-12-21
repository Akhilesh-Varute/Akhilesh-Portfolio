import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SocialSidebar from '@/components/SocialSidebar';

const Index = () => {
  return (
    <div className="relative">
      <Navigation />
      <SocialSidebar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
