import React, { useEffect, useRef } from 'react';
import { ModuleId } from '../../types';

interface FlowingDataLineProps {
  activeModule: ModuleId;
}

export const FlowingDataLine: React.FC<FlowingDataLineProps> = ({ activeModule }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic wave parameters
    let phase = 0;
    const particles: { x: number; progress: number; speed: number; size: number }[] = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * width,
        progress: Math.random(),
        speed: 0.0012 + Math.random() * 0.0015,
        size: 1.5 + Math.random() * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle base spline path
      phase += 0.008;
      const points: { x: number; y: number }[] = [];
      const segments = 40;
      const step = width / segments;

      // Base Y coordinate varies slightly by module
      const moduleOffsets: Record<ModuleId, number> = {
        overview: 0.65,
        about: 0.5,
        projects: 0.55,
        skills: 0.6,
        experience: 0.5,
        achievements: 0.48,
        education: 0.52,
        now: 0.58,
        contact: 0.62,
      };

      const baseY = height * (moduleOffsets[activeModule] || 0.55);

      for (let i = 0; i <= segments; i++) {
        const x = i * step;
        const wave1 = Math.sin(i * 0.22 + phase) * 45;
        const wave2 = Math.cos(i * 0.12 - phase * 0.7) * 25;
        const y = baseY + wave1 + wave2;
        points.push({ x, y });
      }

      // Draw flowing background glow path
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].y + points[i - 1].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
      }
      ctx.strokeStyle = 'rgba(51, 150, 113, 0.16)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Second fine dashed line
      ctx.setLineDash([4, 8]);
      ctx.strokeStyle = 'rgba(175, 210, 201, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw moving telemetry particles along curve
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const idx = Math.floor(p.progress * (points.length - 1));
        const pt = points[idx] || points[0];

        // Particle glow
        const radGlow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, p.size * 3);
        radGlow.addColorStop(0, 'rgba(175, 210, 201, 0.85)');
        radGlow.addColorStop(0.4, 'rgba(51, 150, 113, 0.4)');
        radGlow.addColorStop(1, 'rgba(51, 150, 113, 0)');

        ctx.fillStyle = radGlow;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core bright pip
        ctx.fillStyle = '#AFD2C9';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeModule]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
};
