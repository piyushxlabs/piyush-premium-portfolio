'use client';

import { Metadata } from 'next';
import { Mail, Github, Linkedin, Twitter, Instagram, Send, Sparkles } from 'lucide-react';
import { useState, FormEvent } from 'react';

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
    <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-glow opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-accent-cyan/20 mb-4">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-accent-cyan font-medium">Let's Build Together</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-gradient-heading">
            Connect & Collaborate
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto">
            Every great innovation starts with a conversation. Let's create something intelligent.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-glass rounded-3xl p-8 md:p-10 border border-overlay-medium relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-accent-lavender/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-3">Send a Message</h2>
                <p className="text-muted mb-8">Share your ideas, questions, or collaboration opportunities</p>

                {submitted ? (
                  <div className="py-16 text-center space-y-4 animate-fade-up">
                    <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                      <Send className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-2xl font-heading font-semibold">Message Sent!</h3>
                    <p className="text-muted">I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/90">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-5 py-3.5 bg-background-surface/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan transition-all duration-300 placeholder:text-muted/50"
                        placeholder="Piyush Jaguri"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/90">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-5 py-3.5 bg-background-surface/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan transition-all duration-300 placeholder:text-muted/50"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-foreground/90">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-5 py-3.5 bg-background-surface/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan transition-all duration-300 resize-none placeholder:text-muted/50"
                        placeholder="Tell me about your project or idea..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-lavender rounded-xl font-heading font-semibold text-background overflow-hidden transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-lavender to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="bg-glass rounded-2xl p-6 border border-overlay-medium">
              <p className="text-sm text-muted leading-relaxed">
                <span className="text-accent-cyan font-medium">Open to:</span> AI collaborations, startup discussions, mentorship opportunities, and innovative project ideas that create meaningful impact.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-glass rounded-2xl p-6 border border-overlay-medium">
              <h3 className="font-heading font-semibold text-lg mb-4">Direct Contact</h3>
              <a
                href="mailto:piyushjaguri13@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl bg-background-surface/30 border border-border hover:border-accent-cyan transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors">
                  <Mail className="w-5 h-5 text-accent-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted mb-0.5">Email</p>
                  <p className="text-sm font-medium truncate">piyushjaguri13@gmail.com</p>
                </div>
              </a>
            </div>

            <div className="bg-glass rounded-2xl p-6 border border-overlay-medium">
              <h3 className="font-heading font-semibold text-lg mb-4">Social Links</h3>
              <div className="space-y-3">
                {[
                  { icon: Github, label: 'GitHub', handle: '@piyushxlabs', url: 'https://github.com/piyushxlabs' },
                  { icon: Linkedin, label: 'LinkedIn', handle: 'Piyush Jaguri', url: 'https://www.linkedin.com/in/piyush-jaguri-a9169338b/' },
                  { icon: Twitter, label: 'Twitter', handle: '@piyushxlabs', url: 'https://x.com/piyushxlabs' },
                  { icon: Instagram, label: 'Instagram', handle: '@lost.in.piyush', url: 'https://www.instagram.com/lost.in.piyush?igsh=MXN4NWY5YW80YTc1Mw==' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-background-surface/30 transition-all group"
                  >
                    <social.icon className="w-5 h-5 text-accent-cyan group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{social.label}</p>
                      <p className="text-xs text-muted">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-cyan/10 to-accent-lavender/10 rounded-2xl p-6 border border-accent-cyan/20">
              <p className="text-sm leading-relaxed">
                <span className="font-heading font-semibold text-accent-cyan">Building intelligence with empathy</span> — one conversation at a time. Let's shape the future together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}




