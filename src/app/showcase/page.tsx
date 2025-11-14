'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { DataSphere } from '@/components/3d/DataSphere';
import { FloatingGeometry } from '@/components/3d/FloatingGeometry';
import { InfinityLoop } from '@/components/3d/InfinityLoop';
import { InteractiveModel } from '@/components/3d/InteractiveModel';
import { NeuralNetwork } from '@/components/3d/NeuralNetwork';
import { ParticleField } from '@/components/3d/ParticleField';

const components = [
  { name: 'DataSphere', component: DataSphere, description: 'Rotating sphere with particles and neural connections' },
  { name: 'FloatingGeometry', component: FloatingGeometry, description: 'Wireframe shapes floating independently' },
  { name: 'InfinityLoop', component: InfinityLoop, description: 'Pulsing 3D infinity symbol' },
  { name: 'InteractiveModel', component: InteractiveModel, description: 'Interactive shapes responding to hover and click' },
  { name: 'NeuralNetwork', component: NeuralNetwork, description: 'Neural nodes with connections and pulsing core' },
  { name: 'ParticleField', component: ParticleField, description: 'Thousands of particles with wave motion' },
];

export default function ShowcasePage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-accent-cyan/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-muted">3D Component Gallery</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            3D Showcase
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            Interactive 3D visualizations powered by Three.js and React Three Fiber
          </p>
        </motion.div>

        <div className="space-y-32">
          {components.map((item, index) => {
            const Component = item.component;
            return (
              <motion.section
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">{item.name}</h2>
                  <p className="text-muted">{item.description}</p>
                </div>
                <div className="bg-glass rounded-3xl p-4 md:p-8 border border-overlay-medium backdrop-blur-xl">
                  <Component />
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
