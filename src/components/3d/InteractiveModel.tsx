"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// DNA Helix Structure - represents growth and evolution
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  const helixPoints = useMemo(() => {
    const points1: THREE.Vector3[] = [];
    const points2: THREE.Vector3[] = [];
    const connections: [THREE.Vector3, THREE.Vector3][] = [];
    const segments = 50;

    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 4; // 2 full rotations
      const y = (i / segments) * 4 - 2;

      const x1 = Math.cos(t) * 0.8;
      const z1 = Math.sin(t) * 0.8;
      const point1 = new THREE.Vector3(x1, y, z1);
      points1.push(point1);

      const x2 = Math.cos(t + Math.PI) * 0.8;
      const z2 = Math.sin(t + Math.PI) * 0.8;
      const point2 = new THREE.Vector3(x2, y, z2);
      points2.push(point2);

      // Create connections every 5 segments
      if (i % 5 === 0) {
        connections.push([point1, point2]);
      }
    }

    return { points1, points2, connections };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      
      // Smooth rotation
      groupRef.current.rotation.y = time * 0.3;
      
      // Wave motion
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
      
      // Mouse interaction - tilt
      groupRef.current.rotation.x = mouse.y * 0.3;
      
      // Hover effect - expand
      const targetScale = hovered ? 1.15 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* First strand */}
      {helixPoints.points1.map((point, i) => (
        <mesh key={`strand1-${i}`} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={hovered ? 0.8 : 0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Second strand */}
      {helixPoints.points2.map((point, i) => (
        <mesh key={`strand2-${i}`} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#a78bfa"
            emissiveIntensity={hovered ? 0.8 : 0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Connection bars */}
      {helixPoints.connections.map((connection, i) => {
        const start = connection[0];
        const end = connection[1];
        const midPoint = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();

        return (
          <mesh
            key={`connection-${i}`}
            position={[midPoint.x, midPoint.y, midPoint.z]}
            rotation={[
              0,
              Math.atan2(direction.x, direction.z),
              Math.asin(direction.y / length),
            ]}
          >
            <cylinderGeometry args={[0.02, 0.02, length, 8]} />
            <meshStandardMaterial
              color="#6366f1"
              emissive="#6366f1"
              emissiveIntensity={hovered ? 0.6 : 0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Geometric crystal lattice - represents structure and intelligence
function CrystalLattice() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const latticeNodes = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const connections: [number, number][] = [];
    const size = 1.5;
    const steps = 3;

    // Create 3D grid of nodes
    for (let x = 0; x < steps; x++) {
      for (let y = 0; y < steps; y++) {
        for (let z = 0; z < steps; z++) {
          const pos = new THREE.Vector3(
            (x / (steps - 1) - 0.5) * size,
            (y / (steps - 1) - 0.5) * size,
            (z / (steps - 1) - 0.5) * size
          );
          const index = nodes.length;
          nodes.push(pos);

          // Connect to adjacent nodes
          if (x > 0) connections.push([index, index - steps * steps]);
          if (y > 0) connections.push([index, index - steps]);
          if (z > 0) connections.push([index, index - 1]);
        }
      }
    }

    return { nodes, connections };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      
      // Rotate in multiple axes
      groupRef.current.rotation.x = time * 0.2;
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.rotation.z = time * 0.1;

      // Pulsing effect
      const pulse = Math.sin(time * 2) * 0.1 + 1;
      groupRef.current.scale.setScalar(hovered ? pulse * 1.2 : pulse);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[3, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Nodes */}
      {latticeNodes.nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={[node.x, node.y, node.z]}>
          <octahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial
            color="#14b8a6"
            emissive="#14b8a6"
            emissiveIntensity={hovered ? 0.9 : 0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Connections */}
      {latticeNodes.connections.map((connection, i) => {
        const start = latticeNodes.nodes[connection[0]];
        const end = latticeNodes.nodes[connection[1]];
        const midPoint = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();

        return (
          <mesh
            key={`lattice-connection-${i}`}
            position={[midPoint.x, midPoint.y, midPoint.z]}
          >
            <cylinderGeometry args={[0.015, 0.015, length, 6]} />
            <meshStandardMaterial
              color="#14b8a6"
              emissive="#14b8a6"
              emissiveIntensity={hovered ? 0.5 : 0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Floating neural network - represents AI and connections
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const networkData = useMemo(() => {
    const nodes: { pos: THREE.Vector3; connections: number[] }[] = [];
    const nodeCount = 12;

    // Create nodes in a sphere
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.2;

      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );

      // Connect to 2-3 nearby nodes
      const connections: number[] = [];
      const connectionCount = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount);
        if (targetIndex !== i && !connections.includes(targetIndex)) {
          connections.push(targetIndex);
        }
      }

      nodes.push({ pos, connections });
    }

    return nodes;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      
      // Continuous rotation
      groupRef.current.rotation.y = clicked ? time * 0.8 : time * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;

      // Hover expansion
      const targetScale = hovered ? 1.2 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={[-3, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Network nodes */}
      {networkData.map((node, i) => (
        <mesh
          key={`neural-node-${i}`}
          position={[node.pos.x, node.pos.y, node.pos.z]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={clicked ? "#a78bfa" : "#6366f1"}
            emissive={clicked ? "#a78bfa" : "#6366f1"}
            emissiveIntensity={hovered ? 1 : 0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Connections */}
      {networkData.map((node, i) =>
        node.connections.map((targetIndex, j) => {
          const start = node.pos;
          const end = networkData[targetIndex].pos;
          const midPoint = new THREE.Vector3()
            .addVectors(start, end)
            .multiplyScalar(0.5);
          const direction = new THREE.Vector3().subVectors(end, start);
          const length = direction.length();

          return (
            <mesh
              key={`neural-connection-${i}-${j}`}
              position={[midPoint.x, midPoint.y, midPoint.z]}
            >
              <cylinderGeometry args={[0.01, 0.01, length, 6]} />
              <meshStandardMaterial
                color={clicked ? "#a78bfa" : "#6366f1"}
                emissive={clicked ? "#a78bfa" : "#6366f1"}
                emissiveIntensity={hovered ? 0.5 : 0.2}
                transparent
                opacity={0.5}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
}

// Ambient particles for depth
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 400;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.33) {
        color = new THREE.Color("#22d3ee");
      } else if (colorChoice < 0.66) {
        color = new THREE.Color("#a78bfa");
      } else {
        color = new THREE.Color("#14b8a6");
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      const positionAttr = particlesRef.current.geometry.attributes.position;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionAttr.array[i3] += Math.sin(time + i) * 0.002;
        positionAttr.array[i3 + 1] += Math.cos(time + i) * 0.002;
      }

      positionAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Light rays for atmosphere
function LightRays() {
  const raysRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (raysRef.current) {
      raysRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={raysRef}>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={`ray-${i}`}
            position={[Math.cos(angle) * 3, Math.sin(angle) * 3, -2]}
            rotation={[0, 0, angle]}
          >
            <planeGeometry args={[0.08, 4]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#22d3ee" : "#a78bfa"}
              transparent
              opacity={0.15}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function InteractiveModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const height = Math.min(
          window.innerHeight * 0.6,
          isMobile ? 400 : 500
        );
        containerRef.current.style.height = `${height}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] max-h-[500px] cursor-pointer"
      role="img"
      aria-label="Interactive 3D holographic models featuring a DNA helix representing growth and evolution, a crystal lattice network symbolizing structured intelligence, and a neural network demonstrating AI connections. All models respond to mouse hover, drag, and click interactions with smooth animations, pulsing effects, and color transitions."
    >
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 8 : 7],
          fov: isMobile ? 60 : 50,
        }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={0.7} color="#a78bfa" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#14b8a6" />
        <spotLight
          position={[0, 8, 0]}
          angle={0.5}
          penumbra={1}
          intensity={0.5}
          color="#6366f1"
        />

        {!isMobile && <LightRays />}
        {!isMobile && <AmbientParticles />}

        <DNAHelix />
        <CrystalLattice />
        <NeuralNetwork />

        <OrbitControls
          enableZoom={!isMobile}
          enablePan={false}
          autoRotate={isMobile}
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
          minDistance={isMobile ? 6 : 5}
          maxDistance={isMobile ? 12 : 10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Accessibility: Screen reader description */}
      <div className="sr-only">
        An interactive 3D holographic scene featuring three distinct structures:
        1. A DNA double helix in cyan and lavender colors, representing continuous
        growth, evolution, and biological intelligence. The helix rotates smoothly
        and expands on hover.
        2. A crystal lattice network in teal, symbolizing structured data,
        organized intelligence, and systematic thinking. The lattice rotates on
        multiple axes with a pulsing effect.
        3. A neural network in indigo and lavender, demonstrating artificial
        intelligence, machine learning, and interconnected systems. The network can
        be clicked to increase rotation speed and change colors.
        All models respond to mouse interactions with smooth animations, metallic
        materials, and glowing emissive effects. Ambient particles and light rays
        create an immersive, futuristic atmosphere.
      </div>

      {/* Interaction hints */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-xs text-text-muted pointer-events-none">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
          Hover to highlight
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
          Click neural net
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
          Drag to rotate
        </span>
      </div>
    </div>
  );
}

