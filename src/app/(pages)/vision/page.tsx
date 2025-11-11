import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision | Piyush - Future AI Founder',
  description: 'My vision for building AI startups with social impact',
};

export default function VisionPage() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            Vision
          </h1>
          <p className="text-2xl text-muted mb-8">
            Building AI startups that empower humanity
          </p>
        </div>
        <div className="text-center text-muted">
          <p className="text-lg leading-relaxed">
            My long-term vision is to build AI-driven startups that focus on ethical automation,
            creative intelligence, and social impact.
          </p>
        </div>
      </div>
    </main>
  );
}
