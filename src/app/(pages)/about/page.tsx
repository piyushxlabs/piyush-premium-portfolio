import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About | Piyush - AI Innovator & Visionary',
  description: 'Discover the journey of Piyush - an 18-year-old AI innovator exploring how intelligence, design, and empathy can shape a better future through data science and automation.',
  openGraph: {
    title: 'About Piyush - Young AI Innovator',
    description: 'Building intelligence with empathy — one idea at a time.',
    images: ['/images/about/piyush.png'],
  },
};

export default function AboutPage() {
  const values = [
    { icon: '🔍', title: 'Curiosity', description: 'Always exploring how intelligence works — in humans and machines.' },
    { icon: '💎', title: 'Integrity', description: 'Building technology that\'s ethical, transparent, and human-centered.' },
    { icon: '⚡', title: 'Innovation', description: 'Continuously blending ideas, tools, and logic to create something new.' },
    { icon: '❤️', title: 'Empathy', description: 'Designing AI that feels human — connecting logic with emotion.' },
    { icon: '🎯', title: 'Purpose', description: 'Every project exists to make life better, not just smarter.' },
    { icon: '🌱', title: 'Growth', description: 'Embracing continuous learning and evolution.' }
  ];

  const journey = [
    { phase: 'Learning', description: 'I began teaching myself the foundations — Python, data structures, and the logic behind machine learning. Step by step, I explored AI, Data Science, and Automation through online resources, real-world experiments, and community learning.' },
    { phase: 'Building', description: 'I\'ve studied how algorithms make decisions, built small AI projects, explored automation workflows, and designed experiments that connect data with design, logic with creativity.' },
    { phase: 'Evolving', description: 'Every project I\'ve worked on has one common goal: to understand how intelligent systems can make life simpler, smarter, and more human.' }
  ];

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-accent-cyan rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-lavender rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 text-gradient">
              Building Intelligence
            </h1>
            <p className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
              with Empathy
            </p>
            <div className="w-24 h-1 mx-auto bg-neural rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            <div className="relative group">
              <div className="absolute inset-0 bg-neural rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-accent-cyan/20 bg-glass">
                <Image
                  src="/images/about/piyush.png"
                  alt="Piyush - AI Innovator"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-heading font-bold text-foreground">
                  Hey, I'm <span className="text-accent-cyan">Piyush</span>
                </h2>
                <p className="text-xl text-muted leading-relaxed">
                  An 18-year-old AI & Data Science learner exploring how intelligence can create impact, empathy, and innovation.
                </p>
              </div>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I believe AI is not just technology — it's a reflection of how humans think, decide, and dream. My purpose is to create ethical, human-centered AI systems that enhance creativity, productivity, and opportunity.
                </p>
                <p>
                  What drives me isn't just curiosity — it's the belief that intelligence, when built with empathy, can transform societies, empower people, and solve problems that truly matter.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-xl bg-glass border border-accent-cyan/20">
                  <div className="text-3xl font-bold text-accent-cyan">18</div>
                  <div className="text-sm text-muted mt-1">Years Young</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-glass border border-accent-lavender/20">
                  <div className="text-3xl font-bold text-accent-lavender">∞</div>
                  <div className="text-sm text-muted mt-1">Learning</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-glass border border-accent-teal/20">
                  <div className="text-3xl font-bold text-accent-teal">AI</div>
                  <div className="text-sm text-muted mt-1">Passion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-glass border border-accent-cyan/20 rounded-3xl p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-neural flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground">The Spark</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              My journey into AI began with a simple curiosity — how can machines think, learn, and understand like humans?
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As a teenager, I was fascinated by how data could reveal patterns that even humans miss. Watching how AI could write, create, and solve problems made me realize one thing — intelligence isn't just something we use, it's something we can build.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Core Values
            </h2>
            <p className="text-xl text-muted">
              The principles that guide my work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-glass border border-white/10 hover:border-accent-cyan/50 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 via-accent-indigo/10 to-accent-lavender/10" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center space-y-8">
            <div className="text-6xl md:text-8xl opacity-20">"</div>
            <blockquote className="text-3xl md:text-4xl font-heading font-semibold text-foreground leading-relaxed">
              I design intelligence with empathy — blending data, emotion, and purpose into meaningful innovation.
            </blockquote>
            <div className="w-24 h-1 mx-auto bg-neural rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              The Journey
            </h2>
            <p className="text-xl text-muted">
              From curiosity to creation
            </p>
          </div>

          <div className="space-y-8">
            {journey.map((item, index) => (
              <div
                key={index}
                className="relative pl-12 pb-8 border-l-2 border-accent-cyan/30 last:border-l-0"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-neural" />
                <h3 className="text-2xl font-heading font-bold text-accent-cyan mb-3">
                  {item.phase}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 mb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-accent-cyan/10 to-accent-lavender/10 border border-accent-cyan/20 rounded-3xl p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-neural flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground">Vision</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              My long-term vision is to build AI startups that combine technical innovation with social impact — creating intelligent products that empower learners, creators, and organizations.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In the future, I see myself as a founder who bridges human creativity with artificial intelligence, shaping tools that not only automate work — but amplify human potential.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
