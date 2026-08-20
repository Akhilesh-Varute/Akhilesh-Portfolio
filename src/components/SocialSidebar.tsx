import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/Akhilesh-Varute', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/akhileshvarute', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:akhileshvarute231@gmail.com', label: 'Email' },
];

/* Fixed left dock — small always-dark chip so it stays legible over both
   the dark hero/contact bookends and the paper mid-page sections. */
const SocialSidebar = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed left-6 bottom-6 z-40 hidden lg:flex flex-col items-center gap-1 rounded-full bg-[hsl(30_11%_6%)] border border-white/10 py-4 px-2.5"
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
          className="text-[hsl(42_20%_75%)] hover:text-[hsl(18_92%_58%)] transition-colors duration-300 p-2"
          aria-label={social.label}
        >
          <social.icon className="w-4 h-4" />
        </a>
      ))}
    </motion.div>
  );
};

export default SocialSidebar;
