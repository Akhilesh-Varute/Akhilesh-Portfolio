import { Award } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

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
  <section id="education" className="py-20 rule">
    <div className="offset-col-wide">
      <p className="eyebrow mb-2">About / Credentials</p>
      <h2 className="font-display italic text-4xl md:text-5xl mb-12">Education &amp; certifications</h2>

      <div className="grid md:grid-cols-2 gap-14">
        <div>
          <p className="font-mono text-xs text-primary mb-5 tracking-[0.2em] uppercase">Education</p>
          <Stagger className="space-y-6">
            {education.map((edu) => (
              <StaggerItem key={edu.degree}>
                <div className="border-b border-border pb-6">
                  <p className="font-mono text-xs text-muted-foreground mb-1.5">{edu.year}</p>
                  <h3 className="font-mono text-sm text-foreground">{edu.degree}</h3>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{edu.institution}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div>
          <p className="font-mono text-xs text-primary mb-5 tracking-[0.2em] uppercase">Certifications</p>
          <Reveal>
            <div className="flex items-start gap-4 border-b border-border pb-6">
              <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-mono text-sm text-foreground">{certifications[0].title}</h3>
                <p className="font-mono text-xs text-muted-foreground mt-1">
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
