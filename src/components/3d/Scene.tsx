"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

interface SceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  autoRotate?: boolean;
  className?: string;
}

export function Scene({
  children,
  cameraPosition = [0, 0, 5],
  enableControls = true,
  autoRotate = false,
  className = "h-[600px] w-full",
}: SceneProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#a78bfa" />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} color="#14b8a6" />

        <Suspense fallback={null}>
          {children}
        </Suspense>

        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        )}
      </Canvas>
    </div>
  );
}
