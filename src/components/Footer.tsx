const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container max-w-5xl mx-auto text-center">
        <p className="font-mono text-sm text-muted-foreground">
          Designed & Built by{' '}
          <span className="text-primary">Akhilesh Varute</span>
        </p>
        <p className="font-mono text-xs text-muted-foreground/60 mt-2">
          Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
