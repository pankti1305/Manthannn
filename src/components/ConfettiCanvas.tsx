import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface ConfettiCanvasProps {
  burstKey: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vr: number;
  shape: 'rect' | 'circle' | 'ribbon';
  alpha: number;
}

const PALETTE_CONFETTI = ['#A8B5A0', '#D8C3A5', '#456B80', '#67445F', '#F6F0E5'];

export function ConfettiCanvas({ burstKey }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (burstKey === 0 || shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    const count = 135;

    for (let i = 0; i < count; i++) {
      const fromLeft = i % 2 === 0;
      const originX = fromLeft ? canvas.width * 0.22 : canvas.width * 0.78;
      const originY = canvas.height * 0.76;
      const angle = fromLeft
        ? -Math.PI / 2 + (Math.random() * 0.85 - 0.12)
        : -Math.PI / 2 - (Math.random() * 0.85 - 0.12);
      const speed = 9 + Math.random() * 13;

      particles.push({
        x: originX + (Math.random() * 70 - 35),
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 5 + Math.random() * 6,
        color: PALETTE_CONFETTI[i % PALETTE_CONFETTI.length],
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.2,
        shape: i % 5 === 0 ? 'circle' : i % 3 === 0 ? 'ribbon' : 'rect',
        alpha: 1,
      });
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = 0;

      for (const p of particles) {
        p.vy += 0.3;
        p.vx *= 0.988;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;

        if (p.y > canvas.height * 0.85) {
          p.alpha = Math.max(0, p.alpha - 0.028);
        }

        if (p.alpha > 0.02 && p.y < canvas.height + 50) {
          active++;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;

          if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.44, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === 'ribbon') {
            ctx.fillRect(-p.size * 0.8, -p.size * 0.24, p.size * 1.6, p.size * 0.48);
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.72);
          }
          ctx.restore();
        }
      }

      if (active > 0) {
        frameId = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [burstKey, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
