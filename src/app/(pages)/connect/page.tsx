'use client';

import { useState, FormEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { socialLinks } from '@/config/social-links';

const contactCards = [
  { color: 'cyan', description: 'piyushjaguri13@gmail.com' },
  { color: 'lavender', description: 'View my code' },
  { color: 'indigo', description: 'Connect professionally' },
  { color: 'teal', description: 'Follow my journey' },
  { color: 'lavender', description: 'Visual journey' },
];

export default function ConnectPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-glow opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-accent-cyan/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-muted">Open to collaboration</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            Let's Build Together
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed">
            Whether you're a mentor, collaborator, or fellow innovator — I'd love to connect and explore how we can create something meaningful.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-glass rounded-3xl p-8 md:p-10 border border-overlay-medium backdrop-blur-xl shadow-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-heading font-semibold mb-2">Send a Message</h2>
                <p className="text-muted mb-8">Share your ideas, questions, or just say hello.</p>

                {submitted ? (
                  <div className="py-16 text-center animate-scale-in">
                    <div className="w-16 h-16 rounded-full bg-success/20 border-2 border-success mx-auto mb-4 flex items-center justify-center">
                      <Send className="w-7 h-7 text-success" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted">I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-foreground">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-overlay-light border border-overlay-medium focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-overlay-light border border-overlay-medium focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-foreground">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-overlay-light border border-overlay-medium focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted resize-none"
                        placeholder="Tell me about your idea or project..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn w-full relative px-8 py-4 rounded-xl font-heading font-semibold text-base bg-neural overflow-hidden transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-lavender to-accent-cyan bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
            {socialLinks.map((social, index) => {
              const colorMap: Record<number, string> = {
                0: 'cyan',
                1: 'lavender',
                2: 'indigo',
                3: 'teal',
                4: 'lavender'
              };
              const color = colorMap[index];
              return (
                <div key={social.label} className="bg-glass rounded-2xl p-6 border border-overlay-medium backdrop-blur-xl hover:border-accent-cyan/40 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-accent-${color}/10 border border-accent-${color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <social.icon className={`w-6 h-6 text-accent-${color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold mb-1">{social.label}</h3>
                      <a 
                        href={social.href} 
                        target={social.label !== 'Email' ? '_blank' : undefined}
                        rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                        className={`text-sm text-muted hover:text-accent-${color} transition-colors`}
                        aria-label={social.label}
                      >
                        {contactCards[index].description}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center max-w-3xl mx-auto">
          <div className="inline-block px-6 py-3 rounded-2xl bg-glass border border-overlay-medium backdrop-blur-xl">
            <p className="text-muted text-sm leading-relaxed">
              <span className="text-accent-cyan font-medium">Currently exploring:</span> AI automation, intelligent systems, and human-centered design. Always open to meaningful conversations about technology and innovation.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </main>
  );
}
