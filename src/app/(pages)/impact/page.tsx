import { Metadata } from 'next';
import VisionBackground from '@/components/ui/VisionBackground';

export const metadata: Metadata = {
  title: 'Impact | Piyush - Creating Value',
  description: 'The impact of my work and projects.',
};

export default function ImpactPage() {
  return (
    <main className="relative min-h-screen grid place-items-center py-24 overflow-hidden">
      <VisionBackground />
      <div className="relative z-10 text-center space-y-4 text-slate-400">
        <p className="text-sm uppercase tracking-[0.4em]">Coming Soon</p>
        <h1 className="text-3xl font-semibold text-slate-100">Impact page placeholder</h1>
      </div>
    </main>
  );
}
