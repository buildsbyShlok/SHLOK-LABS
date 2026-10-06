'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { soundManager } from '@/lib/sound';

interface StoryStage {
  id: string;
  step: string;
  title: string;
  sub: string;
  desc: string;
  metrics: { label: string; value: string }[];
  range: [number, number];
  targetProgress: number;
}

const STAGES: StoryStage[] = [
  {
    id: 'physical',
    step: '01 / 06',
    title: 'PHYSICAL SYSTEM',
    sub: 'Differential & Mecanum Chassis',
    desc: 'Autonomous mobile robot platform built on a custom anodized aluminum structural chassis with independent suspension and high-torque direct-drive hub motors.',
    metrics: [
      { label: 'DRIVE TYPE', value: '4-Wheel Omni' },
      { label: 'PAYLOAD', value: '15.0 kg' },
      { label: 'TOP SPEED', value: '1.8 m/s' },
      { label: 'CHASSIS', value: 'AL-6061 CNC' },
    ],
    range: [0.0, 0.18],
    targetProgress: 0.08,
  },
  {
    id: 'wireframe',
    step: '02 / 06',
    title: 'STRUCTURAL DECONSTRUCTION',
    sub: 'CAD Wireframe & Internal Kinematics',
    desc: 'Exploded structural breakdown revealing compute bay, power distribution board, motor controllers, and vibration-damped sensor mounting arrays.',
    metrics: [
      { label: 'COMPUTE', value: 'RPi 4 + MCU' },
      { label: 'BUS PROTOCOL', value: 'CAN / UART' },
      { label: 'POWER RAIL', value: '24V LiFePO4' },
      { label: 'MASS INERTIA', value: '0.42 kg·m²' },
    ],
    range: [0.18, 0.36],
    targetProgress: 0.28,
  },
  {
    id: 'perception',
    step: '03 / 06',
    title: 'PERCEPTION SUITE',
    sub: '360° LiDAR & Stereo Vision Frustum',
    desc: 'Multi-modal perception pipeline fusing 10Hz 360° laser scan points with RGB-D depth camera frustums and ultrasonic proximity rings for blind-spot elimination.',
    metrics: [
      { label: 'LIDAR RATE', value: '10 Hz / 360°' },
      { label: 'DEPTH FOV', value: '87° × 58°' },
      { label: 'RANGE', value: '0.15m – 12.0m' },
      { label: 'FUSION LATENCY', value: '< 18 ms' },
    ],
    range: [0.36, 0.54],
    targetProgress: 0.45,
  },
  {
    id: 'slam',
    step: '04 / 06',
    title: 'SPATIAL SLAM MAPPING',
    sub: 'Real-time Occupancy Grid & Point Cloud',
    desc: 'Simultaneous Localization and Mapping (Cartographer / Gmapping) generating 2D/3D probabilistic occupancy grids and loop-closure landmark graphs.',
    metrics: [
      { label: 'GRID RESOLUTION', value: '0.05 m/cell' },
      { label: 'LANDMARKS', value: '1,420 pts' },
      { label: 'LOOP CLOSURE', value: 'Active' },
      { label: 'POSE DRIFT', value: '< 1.2%' },
    ],
    range: [0.54, 0.72],
    targetProgress: 0.63,
  },
  {
    id: 'planning',
    step: '05 / 06',
    title: 'MOTION PLANNING & TRAJECTORY',
    sub: 'Global A* / Dijkstra + Local DWA',
    desc: 'Dynamic Window Approach (DWA) obstacle avoidance recalculating costmaps at 20Hz, computing collision-free Bézier velocity curves toward target waypoints.',
    metrics: [
      { label: 'PLANNER', value: 'TEB / DWA' },
      { label: 'REPLAN RATE', value: '20 Hz' },
      { label: 'WAYPOINTS', value: '5 Generated' },
      { label: 'COSTMAP', value: 'Dynamic Layer' },
    ],
    range: [0.72, 0.90],
    targetProgress: 0.81,
  },
  {
    id: 'integrated',
    step: '06 / 06',
    title: 'AUTONOMOUS SYSTEM SYNTHESIS',
    sub: 'Unified Hardware & Software Stack',
    desc: 'From low-level embedded motor controllers to high-level neural vision and web-based telemetry dashboards — bridging code with physical moving systems.',
    metrics: [
      { label: 'UPTIME', value: '99.9%' },
      { label: 'ROS NODES', value: '14 Active' },
      { label: 'TELEMETRY', value: 'WebSocket' },
      { label: 'STATE', value: 'NAV_READY' },
    ],
    range: [0.90, 1.0],
    targetProgress: 0.96,
  },
];

