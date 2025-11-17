"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Flowing particles along infinity path
function InfinityParticles({ path }: { path: THREE.CatmullRomCurve3 }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  const [positions, colors, speeds] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const point = path.getPoint(t);
      
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;

      // Gradient colors along the path
      const color1 = new THREE.Color("#22d3ee"); // Cyan
      const color2 = new THREE.Color("#a78bfa"); // Lavender
      const color = color1.clone().lerp(color2, t);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      speeds[i] = 0.5 + Math.random() * 0.5;
    }

    return [positions, colors, speeds];
  }, [path]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      const positionAttr = particlesRef.current.geometry.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        const t = ((i / particleCount) + time * speeds[i] * 0.1) % 1;
        const point = path.getPoint(t);
        
        positionAttr.array[i * 3] = point.x;
        positionAttr.array[i * 3 + 1] = point.y;
        positionAttr.array[i * 3 + 2] = point.z;
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Enhanced infinity shape with multiple layers
function InfinityShape() {
  const groupRef = useRef<THREE.Group>(null);
  const tube1Ref = useRef<THREE.Mesh>(null);
  const tube2Ref = useRef<THREE.Mesh>(null);
  const glowRing1Ref = useRef<THREE.Mesh>(null);
  const glowRing2Ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Create infinity paths
  const [path1, path2, fullPath] = useMemo(() => {
    // Left loop
    const curve1 = new THREE.EllipseCurve(
      -1.2, 0,
      1, 1.4,
      0, 2 * Math.PI,
      false,
      0
    );

    // Right loop
    const curve2 = new THREE.EllipseCurve(
      1.2, 0,
      1, 1.4,
      0, 2 * Math.PI,
      false,
      0
    );

    const points1 = curve1.getPoints(100);
    const points2 = curve2.getPoints(100);

    const path1 = new THREE.CatmullRomCurve3(
      points1.map(p => new THREE.Vector3(p.x, p.y, 0))
    );

    const path2 = new THREE.CatmullRomCurve3(
      points2.map(p => new THREE.Vector3(p.x, p.y, 0))
    );

    // Combined path for particles
    const allPoints = [...points1, ...points2];
    const fullPath = new THREE.CatmullRomCurve3(
      allPoints.map(p => new THREE.Vector3(p.x, p.y, 0))
    );

    return [path1, path2, fullPath];
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      
      // Smooth continuous rotation
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      
      // Mouse interaction - tilt effect
      groupRef.current.rotation.z = mouse.x * 0.2;
      groupRef.current.rotation.x += mouse.y * 0.1;
    }

    // Pulsing animation
    if (tube1Ref.current && tube2Ref.current) {
      const time = clock.getElapsedTime();
      const pulse = Math.sin(time * 1.5) * 0.15 + 1;
      
      tube1Ref.current.scale.setScalar(pulse);
      tube2Ref.current.scale.setScalar(pulse);
    }

    // Glow rings animation
    if (glowRing1Ref.current && glowRing2Ref.current) {
      const time = clock.getElapsedTime();
      const glowPulse = Math.sin(time * 2) * 0.2 + 1;
      
      glowRing1Ref.current.scale.setScalar(glowPulse * 1.2);
      glowRing2Ref.current.scale.setScalar(glowPulse * 1.2);
      
      glowRing1Ref.current.rotation.z = time * 0.5;
      glowRing2Ref.current.rotation.z = -time * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={[1.3, 1.3, 1.3]}>
      {/* Outer glow rings */}
      <mesh ref={glowRing1Ref}>
        <tubeGeometry args={[path1, 64, 0.12, 8, false]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={glowRing2Ref}>
        <tubeGeometry args={[path2, 64, 0.12, 8, false]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main tubes */}
      <mesh ref={tube1Ref}>
        <tubeGeometry args={[path1, 100, 0.08, 16, false]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh ref={tube2Ref}>
        <tubeGeometry args={[path2, 100, 0.08, 16, false]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Center connection glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Flowing particles */}
      <InfinityParticles path={fullPath} />
    </group>
  );
}

// Ambient light rays
function LightRays() {
  const raysRef = useRef<THREE.Group>(null);
  const rayCount = 8;

  const rays = useMemo(() => {
    const raysArray = [];
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      raysArray.push({
        rotation: angle,
        color: i % 2 === 0 ? "#22d3ee" : "#a78bfa"
      });
    }
    return raysArray;
  }, []);

  useFrame(({ clock }) => {
    if (raysRef.current) {
      raysRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={raysRef}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={[Math.cos(ray.rotation) * 2, Math.sin(ray.rotation) * 2, -1]}
          rotation={[0, 0, ray.rotation]}
        >
          <planeGeometry args={[0.05, 3]} />
          <meshBasicMaterial
            color={ray.color}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Background ambient particles
function BackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 300;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

      const color = Math.random() > 0.5 
        ? new THREE.Color("#22d3ee") 
        : new THREE.Color("#a78bfa");
      
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
        positionAttr.array[i3] += Math.sin(time + i) * 0.001;
        positionAttr.array[i3 + 1] += Math.cos(time + i) * 0.001;
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
        size={0.02}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function InfinityLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const height = Math.min(window.innerHeight * 0.5, isMobile ? 300 : 400);
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
      className="absolute inset-0 w-full h-full overflow-visible"
      role="img"
      aria-label="3D animated infinity symbol representing continuous learning, limitless creativity, and infinite growth. The symbol features flowing cyan and lavender tubes with particle trails, pulsing glow effects, and interactive rotation that responds to mouse movement."
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ 
          position: [0, 0, isMobile ? 5 : 4], 
          fov: isMobile ? 60 : 50 
        }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance"
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.8} color="#22d3ee" />
        <pointLight position={[-3, -3, -3]} intensity={1.4} color="#a78bfa" />
        <pointLight position={[0, 0, 2]} intensity={1.2} color="#6366f1" />

        {!isMobile && <LightRays />}
        {!isMobile && <BackgroundParticles />}
        <InfinityShape />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={isMobile}
          autoRotateSpeed={1}
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Accessibility: Screen reader description */}
      <div className="sr-only">
        An interactive 3D infinity symbol visualization featuring two interlocking loops
        in cyan and lavender colors. The symbol continuously rotates and pulses with
        glowing effects, symbolizing infinite learning, boundless creativity, and
        perpetual growth. Flowing particles trace the infinity path, creating a
        mesmerizing effect. The visualization responds to mouse movement with smooth
        tilting interactions.
      </div>
    </div>
  );
}