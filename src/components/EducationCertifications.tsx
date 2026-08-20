import { Award } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/motion/SectionHeading';

const education = [
  {
    degree: 'Post Graduate Diploma in Advanced Computing (PG-DAC)',
    institution: 'Sunbeam Infotech / C-DAC',
    year: 'Feb 2024',
  },
  {
    degree: 'B.Tech in Textile Engineering',
    institution: "DKTE's Textile and Engineering Institute",
    year: '2018 – 2022',
  },
];

const certifications = [
  {
    title: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
  },
];

const EducationCertifications = () => (
  <section id="education" className="py-28 md:py-36 px-6 bg-secondary/40">
    <div className="container max-w-6xl mx-auto">
      <SectionHeading number="05" title="Education & Certifications" kicker="Credentials" />

      <div className="grid md:grid-cols-2 gap-14">
        <div>
          <p className="font-mono text-xs text-primary mb-5 tracking-[0.2em] uppercase">Education</p>
          <Stagger className="space-y-6">
            {education.map((edu) => (
              <StaggerItem key={edu.degree}>
                <div className="border-b border-border pb-6">
                  <p className="font-mono text-sm text-muted-foreground mb-1.5">{edu.year}</p>
                  <h3 className="font-display text-lg text-foreground">{edu.degree}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{edu.institution}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div>
          <p className="font-mono text-xs text-primary mb-5 tracking-[0.2em] uppercase">Certifications</p>
          <Reveal>
            <div className="flex items-start gap-4 border-b border-border pb-6">
              <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground">{certifications[0].title}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {certifications[0].issuer} · {certifications[0].year}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default EducationCertifications;
