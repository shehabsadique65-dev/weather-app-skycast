import { motion } from 'framer-motion';
import { getAqiLabel } from '../../utils/weatherUtils';

const pollutants = [
  { key: 'pm2_5', label: 'PM2.5', unit: 'μg/m³', safe: 25 },
  { key: 'pm10', label: 'PM10', unit: 'μg/m³', safe: 50 },
  { key: 'co', label: 'CO', unit: 'μg/m³', safe: 10000 },
  { key: 'no2', label: 'NO₂', unit: 'μg/m³', safe: 200 },
];

const AQICard = ({ data }) => {
  const aqi = data?.list?.[0]?.main?.aqi;
  const components = data?.list?.[0]?.components || {};
  const { label, color } = getAqiLabel(aqi || 1);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = ((aqi || 1) - 1) / 4;
  const strokeDash = circumference * progress;

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Air Quality</h3>

      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={circumference}
              animate={{ strokeDashoffset: circumference - strokeDash }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-bold text-2xl" style={{ color }}>{aqi}</span>
            <span className="text-white/40 text-xs">AQI</span>
          </div>
        </div>

        <div className="flex-1">
          <div
            className="inline-block aqi-badge mb-3 font-semibold text-sm"
            style={{ background: `${color}20`, color }}
          >
            {label}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {pollutants.map(({ key, label: l, unit, safe }) => {
              const val = components[key] || 0;
              const pct = Math.min((val / safe) * 100, 100);
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/40">{l}</span>
                    <span className="text-white/70 font-medium">{val.toFixed(1)} {unit}</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: pct > 80 ? '#ef4444' : pct > 50 ? '#f97316' : '#22c55e' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQICard;
