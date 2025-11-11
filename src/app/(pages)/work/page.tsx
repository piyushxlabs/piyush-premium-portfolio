import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work | Piyush - AI Portfolio',
  description: 'Explore my AI, ML, and Data Science projects',
};

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-gradient-heading">
            My Work
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            A collection of AI, ML, and automation projects
          </p>
        </div>
        <div className="text-center text-muted">
          <p>Projects showcase coming soon...</p>
        </div>
      </div>
    </main>
  );
}
