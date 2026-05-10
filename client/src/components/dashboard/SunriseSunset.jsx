import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';
import { formatTime } from '../../utils/weatherUtils';
import useAppStore from '../../store/useAppStore';

const SunriseSunset = ({ sunrise, sunset, timezone }) => {
  const { timeFormat } = useAppStore();

  const progress = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    const total = sunset - sunrise;
    const elapsed = now - sunrise;
    return Math.max(0, Math.min(1, elapsed / total));
  }, [sunrise, sunset]);

  const cx = 50;
  const cy = 70;
  const r = 44;

  const angleToPoint = (angle) => {
    const rad = ((angle - 180) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const arcStart = angleToPoint(0);
  const arcEnd = angleToPoint(180);
  const sunAngle = progress * 180;
  const sunPos = angleToPoint(sunAngle);

  const arcPath = `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Sun Position</h3>

      <div className="flex items-center justify-between text-sm text-white/60 mb-2">
        <div className="flex items-center gap-2">
          <Sunrise size={14} className="text-amber-400" />
          <span className="font-medium text-white/80">{formatTime(sunrise, timezone, timeFormat)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sunset size={14} className="text-orange-400" />
          <span className="font-medium text-white/80">{formatTime(sunset, timezone, timeFormat)}</span>
        </div>
      </div>

      <svg viewBox="0 0 100 75" className="w-full" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <path d={arcPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeLinecap="round" />

        <path
          d={arcPath}
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${r * Math.PI * progress} ${r * Math.PI}`}
        />

        <line
          x1={cx - r - 6} y1={cy}
          x2={cx + r + 6} y2={cy}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        <motion.circle
          cx={sunPos.x}
          cy={sunPos.y}
          r="5"
          fill="#fbbf24"
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx={sunPos.x} cy={sunPos.y} r="8" fill="#fbbf24" opacity="0.2" />
      </svg>

      <div className="text-center text-xs text-white/40 mt-1">
        {progress < 1 ? `${Math.round(progress * 100)}% of daylight elapsed` : 'Sun has set'}
      </div>
    </div>
  );
};

export default SunriseSunset;