export function EngineeringStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const manualProgressRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const selectStage = (index: number) => {
    soundManager.play('click');
    setActiveStageIdx(index);
    manualProgressRef.current = STAGES[index].targetProgress;

    // Also scroll smoothly if in a scroll container
    if (containerRef.current) {
      const targetScroll = (index / (STAGES.length - 1)) * (containerRef.current.scrollHeight - containerRef.current.clientHeight);
      containerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      manualProgressRef.current = null;
      const idx = STAGES.findIndex((stage) => latest >= stage.range[0] && latest <= stage.range[1]);
      if (idx !== -1 && idx !== activeStageIdx) {
        setActiveStageIdx(idx);
        soundManager.play('nav');
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeStageIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Three.js Scene Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.035);

    const camera = new THREE.PerspectiveCamera(
      42,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(7.5, 6.5, 8.5);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x60a5fa, 2.0);
    dirLight.position.set(12, 16, 12);
    scene.add(dirLight);

    const bluePointLight = new THREE.PointLight(0x3b82f6, 3.5, 18);
    bluePointLight.position.set(0, 2.5, 0);
    scene.add(bluePointLight);

    // ==========================================
    // 3D ROBOT RIG & SUBSYSTEMS
    // ==========================================
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // 1. Base Ground Grid (Engineering CAD grid)
    const gridHelper = new THREE.GridHelper(26, 38, 0x3b82f6, 0x27272a);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // Materials
    const darkChassisMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.85,
      roughness: 0.25,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.6,
      roughness: 0.25,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
    });
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.0,
    });
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.7,
    });

    // Robot Main Chassis Body
    const chassisGeo = new THREE.BoxGeometry(2.4, 0.6, 3.2);
    const chassisMesh = new THREE.Mesh(chassisGeo, darkChassisMat);
    chassisMesh.position.y = 0.4;
    robotGroup.add(chassisMesh);

    // Wireframe Chassis Shell
    const wireframeChassis = new THREE.Mesh(chassisGeo, wireframeMat);
    wireframeChassis.position.y = 0.4;
    robotGroup.add(wireframeChassis);

    // Upper Electronics Bay / Deck
    const deckGeo = new THREE.BoxGeometry(2.0, 0.3, 2.6);
    const deckMesh = new THREE.Mesh(deckGeo, accentMat);
    deckMesh.position.y = 0.85;
    robotGroup.add(deckMesh);

    const wireframeDeck = new THREE.Mesh(deckGeo, wireframeMat);
    wireframeDeck.position.y = 0.85;
    robotGroup.add(wireframeDeck);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 24);
    const wheelPositions: [number, number, number][] = [
      [-1.35, 0.15, 1.1],
      [1.35, 0.15, 1.1],
      [-1.35, 0.15, -1.1],
      [1.35, 0.15, -1.1],
    ];
    const wheels: THREE.Mesh[] = [];
    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(...pos);
      robotGroup.add(wheel);
      wheels.push(wheel);
    });

    // 360° LiDAR Sensor Mast
    const lidarMast = new THREE.Group();
    lidarMast.position.set(0, 1.0, 0.3);
    robotGroup.add(lidarMast);

    const mastPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16),
      darkChassisMat
    );
    mastPole.position.y = 0.3;
    lidarMast.add(mastPole);

    const lidarPuck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.25, 24),
      accentMat
    );
    lidarPuck.position.y = 0.65;
    lidarMast.add(lidarPuck);

    // Front Depth Camera
    const cameraBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.18, 0.2),
      darkChassisMat
    );
    cameraBox.position.set(0, 0.75, 1.65);
    robotGroup.add(cameraBox);

    // ==========================================
    // LAYER 3: PERCEPTION SUITE (LIDAR & CAMERA)
    // ==========================================
    const perceptionGroup = new THREE.Group();
    scene.add(perceptionGroup);

    // LiDAR Sweep Rays
    const lidarRaysCount = 48;
    const lidarRaysGeo = new THREE.BufferGeometry();
    const lidarPositions = new Float32Array(lidarRaysCount * 6);
    for (let i = 0; i < lidarRaysCount; i++) {
      const angle = (i / lidarRaysCount) * Math.PI * 2;
      const radius = 5.8 + Math.random() * 2.0;
      lidarPositions[i * 6] = 0;
      lidarPositions[i * 6 + 1] = 1.65;
      lidarPositions[i * 6 + 2] = 0.3;
      lidarPositions[i * 6 + 3] = Math.cos(angle) * radius;
      lidarPositions[i * 6 + 4] = 1.65 + (Math.random() - 0.5) * 0.4;
      lidarPositions[i * 6 + 5] = Math.sin(angle) * radius;
    }
    lidarRaysGeo.setAttribute('position', new THREE.BufferAttribute(lidarPositions, 3));
    const lidarRaysMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const lidarRays = new THREE.LineSegments(lidarRaysGeo, lidarRaysMat);
    perceptionGroup.add(lidarRays);

    // Stereo Camera Vision Cone / Frustum
    const frustumGeo = new THREE.ConeGeometry(3.5, 6, 4, 1, true);
    const frustumMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.0,
    });
    const frustumMesh = new THREE.Mesh(frustumGeo, frustumMat);
    frustumMesh.rotation.x = -Math.PI / 2;
    frustumMesh.rotation.z = Math.PI / 4;
    frustumMesh.position.set(0, 0.75, 4.6);
    perceptionGroup.add(frustumMesh);

    // ==========================================
    // LAYER 4: SLAM OCCUPANCY GRID & POINT CLOUD
    // ==========================================
    const slamGroup = new THREE.Group();
    scene.add(slamGroup);

    // 3D Point Cloud Features
    const pointCount = 600;
    const pointCloudGeo = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    for (let i = 0; i < pointCount; i++) {
      const radius = 3.5 + Math.random() * 5.0;
      const angle = Math.random() * Math.PI * 2;
      const height = Math.random() * 3.0;

      pointPositions[i * 3] = Math.cos(angle) * radius;
      pointPositions[i * 3 + 1] = height;
      pointPositions[i * 3 + 2] = Math.sin(angle) * radius;

      pointColors[i * 3] = 0.2;
      pointColors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
      pointColors[i * 3 + 2] = 1.0;
    }
    pointCloudGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointCloudGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointCloudMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const pointCloud = new THREE.Points(pointCloudGeo, pointCloudMat);
    slamGroup.add(pointCloud);

    // Occupancy Grid Cells
    const gridCellsCount = 64;
    const gridCellsGroup = new THREE.Group();
    const cellGeo = new THREE.PlaneGeometry(0.75, 0.75);
    const cellMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.0,
      wireframe: true,
    });
    for (let x = -4; x <= 4; x++) {
      for (let z = -4; z <= 4; z++) {
        if (Math.random() > 0.4) {
          const cell = new THREE.Mesh(cellGeo, cellMat);
          cell.rotation.x = -Math.PI / 2;
          cell.position.set(x * 0.9, -0.48, z * 0.9);
          gridCellsGroup.add(cell);
        }
      }
    }
    slamGroup.add(gridCellsGroup);

    // ==========================================
    // LAYER 5: TRAJECTORY & MOTION PLANNING PATH
    // ==========================================
    const planningGroup = new THREE.Group();
    scene.add(planningGroup);

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.3, 0),
      new THREE.Vector3(1.2, -0.3, 2.5),
      new THREE.Vector3(0.2, -0.3, 5.0),
      new THREE.Vector3(-2.0, -0.3, 7.5),
      new THREE.Vector3(-0.5, -0.3, 10.5),
    ]);

    const pathPoints = curve.getPoints(70);
    const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMat = new THREE.LineDashedMaterial({
      color: 0x10b981,
      dashSize: 0.4,
      gapSize: 0.2,
      linewidth: 2,
      transparent: true,
      opacity: 0.0,
    });
    const pathLine = new THREE.Line(pathGeo, pathMat);
    pathLine.computeLineDistances();
    planningGroup.add(pathLine);

    // Waypoint Markers
    const waypointsGroup = new THREE.Group();
    const wpGeo = new THREE.RingGeometry(0.25, 0.35, 16);
    const wpMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
    });
    [
      new THREE.Vector3(1.2, -0.4, 2.5),
      new THREE.Vector3(0.2, -0.4, 5.0),
      new THREE.Vector3(-2.0, -0.4, 7.5),
      new THREE.Vector3(-0.5, -0.4, 10.5),
    ].forEach((wpPos) => {
      const wp = new THREE.Mesh(wpGeo, wpMat);
      wp.rotation.x = -Math.PI / 2;
      wp.position.copy(wpPos);
      waypointsGroup.add(wp);
    });
    planningGroup.add(waypointsGroup);

    // ==========================================
    // RENDER & SMOOTH STAGE INTERPOLATION LOOP
    // ==========================================
    let animationFrameId: number;
    let lastTime = performance.now();
    let currentP = 0.08;

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsedTime = now * 0.001;

      // Target progress from manual tab click or scroll
      const rawScrollP = scrollYProgress.get();
      const targetP = manualProgressRef.current !== null ? manualProgressRef.current : rawScrollP;
      currentP += (targetP - currentP) * 0.1;
      const p = currentP;

      // Rotate LiDAR puck continuously
      lidarPuck.rotation.y += delta * 6.0;

      // Continuous wheel rotation feedback
      wheels.forEach((w) => {
        w.rotation.x += delta * (1.0 + p * 2.0);
      });

      // ----------------------------------------------------
      // CAMERA POSITION & TARGET INTERPOLATION
      // ----------------------------------------------------
      let targetCamX = 7.5;
      let targetCamY = 6.5;
      let targetCamZ = 8.5;
      let targetLookX = 0;
      let targetLookY = 0.5;
      let targetLookZ = 0;

      if (p < 0.18) {
        const localP = p / 0.18;
        targetCamX = THREE.MathUtils.lerp(7.5, 5.0, localP);
        targetCamY = THREE.MathUtils.lerp(6.5, 4.2, localP);
        targetCamZ = THREE.MathUtils.lerp(8.5, 6.0, localP);
        targetLookY = 0.4;
      } else if (p < 0.36) {
        const localP = (p - 0.18) / 0.18;
        targetCamX = THREE.MathUtils.lerp(5.0, 1.8, localP);
        targetCamY = THREE.MathUtils.lerp(4.2, 5.5, localP);
        targetCamZ = THREE.MathUtils.lerp(6.0, 5.2, localP);
        targetLookY = 0.8;
      } else if (p < 0.54) {
        const localP = (p - 0.36) / 0.18;
        targetCamX = THREE.MathUtils.lerp(1.8, 0.0, localP);
        targetCamY = THREE.MathUtils.lerp(5.5, 2.8, localP);
        targetCamZ = THREE.MathUtils.lerp(5.2, 6.8, localP);
        targetLookY = 1.0;
        targetLookZ = 1.0;
      } else if (p < 0.72) {
        const localP = (p - 0.54) / 0.18;
        targetCamX = THREE.MathUtils.lerp(0.0, 5.8, localP);
        targetCamY = THREE.MathUtils.lerp(2.8, 9.5, localP);
        targetCamZ = THREE.MathUtils.lerp(6.8, 5.5, localP);
        targetLookY = 0.0;
        targetLookZ = 2.0;
      } else if (p < 0.90) {
        const localP = (p - 0.72) / 0.18;
        targetCamX = THREE.MathUtils.lerp(5.8, -4.0, localP);
        targetCamY = THREE.MathUtils.lerp(9.5, 4.5, localP);
        targetCamZ = THREE.MathUtils.lerp(5.5, 9.0, localP);
        targetLookY = 0.0;
        targetLookZ = 4.0;
      } else {
        const localP = (p - 0.90) / 0.10;
        targetCamX = THREE.MathUtils.lerp(-4.0, 5.5, localP);
        targetCamY = THREE.MathUtils.lerp(4.5, 6.0, localP);
        targetCamZ = THREE.MathUtils.lerp(9.0, 7.5, localP);
        targetLookY = 0.5;
        targetLookZ = 0.5;
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.lookAt(targetLookX, targetLookY, targetLookZ);

      // ----------------------------------------------------
      // STAGE OPACITY & GEOMETRIC EXPLOSION CONTROLS
      // ----------------------------------------------------
      if (p >= 0.15 && p <= 0.45) {
        const explodeP = Math.sin(((p - 0.15) / 0.3) * Math.PI);
        wireframeMat.opacity = THREE.MathUtils.lerp(0.0, 0.85, explodeP);
        deckMesh.position.y = 0.85 + explodeP * 0.7;
        wireframeDeck.position.y = deckMesh.position.y;
        lidarMast.position.y = 1.0 + explodeP * 1.2;
        wheels[0].position.x = -1.35 - explodeP * 0.4;
        wheels[1].position.x = 1.35 + explodeP * 0.4;
        wheels[2].position.x = -1.35 - explodeP * 0.4;
        wheels[3].position.x = 1.35 + explodeP * 0.4;
      } else {
        wireframeMat.opacity = 0.0;
        deckMesh.position.y = 0.85;
        wireframeDeck.position.y = 0.85;
        lidarMast.position.y = 1.0;
        wheels[0].position.x = -1.35;
        wheels[1].position.x = 1.35;
        wheels[2].position.x = -1.35;
        wheels[3].position.x = 1.35;
      }

      if (p >= 0.32 && p <= 0.65) {
        const percP = Math.sin(((p - 0.32) / 0.33) * Math.PI);
        lidarRaysMat.opacity = percP * 0.75;
        frustumMat.opacity = percP * 0.55;
        lidarRays.rotation.y = elapsedTime * 2.0;
      } else {
        lidarRaysMat.opacity = 0.0;
        frustumMat.opacity = 0.0;
      }

      if (p >= 0.50 && p <= 0.85) {
        const slamP = Math.sin(((p - 0.50) / 0.35) * Math.PI);
        pointCloudMat.opacity = slamP * 0.9;
        cellMat.opacity = slamP * 0.45;
        pointCloud.rotation.y = elapsedTime * 0.05;
      } else {
        pointCloudMat.opacity = 0.0;
        cellMat.opacity = 0.0;
      }

      if (p >= 0.68) {
        const planP = Math.min(1.0, (p - 0.68) / 0.15);
        pathMat.opacity = planP * 0.85;
        wpMat.opacity = planP * 0.75;
        pathMat.dashSize = 0.3 + Math.sin(elapsedTime * 4.0) * 0.1;
      } else {
        pathMat.opacity = 0.0;
        wpMat.opacity = 0.0;
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [scrollYProgress]);

  const currentStage = STAGES[activeStageIdx] || STAGES[0];

  return (
    <div
      ref={containerRef}
      id="engineering-story"
      className="relative w-full h-[320vh] bg-[#070708] text-[var(--fg)]"
    >
      {/* Sticky Viewport Stage with 100% height and zero clipping */}
      <div className="sticky top-0 w-full h-full min-h-[65vh] max-h-[75vh] overflow-hidden flex flex-col justify-between p-6 md:p-8 pointer-events-none">
        {/* WebGL Canvas Viewport */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
        />

        {/* Top Stage Scrub Bar */}
        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pointer-events-auto gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="font-mono text-xs font-bold tracking-widest text-blue-400 uppercase">
              {currentStage.title} // {currentStage.step}
            </span>
          </div>

          {/* Scrubbable Stage Index Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-sm border border-[var(--border)] bg-black/80 backdrop-blur-md">
            {STAGES.map((st, i) => (
              <button
                key={st.id}
                onClick={() => selectStage(i)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all ${
                  activeStageIdx === i
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                }`}
                title={st.title}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Narrative Explainer Cards */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-4 w-full items-end pb-2">
          {/* Main Stage Explainer Card (Left) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:col-span-6 lg:col-span-5 p-5 rounded-sm border border-[var(--border)] bg-black/80 backdrop-blur-xl pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 mb-2 border-b border-white/10 pb-1.5">
                <span className="font-mono text-xs font-bold text-blue-400 tracking-wider">
                  STAGE {currentStage.step}
                </span>
                <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">
                  {currentStage.sub}
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light mb-3">
                {currentStage.desc}
              </p>

              {/* Progress Line */}
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${((activeStageIdx + 1) / STAGES.length) * 100}%`,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Technical Telemetry Matrix Grid (Right) */}
          <div className="hidden md:block md:col-span-6 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id + '-metrics'}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-sm border border-[var(--border)] bg-black/80 backdrop-blur-xl pointer-events-auto"
              >
                {currentStage.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-2 rounded-sm border border-white/5 bg-white/[0.02] flex flex-col justify-between"
                  >
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-0.5">
                      {m.label}
                    </span>
                    <span className="text-xs font-mono font-semibold text-zinc-200">
                      {m.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
