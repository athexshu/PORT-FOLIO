import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import counterbalanceImg from '@/assets/robots/counterbalance.png';
import palletjackImg from '@/assets/robots/palletjack.png';
import reachtruckImg from '@/assets/robots/reachtruck.png';

interface Robot {
  id: string;
  name: string;
  type: 'counterbalance' | 'palletjack' | 'reachtruck';
  x: number;
  y: number;
  targetIndex: number;
  speed: number;
  status: 'moving' | 'waiting';
  rotation: number;
  waitTicks: number;
  safetyRadius:number
}

const robotImages = {
  counterbalance: counterbalanceImg,
  palletjack: palletjackImg,
  reachtruck: reachtruckImg,
};

// Separate paths for each robot to avoid collisions
const paths = {
  counterbalance: [
    { x: 15, y: 25 }, { x: 35, y: 25 }, { x: 35, y: 55 }, { x: 15, y: 55 },
  ],
  palletjack: [
    { x: 85, y: 75 }, { x: 65, y: 75 }, { x: 65, y: 45 }, { x: 85, y: 45 },
  ],
  // reachtruck: [
  //   { x: 50, y: 15 }, { x: 75, y: 15 }, { x: 75, y: 85 }, { x: 50, y: 85 },
  // ],

    reachtruck: [
    { x: 50, y: 15 }, { x: 75, y: 15 }, { x: 75, y: 85 }, { x: 50, y: 85 },
  ],

  
};

const zones = [
  { name: 'DOCK A', x: 5, y: 18, w: 18, h: 14 },
  { name: 'DOCK B', x: 5, y: 68, w: 18, h: 14 },
  { name: 'STORAGE', x: 40, y: 45, w: 20, h: 15 },
  { name: 'CHARGE', x: 78, y: 8, w: 15, h: 12 },
];

const getDistance = (x1: number, y1: number, x2: number, y2: number) => 
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const getAngle = (x1: number, y1: number, x2: number, y2: number) =>
  Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI) + 90;

const FMSAnimation = () => {
  const [robots, setRobots] = useState<Robot[]>([
    { id: '1', name: 'Forklift-01', type: 'counterbalance', x: paths.counterbalance[0].x, y: paths.counterbalance[0].y, targetIndex: 1, speed: 0.15, status: 'moving', rotation: 0, waitTicks: 0 , safetyRadius:6 },
    { id: '2', name: 'Pallet-02', type: 'palletjack', x: paths.palletjack[0].x, y: paths.palletjack[0].y, targetIndex: 1, speed: 0.12, status: 'moving', rotation: 0, waitTicks: 0 , safetyRadius:6 },
    { id: '3', name: 'Reach-03', type: 'reachtruck', x: paths.reachtruck[0].x, y: paths.reachtruck[0].y, targetIndex: 1, speed: 0.1, status: 'moving', rotation: 0, waitTicks: 0, safetyRadius: 6 },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setRobots(prev => prev.map(robot => {
        const path = paths[robot.type];
        const target = path[robot.targetIndex];
        const dx = target.x - robot.x;
        const dy = target.y - robot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const rotation = getAngle(robot.x, robot.y, target.x, target.y);

        // Check collision with other robots
        let blocked = false;
        for (const other of prev) {
          if (other.id === robot.id) continue;
          if (getDistance(robot.x, robot.y, other.x, other.y) < 10) {
            // Priority: lower ID goes first
            if (robot.id > other.id) {
              blocked = true;
              break;
            }
          }
        }

        // Deadlock resolution: if waiting too long, skip waypoint
        if (blocked) {
          const newWaitTicks = robot.waitTicks + 1;
          if (newWaitTicks > 80) {
            return {
              ...robot,
              targetIndex: (robot.targetIndex - 1) % path.length,
              status: 'moving' as const,
              waitTicks: 0,
              rotation,
            };
          }
          return { ...robot, status: 'waiting' as const, waitTicks: newWaitTicks, rotation };
        }

        // Reached target
        if (dist < 0.5) {
          return {
            ...robot,
            targetIndex: (robot.targetIndex + 1) % path.length,
            status: 'moving' as const,
            waitTicks: 0,
            rotation,
          };
        }

        // Move toward target
        return {
          ...robot,
          x: robot.x + (dx / dist) * robot.speed,
          y: robot.y + (dy / dist) * robot.speed,
          status: 'moving' as const,
          waitTicks: 0,
          rotation,
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-10">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-3 py-1.5 bg-background/80 backdrop-blur border border-primary/30 rounded-lg text-xs text-foreground hover:bg-primary/20"
        >
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
        <div className="px-3 py-1.5 bg-background/80 backdrop-blur border border-primary/30 rounded-lg text-xs text-foreground">
          {robots.length} Robots
        </div>
      </div>

      {/* Selected robot info */}
      {selectedId && (
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur border border-primary/30 rounded-lg p-3 text-xs z-10 min-w-[150px]">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-foreground">{robots.find(r => r.id === selectedId)?.name}</span>
            <button onClick={() => setSelectedId(null)} className="text-muted-foreground">✕</button>
          </div>
          <div className="text-muted-foreground">
            Status: <span className={robots.find(r => r.id === selectedId)?.status === 'moving' ? 'text-green-400' : 'text-yellow-400'}>
              {robots.find(r => r.id === selectedId)?.status}
            </span>
          </div>
        </div>
      )}

      <svg className="w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Grid */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.1" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Zones */}
        {zones.map(zone => (
          <g key={zone.name}>
            <rect
              x={zone.x} y={zone.y} width={zone.w} height={zone.h}
              fill="none" stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.3" strokeDasharray="2 1" rx="1"
            />
            <text x={zone.x + zone.w / 2} y={zone.y - 1} fontSize="2" fill="hsl(var(--primary) / 0.7)" textAnchor="middle">
              {zone.name}
            </text>
          </g>
        ))}

        {/* Paths - visible waypoints */}
        {Object.entries(paths).map(([type, pts]) => (
          <g key={type}>
            <path
              d={`M ${pts.map(p => `${p.x} ${p.y}`).join(' L ')} Z`}
              fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="0.3" strokeDasharray="1 1" opacity={0.7}
            />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="0.8" fill="hsl(var(--primary) / 0.5)" opacity={0.7} />
            ))}
          </g>
        ))}

        {/* Robots */}
        {robots.map(robot => (
          <motion.g
            key={robot.id}
            animate={{ x: robot.x, y: robot.y }}
            transition={{ type: 'tween', duration: 0.05, ease: 'linear' }}
            onClick={(e) => { e.stopPropagation(); setSelectedId(robot.id); }}
            style={{ cursor: 'pointer' }}
          >
            {selectedId === robot.id && (
              <circle cx={0} cy={0} r="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" strokeDasharray="1.5 0.5" />
            )}
            <g transform={`rotate(${robot.rotation})`}>
              <image href={robotImages[robot.type]} x="-3" y="-3" width="6" height="6" opacity="0.8" />
            </g>

               <circle 
              cx={0} 
              cy={0} 
              r={robot.safetyRadius} 
              fill="hsl(var(--primary) / 0.05)" 
              stroke={robot.status === 'moving' ? 'hsl(var(--primary) / 0.3)' : 'hsl(40 100% 50% / 0.4)'} 
              strokeWidth="0.2" 
            />
           
            <text x="0" y="4" fontSize="1.0" fill="white" textAnchor="middle">{robot.name}</text>
          </motion.g>
        ))}
      </svg>

      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50">
        Click robots for details
      </div>
    </div>
  );
};

export default FMSAnimation;
