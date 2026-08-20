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
    <div className="wrap">
      <p className="eyebrow mb-4">Profile / Credentials</p>
      <h2 className="font-display font-bold text-4xl md:text-6xl mb-12">Education &amp; certifications</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="panel">
          <div className="panel-topbar">Education</div>
          <Stagger className="p-6 space-y-6">
            {education.map((edu) => (
              <StaggerItem key={edu.degree}>
                <p className="font-mono text-xs text-muted-foreground mb-1">{edu.year}</p>
                <h3 className="font-display font-semibold">{edu.degree}</h3>
                <p className="font-mono text-xs text-muted-foreground mt-1">{edu.institution}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="panel">
          <div className="panel-topbar">Certifications</div>
          <Reveal className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold">{certifications[0].title}</h3>
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
