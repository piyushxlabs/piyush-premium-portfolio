import { Metadata } from 'next';
import VisionBackground from '@/components/ui/VisionBackground';

export const metadata: Metadata = {
  title: 'Journey | Piyush - Learning Timeline',
  description: 'My learning journey in AI and Data Science',
};

export default function JourneyPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-16 overflow-hidden">
      <VisionBackground />
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading text-slate-100">
            My Journey
          </h1>
          <p className="text-2xl text-slate-400 mb-8">
            The path from curiosity to creation
          </p>
        </div>
        <div className="text-center text-slate-500">
          <p>Interactive timeline coming soon...</p>
        </div>
      </div>
    </main>
  );
}
