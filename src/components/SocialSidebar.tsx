import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/Akhilesh-Varute', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/akhileshvarute', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:akhileshvarute23@gmail.com', label: 'Email' },
];

/* Left rail — social links. The right rail is the scroll orb (ScrollProgress). */
const SocialSidebar = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed left-8 bottom-0 z-40 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-muted-foreground/30"
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
    >
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
    </motion.div>
  );
};

export default SocialSidebar;
