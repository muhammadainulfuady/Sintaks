import { useEffect, useRef } from 'react';

interface ColorRGB { r: number; g: number; b: number; }

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  TRANSPARENT?: boolean;
  RAINBOW_MODE?: boolean;
  COLOR?: string;
}

interface FluidDrop {
  x: number; y: number; velocityX: number; velocityY: number;
  radius: number; color: ColorRGB; life: number;
}

const hexToRGB = (hex: string): ColorRGB => {
  const raw = hex.replace('#', '');
  const value = raw.length === 3 ? raw.split('').map((character) => character + character).join('') : raw;
  return {
    r: Number.parseInt(value.slice(0, 2), 16) || 79,
    g: Number.parseInt(value.slice(2, 4), 16) || 70,
    b: Number.parseInt(value.slice(4, 6), 16) || 229,
  };
};

const rainbowColor = (): ColorRGB => {
  const hue = Math.random() * 360;
  const chroma = 0.82;
  const second = (1 - Math.abs(((hue / 60) % 2) - 1)) * chroma;
  const base = 0.17;
  const [r, g, b] = hue < 60 ? [chroma, second, 0] : hue < 120 ? [second, chroma, 0] : hue < 180 ? [0, chroma, second] : hue < 240 ? [0, second, chroma] : hue < 300 ? [second, 0, chroma] : [chroma, 0, second];
  return { r: Math.round((r + base) * 255), g: Math.round((g + base) * 255), b: Math.round((b + base) * 255) };
};

/** Canvas splash cursor using the supplied SplashCursor configuration API. */
export const SplashCursor: React.FC<SplashCursorProps> = ({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  DENSITY_DISSIPATION = 3.5,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  TRANSPARENT = true,
  RAINBOW_MODE = true,
  COLOR = '#4f46e5',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const drops: FluidDrop[] = [];
    const fixedColor = hexToRGB(COLOR);
    const maxDrops = Math.max(110, Math.min(340, Math.floor(DYE_RESOLUTION / 4)));
    const dissipation = Math.min(0.045, Math.max(0.009, DENSITY_DISSIPATION / 210));
    const scale = Math.max(0.45, Math.min(1.8, SPLAT_RADIUS * 5));
    let frame = 0;
    let previousX = -100;
    let previousY = -100;
    let hasPointer = false;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const colorForDrop = () => (RAINBOW_MODE ? rainbowColor() : fixedColor);
    const splash = (x: number, y: number, velocityX: number, velocityY: number, count: number) => {
      for (let index = 0; index < count; index += 1) {
        const direction = Math.random() * Math.PI * 2;
        const energy = (0.25 + Math.random() * 0.75) * Math.min(4, SPLAT_FORCE / 1800);
        drops.push({
          x: x + (Math.random() - 0.5) * 10, y: y + (Math.random() - 0.5) * 10,
          velocityX: velocityX * (0.07 + Math.random() * 0.1) + Math.cos(direction) * energy,
          velocityY: velocityY * (0.07 + Math.random() * 0.1) + Math.sin(direction) * energy,
          radius: (7 + Math.random() * 24) * scale, color: colorForDrop(), life: 0.9 + Math.random() * 0.45,
        });
      }
      if (drops.length > maxDrops) drops.splice(0, drops.length - maxDrops);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!hasPointer) { previousX = event.clientX; previousY = event.clientY; hasPointer = true; return; }
      const velocityX = event.clientX - previousX;
      const velocityY = event.clientY - previousY;
      if (Math.hypot(velocityX, velocityY) > 5) {
        splash(event.clientX, event.clientY, velocityX, velocityY, 3);
        previousX = event.clientX; previousY = event.clientY;
      }
    };
    const onPointerDown = (event: PointerEvent) => splash(event.clientX, event.clientY, 0, 0, SIM_RESOLUTION > 100 ? 28 : 16);
    const render = () => {
      if (!TRANSPARENT) { context.fillStyle = '#f8fafc'; context.fillRect(0, 0, window.innerWidth, window.innerHeight); }
      else context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.save();
      context.globalCompositeOperation = 'screen';
      context.filter = 'blur(11px)';
      for (let index = drops.length - 1; index >= 0; index -= 1) {
        const drop = drops[index];
        drop.x += drop.velocityX; drop.y += drop.velocityY;
        drop.velocityX *= 0.974; drop.velocityY = drop.velocityY * 0.974 + 0.008;
        drop.life -= dissipation;
        if (drop.life <= 0) { drops.splice(index, 1); continue; }
        const alpha = Math.min(0.22, drop.life * 0.16);
        const gradient = context.createRadialGradient(drop.x, drop.y, 0, drop.x, drop.y, drop.radius * drop.life);
        gradient.addColorStop(0, `rgba(${drop.color.r}, ${drop.color.g}, ${drop.color.b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${drop.color.r}, ${drop.color.g}, ${drop.color.b}, 0)`);
        context.fillStyle = gradient;
        context.beginPath(); context.arc(drop.x, drop.y, drop.radius * drop.life, 0, Math.PI * 2); context.fill();
      }
      context.restore();
      frame = window.requestAnimationFrame(render);
    };

    resize(); render();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [COLOR, DENSITY_DISSIPATION, DYE_RESOLUTION, RAINBOW_MODE, SIM_RESOLUTION, SPLAT_FORCE, SPLAT_RADIUS, TRANSPARENT]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
};
