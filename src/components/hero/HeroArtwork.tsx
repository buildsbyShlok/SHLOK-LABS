'use client';

import { useEffect, useRef, useState } from 'react';

export function HeroArtwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes for ambient constellation
    const nodeCount = 40;
    const nodes = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * (canvas.clientWidth || 800),
      y: Math.random() * (canvas.clientHeight || 400),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.6 + 0.8,
      opacity: Math.random() * 0.35 + 0.1
    }));

    let time = 0;

    const drawHeroCore = (cx: number, cy: number) => {
      ctx.save();
      ctx.translate(cx, cy);

      // Abstract Technical Ring & Coordinate Datum
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      // Coordinate axes
      ctx.beginPath();
      ctx.moveTo(-180, 0);
      ctx.lineTo(180, 0);
      ctx.moveTo(0, -90);
      ctx.lineTo(0, 90);
      ctx.stroke();

      // Precision concentric telemetry rings
      const r1 = 65 + Math.sin(time * 1.2) * 3;
      ctx.beginPath();
      ctx.arc(0, 0, r1, 0, Math.PI * 2);
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      const r2 = 100;
      ctx.beginPath();
      ctx.arc(0, 0, r2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.stroke();

      // Rotating Scanner line
      const scanAngle = time * 0.75;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(scanAngle) * r2, Math.sin(scanAngle) * r2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.stroke();

      // Central Processor Die / Core
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.strokeRect(-20, -20, 40, 40);

      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Peripheral traces
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(60, 0);
      ctx.lineTo(80, -30);

      ctx.moveTo(-20, 0);
      ctx.lineTo(-60, 0);
      ctx.lineTo(-80, 30);
      ctx.stroke();

      // Corner datum ticks
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillText('EMBEDDED // ROBOTICS', -80, 45);
      ctx.fillText('AI // SYSTEMS CORE', 40, -45);

      ctx.restore();
    };

    let lastTime = 0;
    const fpsInterval = 1000 / 30;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);
      
      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;

      if (prefersReducedMotion) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHeroCore(cw / 2, ch / 2);
        cancelAnimationFrame(animationFrameId);
        return;
      }

      time += 0.03;
      
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      ctx.clearRect(0, 0, cw, ch);

      // Connect nodes within proximity
      for (let i = 0; i < nodes.length; i++) {
        const p1 = nodes[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = cw;
        if (p1.x > cw) p1.x = 0;
        if (p1.y < 0) p1.y = ch;
        if (p1.y > ch) p1.y = 0;

        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x + mouse.x * 0.02, p1.y + mouse.y * 0.02);
            ctx.lineTo(p2.x + mouse.x * 0.02, p2.y + mouse.y * 0.02);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p1.opacity})`;
        ctx.beginPath();
        ctx.arc(p1.x + mouse.x * 0.02, p1.y + mouse.y * 0.02, p1.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw abstract engineering core with subtle parallax
      const centerX = cw / 2 + mouse.x * 0.03;
      const centerY = ch / 2 + mouse.y * 0.03 + Math.sin(time * 0.5) * 2.5;
      drawHeroCore(centerX, centerY);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[45vh] md:h-[52vh] bg-black/40 overflow-hidden border-b border-[var(--border)]">
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />

      {/* Bottom Right Live Dot-Matrix Digital Clock */}
      <div className="absolute bottom-4 right-6 md:right-12 flex items-center gap-2 px-3 py-1 rounded-sm border border-[var(--border)] bg-black/60 backdrop-blur-sm pointer-events-none font-mono text-xs md:text-sm tracking-widest text-[var(--fg-muted)]">
        <span className="text-[10px] text-zinc-600">UTC+5:30</span>
        <span className="font-bold text-[var(--fg)]">{timeStr || '00:00:00'}</span>
      </div>

      {/* Atmospheric bottom fade into profile section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
    </div>
  );
}
