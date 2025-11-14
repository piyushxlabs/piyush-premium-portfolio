"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Enhanced particle system with mouse interaction
function DataParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3000;
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  const [positions, colors, sizes, originalPositions] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Improved sphere distribution using Fibonacci sphere algorithm
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 2 + Math.random() * 0.8;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Color gradient from cyan to lavender to teal
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.4) {
        color = new THREE.Color("#22d3ee"); // Cyan
      } else if (colorChoice < 0.7) {
        color = new THREE.Color("#a78bfa"); // Lavender
      } else {
        color = new THREE.Color("#14b8a6"); // Teal
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Depth-based sizing for 3D effect
      sizes[i] = Math.random() * 0.05 + 0.02;
    }

    return [positions, colors, sizes, originalPositions];
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const time = clock.getElapsedTime();
      
      // Smooth rotation with mouse influence
      targetRotation.current.x = mousePos.current.y * 0.3;
      targetRotation.current.y = mousePos.current.x * 0.5;
      
      pointsRef.current.rotation.y += (targetRotation.current.y + time * 0.05 - pointsRef.current.rotation.y) * 0.05;
      pointsRef.current.rotation.x += (targetRotation.current.x + Math.sin(time * 0.1) * 0.1 - pointsRef.current.rotation.x) * 0.05;

      // Pulsing wave effect
      const positionAttr = pointsRef.current.geometry.attributes.position;
      const colorAttr = pointsRef.current.geometry.attributes.color;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const originalX = originalPositions[i3];
        const originalY = originalPositions[i3 + 1];
        const originalZ = originalPositions[i3 + 2];

        // Wave pulse based on distance from center
        const distance = Math.sqrt(originalX ** 2 + originalY ** 2 + originalZ ** 2);
        const wave = Math.sin(distance * 2 - time * 2) * 0.1;
        
        positionAttr.array[i3] = originalX + originalX * wave * 0.1;
        positionAttr.array[i3 + 1] = originalY + originalY * wave * 0.1;
        positionAttr.array[i3 + 2] = originalZ + originalZ * wave * 0.1;

        // Dynamic color brightness
        const brightness = 0.7 + Math.sin(time + distance) * 0.3;
        colorAttr.array[i3] = colors[i3] * brightness;
        colorAttr.array[i3 + 1] = colors[i3 + 1] * brightness;
        colorAttr.array[i3 + 2] = colors[i3 + 2] * brightness;
      }
      
      positionAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Pulsing energy core
function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current && glowRef.current) {
      const time = clock.getElapsedTime();
      const pulse = Math.sin(time * 1.5) * 0.2 + 1;
      
      meshRef.current.scale.setScalar(pulse);
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = time * 0.05;
      
      glowRef.current.scale.setScalar(pulse * 1.3);
      glowRef.current.rotation.y = -time * 0.08;
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Inner core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          wireframe
          transparent
          opacity={0.2}
          emissive="#6366f1"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// Enhanced connection lines with interactive glow
function DataConnections() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();

  const [geometry, connectionColors] = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const connectionCount = 200;

    for (let i = 0; i < connectionCount; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(Math.random() * 2 - 1);
      const radius = 2 + Math.random() * 0.5;

      const x1 = radius * Math.sin(phi1) * Math.cos(theta1);
      const y1 = radius * Math.sin(phi1) * Math.sin(theta1);
      const z1 = radius * Math.cos(phi1);

      const theta2 = theta1 + (Math.random() - 0.5) * 0.6;
      const phi2 = phi1 + (Math.random() - 0.5) * 0.6;

      const x2 = radius * Math.sin(phi2) * Math.cos(theta2);
      const y2 = radius * Math.sin(phi2) * Math.sin(theta2);
      const z2 = radius * Math.cos(phi2);

      positions.push(x1, y1, z1, x2, y2, z2);

      // Color gradient for each line
      const color1 = new THREE.Color("#6366f1");
      const color2 = new THREE.Color("#a78bfa");
      
      colors.push(color1.r, color1.g, color1.b);
      colors.push(color2.r, color2.g, color2.b);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    
    return [geo, new Float32Array(colors)];
  }, []);

  useFrame(({ clock }) => {
    if (linesRef.current) {
      const time = clock.getElapsedTime();
      linesRef.current.rotation.y = time * 0.03;
      linesRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

      // Interactive brightness based on mouse position
      const colorAttr = linesRef.current.geometry.attributes.color;
      const mouseInfluence = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
      const brightness = 0.3 + mouseInfluence * 0.4;
      
      for (let i = 0; i < colorAttr.count; i++) {
        colorAttr.array[i * 3] = connectionColors[i * 3] * brightness;
        colorAttr.array[i * 3 + 1] = connectionColors[i * 3 + 1] * brightness;
        colorAttr.array[i * 3 + 2] = connectionColors[i * 3 + 2] * brightness;
      }
      colorAttr.needsUpdate = true;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// Ambient particles floating around
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const color = new THREE.Color("#22d3ee");
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
        positionAttr.array[i3 + 1] += Math.sin(time + i) * 0.001;
      }
      
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        vertexColors
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function DataSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const height = Math.min(window.innerHeight * 0.6, isMobile ? 400 : 600);
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
      className="relative w-full h-[600px] max-h-[600px]"
      style={{ position: 'relative' }}
      role="img"
      aria-label="Interactive 3D data visualization sphere with neural network particles, pulsing energy core, and dynamic connections responding to mouse movement"
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 8 : 6], fov: isMobile ? 60 : 50 }}
        gl={{ 
          antialias: !isMobile, 
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance"
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#a78bfa" />
        <pointLight position={[0, 0, 0]} intensity={0.8} color="#6366f1" />
        
        <EnergyCore />
        <DataParticles />
        <DataConnections />
        {!isMobile && <AmbientParticles />}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={isMobile}
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Accessibility: Screen reader description */}
      <div className="sr-only">
        An interactive 3D sphere visualization representing data and neural networks. 
        The sphere contains thousands of particles in cyan, lavender, and teal colors, 
        with a pulsing energy core at the center and dynamic connection lines that 
        respond to mouse movement. The visualization creates a futuristic, AI-themed 
        ambient experience.
      </div>
    </div>
  );
}