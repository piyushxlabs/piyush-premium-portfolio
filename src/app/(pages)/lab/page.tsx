import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab | Piyush - AI Experiments',
  description: 'AI experiments and playground projects',
};

export default function LabPage() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            AI Lab
          </h1>
          <p className="text-2xl text-muted mb-8">
            Experimental AI projects and explorations
          </p>
        </div>
        <div className="text-center text-muted">
          <p>AI experiments coming soon...</p>
        </div>
      </div>
    </main>
  );
}
