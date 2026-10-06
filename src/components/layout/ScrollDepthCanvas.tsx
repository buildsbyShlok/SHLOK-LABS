'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

export function ScrollDepthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.05);

    const camera = new THREE.PerspectiveCamera(
      38,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      40
    );
    camera.position.set(0, 0, 9.5);

    // ==========================================
    // LIGHTING
    // ==========================================
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 1.8);
    keyLight.position.set(8, 12, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x3b82f6, 1.2);
    rimLight.position.set(-8, -6, 5);
    scene.add(rimLight);

    // ==========================================
    // 3D HARDWARE / MICROCONTROLLER DIE ASSEMBLY
    // ==========================================
    const assemblyGroup = new THREE.Group();
    scene.add(assemblyGroup);

    // 1. Base Multi-layer Substrate (Dark Ceramic BGA Package)
    const substrateGeo = new THREE.BoxGeometry(3.8, 3.8, 0.16);
    const substrateMat = new THREE.MeshStandardMaterial({
      color: 0x121215,
      roughness: 0.35,
      metalness: 0.85,
    });
    const substrateMesh = new THREE.Mesh(substrateGeo, substrateMat);
    assemblyGroup.add(substrateMesh);

    // Wireframe Shell
    const wireframeGeo = new THREE.BoxGeometry(3.84, 3.84, 0.18);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    assemblyGroup.add(wireframeMesh);

    // 2. Central Silicon Die (Polished Core)
    const dieGroup = new THREE.Group();
    dieGroup.position.z = 0.14;
    assemblyGroup.add(dieGroup);

    const dieGeo = new THREE.BoxGeometry(1.8, 1.8, 0.14);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.1,
      metalness: 0.95,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.25,
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieGroup.add(dieMesh);

    // Inner Core Marking Ring
    const innerCoreGeo = new THREE.RingGeometry(0.35, 0.5, 24);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    innerCoreMesh.position.z = 0.08;
    dieGroup.add(innerCoreMesh);

    // 3. Perimeter Lead Frame / Gold Pins
    const pinGroup = new THREE.Group();
    const pinGeo = new THREE.BoxGeometry(0.09, 0.24, 0.08);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x2563eb,
      emissiveIntensity: 0.35,
    });

    for (let i = -1.6; i <= 1.6; i += 0.32) {
      // Top & Bottom
      const pinT = new THREE.Mesh(pinGeo, pinMat);
      pinT.position.set(i, 2.0, 0);
      pinGroup.add(pinT);

      const pinB = new THREE.Mesh(pinGeo, pinMat);
      pinB.position.set(i, -2.0, 0);
      pinGroup.add(pinB);

      // Left & Right
      const pinL = new THREE.Mesh(pinGeo, pinMat);
      pinL.rotation.z = Math.PI / 2;
      pinL.position.set(-2.0, i, 0);
      pinGroup.add(pinL);

      const pinR = new THREE.Mesh(pinGeo, pinMat);
      pinR.rotation.z = Math.PI / 2;
      pinR.position.set(2.0, i, 0);
      pinGroup.add(pinR);
    }
    assemblyGroup.add(pinGroup);

    // 4. SMT Passive Components (Decoupling Capacitor Arrays)
    const smtGroup = new THREE.Group();
    const capGeo = new THREE.BoxGeometry(0.18, 0.1, 0.09);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      roughness: 0.3,
      metalness: 0.7,
    });

    const capCoords: [number, number][] = [
      [-1.3, 1.3], [-1.0, 1.3], [1.0, 1.3], [1.3, 1.3],
      [-1.3, -1.3], [-1.0, -1.3], [1.0, -1.3], [1.3, -1.3],
      [-1.3, 0.0], [1.3, 0.0]
    ];
    capCoords.forEach(([x, y]) => {
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(x, y, 0.1);
      smtGroup.add(cap);
    });
    assemblyGroup.add(smtGroup);

    // 5. High-Density Micro Circuit Traces
    const traceCount = 28;
    const tracePositions = new Float32Array(traceCount * 6);
    for (let i = 0; i < traceCount; i++) {
      const angle = (i / traceCount) * Math.PI * 2;
      const rInner = 1.0;
      const rOuter = 1.85;
      tracePositions[i * 6] = Math.cos(angle) * rInner;
      tracePositions[i * 6 + 1] = Math.sin(angle) * rInner;
      tracePositions[i * 6 + 2] = 0.09;
      tracePositions[i * 6 + 3] = Math.cos(angle + 0.1) * rOuter;
      tracePositions[i * 6 + 4] = Math.sin(angle + 0.1) * rOuter;
      tracePositions[i * 6 + 5] = 0.09;
    }
    const traceGeo = new THREE.BufferGeometry();
    traceGeo.setAttribute('position', new THREE.BufferAttribute(tracePositions, 3));
    const traceMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const traceLines = new THREE.LineSegments(traceGeo, traceMat);
    assemblyGroup.add(traceLines);

    // 6. Ambient Floating Particles
    const particleCount = 40;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.04,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // RENDER & SCROLL DYNAMICS
    // ==========================================
    let animationFrameId: number;
    let lastTime = performance.now();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = now * 0.0006;

      const p = scrollYProgress.get();

      // Precision Scroll-Driven 3D Transformations
      // Base rotation + scroll angle progression
      assemblyGroup.rotation.x = 0.35 + p * Math.PI * 1.4 + Math.sin(time * 0.6) * 0.04;
      assemblyGroup.rotation.y = 0.45 + p * Math.PI * 1.6 + Math.cos(time * 0.5) * 0.04;
      assemblyGroup.rotation.z = p * 0.4 + Math.sin(time * 0.3) * 0.02;

      // Dynamic Position Path along page sections
      // Hero (p ~ 0): Off-center right
      // About / Experience (p ~ 0.2-0.5): Sweeps left and lifts slightly
      // Projects / Skills (p ~ 0.6-0.8): Recedes deep along Z-axis
      // Contact (p ~ 1.0): Settles bottom right
      assemblyGroup.position.x = (1 - p) * 2.2 + Math.sin(p * Math.PI * 2) * 1.5;
      assemblyGroup.position.y = Math.cos(p * Math.PI * 1.6) * 0.6 - p * 1.0;
      assemblyGroup.position.z = -1.0 - p * 3.8;

      // Layer Separation on Scroll
      dieGroup.position.z = 0.14 + Math.sin(p * Math.PI) * 0.75;
      wireframeMesh.position.z = Math.sin(p * Math.PI * 2) * 0.35;
      traceMat.opacity = 0.25 + Math.sin(p * Math.PI * 3) * 0.2;

      // Slow particle field drift
      particles.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 md:opacity-45">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
