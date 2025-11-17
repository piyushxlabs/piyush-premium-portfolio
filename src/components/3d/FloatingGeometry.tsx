"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// --- Individual Shape Components ---

function Icosahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.65}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function Torus({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function Octahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.25;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

// --- Main 3D Scene Component ---

export function FloatingGeometry() {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-visible"
      role="img"
      aria-label="Floating geometric shapes with wireframe design"
    >
      {/* UPDATE: Camera FOV (Field of View) ko 50 se 45 kar diya hai, taaki cheezein thodi chhoti aur door dikhein. */}
      <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1.3} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#a78bfa" />

        {/* UPDATE 1: Global scale ko 0.8 se 0.75 kar diya hai (aur subtle look ke liye). */}
        <group scale={[0.75, 0.75, 0.75]}>
          
          {/* UPDATE 2 & 3: Elements ko 7 se 5 kar diya hai aur text ko clear rakhne ke liye unhe sides mein move kar diya hai.
            - X-values (jaise -6, 7, -5) ab center (0) se kaafi door hain.
            - Z-values (jaise -2, -3, 0) alag-alag rakhe hain taaki cinematic depth bani rahe.
            - Y-values (jaise 1.5, -2) abhi bhi safe hain taaki bottom clipping na ho.
          */}
          
          <Icosahedron position={[-6, 1.5, -2]} color="#5EEAD4" />   {/* Soft Aqua - Calm futuristic */}
<Torus       position={[7, 0, -3]}  color="#818CF8" />   {/* Soft Indigo - Premium feel */}
<Octahedron  position={[-3, -1, 0]} color="#67E8F9" />   {/* Light Cyan - Airy spacing */}
<Icosahedron position={[5, 2, -1]}  color="#A5B4FC" />   {/* Soft Lavender Accent */}
<Torus       position={[5, -3.0, -6]}  color="#4ADE80" />   {/* Emerald Green - Visual balance */}


          {/* (Ye shape center mein hai (X:0) lekin kaafi upar (Y:3) aur kaafi peeche (Z:-6) hai, isliye ye chhota dikhega aur text ke upar nahi aayega) */}

        </group>
      </Canvas>
    </div>
  );
}