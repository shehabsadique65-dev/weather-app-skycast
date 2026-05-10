import { useRef } from 'react';
import { motion } from 'framer-motion';
import WeatherIcon from '../shared/WeatherIcon';
import useAppStore from '../../store/useAppStore';
import { formatTime } from '../../utils/weatherUtils';

const HourlyStrip = ({ list, timezone }) => {
  const stripRef = useRef(null);
  const { convertTemp, tempSymbol, timeFormat } = useAppStore();

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Hourly Forecast</h3>
      <div
        ref={stripRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        style={{ cursor: 'grab' }}
        onMouseDown={(e) => {
          const el = stripRef.current;
          if (!el) return;
          let startX = e.pageX - el.offsetLeft;
          let scrollLeft = el.scrollLeft;
          el.style.cursor = 'grabbing';
          const move = (ev) => { el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX); };
          const up = () => { el.style.cursor = 'grab'; window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
          window.addEventListener('mousemove', move);
          window.addEventListener('mouseup', up);
        }}
      >
        {list.slice(0, 24).map((item, i) => {
          const isNight = item.sys?.pod === 'n';
          return (
            <motion.div
              key={item.dt}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex-shrink-0 flex flex-col items-center gap-2 glass-card px-4 py-3 min-w-[76px] hover:bg-white/10 transition-colors duration-200"
            >
              <span className="text-white/50 text-xs font-medium">
                {i === 0 ? 'Now' : formatTime(item.dt, timezone, timeFormat)}
              </span>
              <WeatherIcon id={item.weather[0].id} isNight={isNight} size={36} />
              <span className="text-white font-semibold text-sm">
                {convertTemp(item.main.temp)}{tempSymbol()}
              </span>
              {item.pop > 0 && (
                <span className="text-sky-400 text-xs font-medium">
                  {Math.round(item.pop * 100)}%
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyStrip;
