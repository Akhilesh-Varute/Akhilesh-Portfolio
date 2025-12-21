import { Github, Linkedin, Mail } from 'lucide-react';

const SocialSidebar = () => {
  const socials = [
    { icon: Github, href: 'https://github.com/Akhilesh-Varute', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/akhileshvarute', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:akhileshvarute23@gmail.com', label: 'Email' },
  ];

  return (
    <>
      {/* Left sidebar - Social Links */}
      <div className="fixed left-8 bottom-0 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-muted-foreground/30">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Right sidebar - Email */}
      <div className="fixed right-8 bottom-0 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-muted-foreground/30">
        <a
          href="mailto:akhileshvarute23@gmail.com"
          className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest"
          style={{ writingMode: 'vertical-rl' }}
        >
          akhileshvarute23@gmail.com
        </a>
      </div>
    </>
  );
};

export default SocialSidebar;
