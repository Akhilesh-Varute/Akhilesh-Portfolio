import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

const Contact = () => {
  const links = [
    {
      name: 'Email',
      href: 'mailto:akhileshvarute23@gmail.com',
      icon: Mail,
      label: 'akhileshvarute23@gmail.com',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/akhileshvarute',
      icon: Linkedin,
      label: 'linkedin.com/in/akhileshvarute',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Akhilesh-Varute',
      icon: Github,
      label: 'github.com/Akhilesh-Varute',
    },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container max-w-2xl mx-auto text-center">
        <p className="font-mono text-primary text-sm mb-4">04. What's Next?</p>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Get In Touch
        </h2>

        <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto">
          I'm interested in problems at the intersection of cloud infrastructure and AI.
          If you're building something in that space — or have a role that fits — feel free to reach out.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="https://cal.com/akhilesh-varute/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-all duration-300 glow"
          >
            <Mail className="w-4 h-4" />
            Book 15-min Call
          </a>
          <a
            href="mailto:akhileshvarute23@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-16">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label={link.name}
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
