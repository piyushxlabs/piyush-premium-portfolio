import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thoughts | Piyush - Blog & Insights',
  description: 'Thoughts on AI, innovation, and technology',
};

export default function ThoughtsPage() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            Thoughts
          </h1>
          <p className="text-2xl text-muted mb-8">
            Insights on AI, innovation, and the future
          </p>
        </div>
        <div className="text-center text-muted">
          <p>Blog posts coming soon...</p>
        </div>
      </div>
    </main>
  );
}
