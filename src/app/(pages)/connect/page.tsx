import { Metadata } from 'next';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Connect | Piyush - Get in Touch',
  description: 'Let\'s collaborate on AI innovation',
};

export default function ConnectPage() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            Let's Connect
          </h1>
          <p className="text-2xl text-muted mb-8">
            Build something intelligent together
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <a
            href="mailto:hello@piyush.dev"
            className="p-6 rounded-2xl bg-glass border border-overlay-medium hover:border-accent-cyan transition-all group"
          >
            <Mail className="w-8 h-8 text-accent-cyan mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-2">Email</h3>
            <p className="text-sm text-muted">hello@piyush.dev</p>
          </a>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-glass border border-overlay-medium hover:border-accent-cyan transition-all group"
          >
            <Github className="w-8 h-8 text-accent-cyan mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-2">GitHub</h3>
            <p className="text-sm text-muted">View my code</p>
          </a>
          
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-glass border border-overlay-medium hover:border-accent-cyan transition-all group"
          >
            <Linkedin className="w-8 h-8 text-accent-cyan mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-2">LinkedIn</h3>
            <p className="text-sm text-muted">Professional network</p>
          </a>
          
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-glass border border-overlay-medium hover:border-accent-cyan transition-all group"
          >
            <Twitter className="w-8 h-8 text-accent-cyan mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-2">Twitter</h3>
            <p className="text-sm text-muted">Follow my journey</p>
          </a>
        </div>
      </div>
    </main>
  );
}
