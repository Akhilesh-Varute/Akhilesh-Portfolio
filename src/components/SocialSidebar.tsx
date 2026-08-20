import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/Akhilesh-Varute', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/akhileshvarute', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:akhileshvarute231@gmail.com', label: 'Email' },
];

const SocialSidebar = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed left-6 bottom-6 z-40 hidden lg:flex flex-col items-center gap-1 bg-background border border-border py-3 px-2"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-300 p-2"
          aria-label={social.label}
        >
          <social.icon className="w-4 h-4" />
        </a>
      ))}
    </motion.div>
  );
};

export default SocialSidebar;
