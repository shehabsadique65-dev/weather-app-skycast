import { motion } from 'framer-motion';
import { getWindDirection } from '../../utils/weatherUtils';
import useAppStore from '../../store/useAppStore';

const WindCompass = ({ speed, deg, gust }) => {
  const { convertWind, windLabel } = useAppStore();
  const dir = getWindDirection(deg);
  const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Wind</h3>

      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

            {cardinals.map((c, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x = 50 + Math.sin(angle) * 38;
              const y = 50 - Math.cos(angle) * 38;
              return (
                <text key={c} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fill={c === 'N' || c === dir ? 'rgba(56,189,248,0.9)' : 'rgba(255,255,255,0.3)'} fontWeight={c === dir ? '700' : '400'}>
                  {c}
                </text>
              );
            })}

            <motion.g
              animate={{ rotate: deg }}
              style={{ originX: '50px', originY: '50px' }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
            >
              <polygon points="50,14 47,42 50,48 53,42" fill="#38bdf8" opacity="0.9" />
              <polygon points="50,86 47,58 50,52 53,58" fill="rgba(255,255,255,0.2)" />
            </motion.g>

            <circle cx="50" cy="50" r="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-white/40 text-xs mb-0.5">Speed</p>
            <p className="font-display font-bold text-2xl text-white">
              {convertWind(speed)} <span className="text-sm text-white/50 font-normal">{windLabel()}</span>
            </p>
          </div>
          <div>
            <p className="text-white/40 text-xs mb-0.5">Direction</p>
            <p className="font-semibold text-sky-300">{dir} ({deg}°)</p>
          </div>
          {gust && (
            <div>
              <p className="text-white/40 text-xs mb-0.5">Gust</p>
              <p className="font-semibold text-orange-300">{convertWind(gust)} {windLabel()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WindCompass;
