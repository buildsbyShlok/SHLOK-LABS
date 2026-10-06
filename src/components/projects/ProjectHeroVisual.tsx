'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectMedia } from '@/data/projects';
import { soundManager } from '@/lib/sound';
import { Box, Maximize2 } from 'lucide-react';
import { ImageLightbox } from '@/components/projects/ImageLightbox';

interface Stage {
  id: string;
  step: string;
  title: string;
  sub: string;
  desc: string;
  metrics: { label: string; value: string }[];
}

const ROBOT_STAGES: Stage[] = [
  {
    id: 'physical',
    step: '01 / 06',
    title: 'PHYSICAL CHASSIS',
    sub: 'Differential Drive Base & Suspension',
    desc: 'Anodized aluminum CNC chassis with high-torque DC planetary gear motors and quadrature optical encoders.',
    metrics: [
      { label: 'DRIVE TYPE', value: '4-Wheel Diff' },
      { label: 'PAYLOAD', value: '15.0 kg' },
      { label: 'MAX SPEED', value: '1.8 m/s' },
      { label: 'CHASSIS', value: 'AL-6061 CNC' },
    ],
  },
  {
    id: 'wireframe',
    step: '02 / 06',
    title: 'STRUCTURAL CAD DECONSTRUCTION',
    sub: 'Exploded Electronics & Compute Bay',
    desc: 'Internal kinematics layout revealing isolated 24V power management rail, STM32 coprocessor, and Raspberry Pi 4 bay.',
    metrics: [
      { label: 'COMPUTE', value: 'RPi 4 + MCU' },
      { label: 'BUS BUS', value: 'CAN / UART' },
      { label: 'POWER RAIL', value: '24V LiFePO4' },
      { label: 'ISOLATION', value: 'Optocoupled' },
    ],
  },
  {
    id: 'perception',
    step: '03 / 06',
    title: 'PERCEPTION SUITE',
    sub: '360° Laser LiDAR & Stereo Frustum',
    desc: 'Real-time multi-modal range sensing with 10Hz 360° laser sweep and forward RGB-D depth camera cone.',
    metrics: [
      { label: 'LIDAR RATE', value: '10 Hz / 360°' },
      { label: 'DEPTH FOV', value: '87° × 58°' },
      { label: 'SCAN RADIUS', value: '12.0 m' },
      { label: 'LATENCY', value: '< 18 ms' },
    ],
  },
  {
    id: 'slam',
    step: '04 / 06',
    title: 'SPATIAL SLAM MAPPING',
    sub: 'Cartographer 2D/3D Occupancy Grid',
    desc: 'Submap scan matching generating probabilistic occupancy grids with real-time loop-closure landmark optimization.',
    metrics: [
      { label: 'RESOLUTION', value: '0.05 m/cell' },
      { label: 'LANDMARKS', value: '1,420 pts' },
      { label: 'LOOP CLOSURE', value: 'Active' },
      { label: 'DRIFT RATE', value: '< 1.2%' },
    ],
  },
  {
    id: 'planning',
    step: '05 / 06',
    title: 'MOTION PLANNING & TRAJECTORY',
    sub: 'TEB Local Planner & Costmaps',
    desc: 'Dynamic Window Approach (DWA) obstacle avoidance recalculating costmaps at 20Hz, synthesizing smooth Bézier trajectories.',
    metrics: [
      { label: 'PLANNER', value: 'TEB / DWA' },
      { label: 'REPLAN RATE', value: '20 Hz' },
      { label: 'WAYPOINTS', value: 'Active (5)' },
      { label: 'OBSTACLE COST', value: 'Dynamic' },
    ],
  },
  {
    id: 'synthesis',
    step: '06 / 06',
    title: 'SYSTEM SYNTHESIS',
    sub: 'Hardware-to-Cloud Integration',
    desc: 'Complete autonomous navigation stack operating in closed loop with telemetry dispatch and safety override.',
    metrics: [
      { label: 'ROS 2 NODES', value: '14 Active' },
      { label: 'RELIABILITY', value: '99.4%' },
      { label: 'UPTIME', value: 'Continuous' },
      { label: 'SAFETY CUTOFF', value: '< 10 ms' },
    ],
  },
];

