import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  type: 'cyan' | 'blue';
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  startTime: number;
  duration: number;
  trail: { x: number; y: number }[];
}

const NODE_COUNT = 18;
const CYAN_COUNT = 12;
const CONNECT_DIST = 220;
const MAX_PACKETS = 6;
const PACKET_INTERVAL = 1800;
const PACKET_DURATION = 800;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function initNodes(width: number, height: number): Node[] {
  return Array.from({ length: NODE_COUNT }, (_, i) => ({
    x: randomBetween(20, width - 20),
    y: randomBetween(20, height - 20),
    vx: randomBetween(-0.2, 0.2),
    vy: randomBetween(-0.2, 0.2),
    radius: 3,
    pulsePhase: Math.random() * Math.PI * 2,
    type: i < CYAN_COUNT ? 'cyan' : 'blue',
  }));
}

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let rafId = 0;
    let lastPacketTime = 0;

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      nodes = initNodes(width, height);
    }

    function drawStaticFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawAmbientGlow();
      drawGrid();
      nodes.forEach(node => {
        drawNode(node, 0);
      });
      drawVignette();
    }

    function drawAmbientGlow() {
      if (!ctx) return;
      const g1 = ctx.createRadialGradient(
        width * 0.15, height * 0.2, 0,
        width * 0.15, height * 0.2, 400
      );
      g1.addColorStop(0, 'rgba(34,211,238,0.08)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(
        width * 0.85, height * 0.15, 0,
        width * 0.85, height * 0.15, 350
      );
      g2.addColorStop(0, 'rgba(96,165,250,0.06)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);
    }

    function drawGrid() {
      if (!ctx) return;
      const spacing = 60;
      ctx.fillStyle = 'rgba(34,211,238,0.12)';
      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawNode(node: Node, time: number) {
      if (!ctx) return;
      const isCyan = node.type === 'cyan';
      const pulseRadius = 6 + 8 * (0.5 + 0.5 * Math.sin(time * 0.0008 + node.pulsePhase));

      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = isCyan ? 'rgba(34,211,238,0.15)' : 'rgba(96,165,250,0.15)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = isCyan ? 'rgba(34,211,238,0.6)' : 'rgba(96,165,250,0.6)';
      ctx.fill();
    }

    function drawConnections() {
      if (!ctx) return;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT_DIST) continue;

          const alpha = 0.18 * (1 - dist / CONNECT_DIST);
          let color: string;
          if (a.type === 'cyan' && b.type === 'cyan') {
            color = `rgba(34,211,238,${alpha})`;
          } else if (a.type === 'blue' && b.type === 'blue') {
            color = `rgba(96,165,250,${alpha})`;
          } else {
            color = `rgba(180,180,220,${alpha})`;
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = color;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    function spawnPacket(time: number) {
      const pairs: { i: number; j: number }[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          if (Math.sqrt(dx * dx + dy * dy) <= CONNECT_DIST) {
            pairs.push({ i, j });
          }
        }
      }
      if (pairs.length === 0) return;
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      packets.push({
        fromNode: pair.i,
        toNode: pair.j,
        progress: 0,
        startTime: time,
        duration: PACKET_DURATION,
        trail: [],
      });
    }

    function drawPackets(time: number) {
      if (!ctx) return;
      packets = packets.filter(p => time - p.startTime < p.duration);

      for (const packet of packets) {
        const t = (time - packet.startTime) / packet.duration;
        const from = nodes[packet.fromNode];
        const to = nodes[packet.toNode];
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t;

        const trailOpacities = [0.6, 0.3, 0.1];
        const trailOffsets = [0.04, 0.08, 0.12];
        for (let k = 0; k < 3; k++) {
          const tTrail = Math.max(0, t - trailOffsets[k]);
          const tx = from.x + (to.x - from.x) * tTrail;
          const ty = from.y + (to.y - from.y) * tTrail;
          ctx.beginPath();
          ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34,211,238,${trailOpacities[k]})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,211,238,0.9)';
        ctx.fill();
      }
    }

    function drawVignette() {
      if (!ctx) return;
      const maxR = Math.max(width, height) * 0.8;
      const vg = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, maxR
      );
      vg.addColorStop(0, 'transparent');
      vg.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);
    }

    function tick(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      drawAmbientGlow();
      drawGrid();

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 10 || node.x > width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > height - 10) node.vy *= -1;
        node.x = Math.max(10, Math.min(width - 10, node.x));
        node.y = Math.max(10, Math.min(height - 10, node.y));
      }

      drawConnections();

      for (const node of nodes) {
        drawNode(node, time);
      }

      if (time - lastPacketTime > PACKET_INTERVAL && packets.length < MAX_PACKETS) {
        spawnPacket(time);
        lastPacketTime = time;
      }
      drawPackets(time);

      drawVignette();

      rafId = requestAnimationFrame(tick);
    }

    resize();

    if (shouldReduceMotion) {
      drawStaticFrame();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    const handleResize = () => {
      resize();
      if (shouldReduceMotion) drawStaticFrame();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};
