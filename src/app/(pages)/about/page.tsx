import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Piyush - AI Innovator',
  description: 'Learn about my journey in AI and Data Science',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            About Me
          </h1>
          <p className="text-2xl text-muted mb-8">
            Building intelligence with empathy
          </p>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-muted leading-relaxed mb-6">
            My journey into AI began with a simple curiosity — how can machines think, learn, and understand like humans?
          </p>
          <p className="text-lg text-muted leading-relaxed">
            Extended about content coming soon...
          </p>
        </div>
      </div>
    </main>
  );
}