export function ProjectHeroVisual({ project }: { project: Project }) {
  const isRobot = project.hasInteractive3D || project.id === 'delivery-robot' || project.slug === 'autonomous-indoor-delivery-robot';

  if (isRobot) {
    return <RobotInteractiveHero />;
  }

  return <GenericProjectHero project={project} />;
}

// -------------------------------------------------------------
// ROBOT INTERACTIVE 3D HERO (60-75vh dedicated stage)
// -------------------------------------------------------------
function RobotInteractiveHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const targetStageRef = useRef<number>(0);

  const selectStage = (idx: number) => {
    soundManager.play('click');
    setActiveStageIdx(idx);
    targetStageRef.current = idx;
  };

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
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.035);

    const camera = new THREE.PerspectiveCamera(
      42,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(6.8, 5.5, 7.8);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x60a5fa, 2.2);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    const bluePointLight = new THREE.PointLight(0x3b82f6, 3.5, 18);
    bluePointLight.position.set(0, 2.5, 0);
    scene.add(bluePointLight);

    // Ground Grid
    const gridHelper = new THREE.GridHelper(24, 32, 0x3b82f6, 0x27272a);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // Robot Rig
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

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

    // Body
    const chassisGeo = new THREE.BoxGeometry(2.4, 0.6, 3.2);
    const chassisMesh = new THREE.Mesh(chassisGeo, darkChassisMat);
    chassisMesh.position.y = 0.4;
    robotGroup.add(chassisMesh);

    const wireframeChassis = new THREE.Mesh(chassisGeo, wireframeMat);
    wireframeChassis.position.y = 0.4;
    robotGroup.add(wireframeChassis);

    // Upper Deck
    const deckGeo = new THREE.BoxGeometry(2.0, 0.3, 2.6);
    const deckMesh = new THREE.Mesh(deckGeo, accentMat);
    deckMesh.position.y = 0.85;
    robotGroup.add(deckMesh);

    const wireframeDeck = new THREE.Mesh(deckGeo, wireframeMat);
    wireframeDeck.position.y = 0.85;
    robotGroup.add(wireframeDeck);

    // Wheels
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

    // LiDAR Mast
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

    // Perception Rays
    const perceptionGroup = new THREE.Group();
    scene.add(perceptionGroup);

    const lidarRaysCount = 48;
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
    const lidarRaysGeo = new THREE.BufferGeometry();
    lidarRaysGeo.setAttribute('position', new THREE.BufferAttribute(lidarPositions, 3));
    const lidarRaysMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const lidarRays = new THREE.LineSegments(lidarRaysGeo, lidarRaysMat);
    perceptionGroup.add(lidarRays);

    // Camera Frustum
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

    // SLAM Point Cloud
    const slamGroup = new THREE.Group();
    scene.add(slamGroup);

    const pointCount = 500;
    const pointCloudGeo = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    for (let i = 0; i < pointCount; i++) {
      const radius = 3.2 + Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const height = Math.random() * 2.8;

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
    const gridCellsGroup = new THREE.Group();
    const cellGeo = new THREE.PlaneGeometry(0.75, 0.75);
    const cellMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.0,
      wireframe: true,
    });
    for (let x = -3; x <= 3; x++) {
      for (let z = -3; z <= 3; z++) {
        if (Math.random() > 0.4) {
          const cell = new THREE.Mesh(cellGeo, cellMat);
          cell.rotation.x = -Math.PI / 2;
          cell.position.set(x * 0.9, -0.48, z * 0.9);
          gridCellsGroup.add(cell);
        }
      }
    }
    slamGroup.add(gridCellsGroup);

    // Trajectory Path
    const planningGroup = new THREE.Group();
    scene.add(planningGroup);

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.3, 0),
      new THREE.Vector3(1.2, -0.3, 2.5),
      new THREE.Vector3(0.2, -0.3, 5.0),
      new THREE.Vector3(-2.0, -0.3, 7.5),
      new THREE.Vector3(-0.5, -0.3, 10.5),
    ]);
    const pathGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(60));
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

    // Waypoints
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

    // Animation variables
    let animationFrameId: number;
    let lastTime = performance.now();
    let currentStageProgress = 0;

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
      const elapsed = now * 0.001;

      // Smooth stage interpolation
      const targetP = targetStageRef.current / (ROBOT_STAGES.length - 1);
      currentStageProgress += (targetP - currentStageProgress) * 0.08;

      // Rotate LiDAR puck
      lidarPuck.rotation.y += delta * 6.0;

      // Continuous wheels
      wheels.forEach((w) => {
        w.rotation.x += delta * 1.5;
      });

      // Camera views based on active stage
      let targetCamX = 6.8;
      let targetCamY = 5.5;
      let targetCamZ = 7.8;
      let targetLookY = 0.5;
      let targetLookZ = 0.0;

      const stageIdx = targetStageRef.current;
      if (stageIdx === 0) {
        targetCamX = 6.5; targetCamY = 4.8; targetCamZ = 7.5; targetLookY = 0.4;
      } else if (stageIdx === 1) {
        targetCamX = 2.5; targetCamY = 5.2; targetCamZ = 5.5; targetLookY = 0.8;
      } else if (stageIdx === 2) {
        targetCamX = 0.0; targetCamY = 3.2; targetCamZ = 6.8; targetLookY = 1.0; targetLookZ = 1.0;
      } else if (stageIdx === 3) {
        targetCamX = 5.2; targetCamY = 8.5; targetCamZ = 5.2; targetLookY = 0.0; targetLookZ = 2.0;
      } else if (stageIdx === 4) {
        targetCamX = -3.8; targetCamY = 4.2; targetCamZ = 8.5; targetLookY = 0.0; targetLookZ = 4.0;
      } else {
        targetCamX = 5.2; targetCamY = 5.8; targetCamZ = 7.2; targetLookY = 0.5;
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;
      camera.lookAt(0, targetLookY, targetLookZ);

      // Opacity controls based on stage
      wireframeMat.opacity = stageIdx === 1 ? 0.85 : 0.0;
      const explodeY = stageIdx === 1 ? 0.7 : 0.0;
      deckMesh.position.y += (0.85 + explodeY - deckMesh.position.y) * 0.1;
      wireframeDeck.position.y = deckMesh.position.y;
      lidarMast.position.y += (1.0 + (stageIdx === 1 ? 1.0 : 0.0) - lidarMast.position.y) * 0.1;

      lidarRaysMat.opacity += ((stageIdx === 2 || stageIdx === 5 ? 0.75 : 0.0) - lidarRaysMat.opacity) * 0.1;
      frustumMat.opacity += ((stageIdx === 2 || stageIdx === 5 ? 0.55 : 0.0) - frustumMat.opacity) * 0.1;
      lidarRays.rotation.y = elapsed * 2.0;

      pointCloudMat.opacity += ((stageIdx === 3 || stageIdx === 5 ? 0.9 : 0.0) - pointCloudMat.opacity) * 0.1;
      cellMat.opacity += ((stageIdx === 3 || stageIdx === 5 ? 0.45 : 0.0) - cellMat.opacity) * 0.1;
      pointCloud.rotation.y = elapsed * 0.05;

      pathMat.opacity += ((stageIdx === 4 || stageIdx === 5 ? 0.85 : 0.0) - pathMat.opacity) * 0.1;
      wpMat.opacity += ((stageIdx === 4 || stageIdx === 5 ? 0.75 : 0.0) - wpMat.opacity) * 0.1;

      renderer.render(scene, camera);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  const currentStage = ROBOT_STAGES[activeStageIdx] || ROBOT_STAGES[0];

  return (
    <div className="relative w-full rounded-sm border border-[var(--border)] bg-[#09090b] overflow-hidden">
      {/* 60-75vh Canvas Stage */}
      <div className="relative w-full h-[58vh] sm:h-[65vh] lg:h-[72vh] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        {/* WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Top Controls Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1 rounded-sm border border-white/10 bg-black/75 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-wider text-blue-400 uppercase">
              INTERACTIVE 3D SUBSYSTEMS // {currentStage.step}
            </span>
          </div>

          {/* Clickable Stage Scrub Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-sm border border-[var(--border)] bg-black/80 backdrop-blur-md">
            {ROBOT_STAGES.map((st, i) => (
              <button
                key={st.id}
                onClick={() => selectStage(i)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all ${
                  activeStageIdx === i
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
                title={st.title}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Stage Overlay Cards */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-4 items-end pointer-events-none">
          {/* Main Stage Card (Left) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:col-span-6 lg:col-span-5 p-4 rounded-sm border border-[var(--border)] bg-black/85 backdrop-blur-xl pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3 mb-1.5 border-b border-white/10 pb-1">
                <span className="font-mono text-xs font-bold text-blue-400 tracking-wider">
                  {currentStage.title}
                </span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  {currentStage.sub}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed mb-2.5">
                {currentStage.desc}
              </p>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${((activeStageIdx + 1) / ROBOT_STAGES.length) * 100}%` }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Metrics Matrix (Right) */}
          <div className="hidden md:block md:col-span-6 lg:col-span-7 pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id + '-metrics'}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-sm border border-[var(--border)] bg-black/85 backdrop-blur-xl"
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

// -------------------------------------------------------------
// GENERIC CINEMATIC STAGE (With Real Hero Image Support)
// -------------------------------------------------------------
function GenericProjectHero({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (project.heroImage) return; // Skip canvas animation if real hero image exists

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodeCount = 36;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1.0,
      });
    }

    let scanY = 0;

    const render = () => {
      ctx.fillStyle = '#08080a';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      scanY = (scanY + 0.6) % height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      scanGrad.addColorStop(0, 'rgba(59, 130, 246, 0)');
      scanGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.08)');
      scanGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 20, width, 40);

      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 110)})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [project.heroImage]);

  // If real hero image exists, render it with high fidelity
  if (project.heroImage) {
    const heroMedia: ProjectMedia = {
      figNum: 'FIG. 01',
      title: `${project.title} Primary Asset`,
      caption: project.gallery?.[0]?.caption || project.subtitle,
      type: 'photo',
      image: project.heroImage,
    };

    return (
      <>
        {lightboxOpen && (
          <ImageLightbox media={heroMedia} onClose={() => setLightboxOpen(false)} />
        )}

        <div
          onClick={() => {
            soundManager.play('open');
            setLightboxOpen(true);
          }}
          className="group relative w-full rounded-sm border border-[var(--border)] hover:border-blue-500/40 bg-[#08080a] overflow-hidden cursor-pointer transition-all duration-300"
        >
          {/* Dedicated Viewport (52-65vh) with clean contain/fit */}
          <div className="relative w-full h-[48vh] sm:h-[58vh] lg:h-[65vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#070709]">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

            {/* Real Image */}
            <img
              src={project.heroImage}
              alt={project.title}
              className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain rounded-sm select-none shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
            />

            {/* Top-Left Metadata Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-sm border border-white/10 bg-black/80 backdrop-blur-md text-[11px] font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase font-bold tracking-wider">FIG. 01 // {project.category}</span>
            </div>

            {/* Bottom-Right Expand Indicator */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-sm border border-white/10 bg-black/80 backdrop-blur-md text-xs font-mono text-zinc-300 group-hover:text-blue-300 group-hover:border-blue-500/40 transition-all">
              <Maximize2 size={13} />
              <span>CLICK TO EXPAND</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Fallback: Blueprint Architecture Canvas
  return (
    <div className="relative w-full rounded-sm border border-[var(--border)] bg-[#08080a] overflow-hidden">
      <div className="relative w-full h-[45vh] sm:h-[52vh] lg:h-[58vh] flex flex-col items-center justify-center p-6 text-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto px-6 py-8 rounded-sm border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
            SOFTWARE ARCHITECTURE // {project.projectNumber}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 font-mono">
            {project.title.split(' ')[0]}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-emerald-400 font-light tracking-wide">
            {project.domain}
          </p>
        </div>

        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-2.5 py-1 rounded-sm border border-white/5 bg-black/60 text-[10px] font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>SYS // {project.category.toUpperCase()}</span>
        </div>

        <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-sm border border-white/5 bg-black/60 text-[10px] font-mono text-zinc-400">
          <span>YEAR: {project.year}</span>
          <span className="text-zinc-600">|</span>
          <span className="capitalize">{project.status}</span>
        </div>
      </div>
    </div>
  );
}
