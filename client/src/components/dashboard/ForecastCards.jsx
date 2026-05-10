import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import WeatherIcon from '../shared/WeatherIcon';
import useAppStore from '../../store/useAppStore';
import { formatDate, groupByDay, getMoonPhase } from '../../utils/weatherUtils';

const ForecastCards = ({ list, timezone }) => {
  const [expanded, setExpanded] = useState(null);
  const { convertTemp, tempSymbol } = useAppStore();

  const days = useMemo(() => groupByDay(list).slice(0, 5), [list]);

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">5-Day Forecast</h3>
      <div className="flex flex-col gap-2">
        {days.map((day, i) => {
          const first = day[0];
          const high = Math.max(...day.map((d) => d.main.temp_max));
          const low = Math.min(...day.map((d) => d.main.temp_min));
          const maxPop = Math.max(...day.map((d) => d.pop || 0));
          const moon = getMoonPhase(new Date(first.dt * 1000));
          const isOpen = expanded === i;

          return (
            <div key={first.dt}>
              <button
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-200 ${isOpen ? 'bg-white/10' : 'hover:bg-white/6'}`}
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <span className="text-white/70 text-sm font-medium w-24 text-left">
                  {i === 0 ? 'Today' : formatDate(first.dt, timezone)}
                </span>
                <WeatherIcon id={first.weather[0].id} size={32} />
                <span className="text-white/50 text-xs flex-1 text-left capitalize hidden sm:block">
                  {first.weather[0].description}
                </span>
                {maxPop > 0.1 && (
                  <span className="text-sky-400 text-xs font-medium w-12">
                    {Math.round(maxPop * 100)}%
                  </span>
                )}
                <span className="text-white font-semibold text-sm ml-auto">
                  {convertTemp(high)}{tempSymbol()}
                </span>
                <span className="text-white/40 text-sm w-16 text-right">
                  {convertTemp(low)}{tempSymbol()}
                </span>
                <span className="text-white/40">{moon.icon}</span>
                <ChevronDown
                  size={14}
                  className={`text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
                      {day.map((h) => (
                        <div
                          key={h.dt}
                          className="flex-shrink-0 flex flex-col items-center gap-1.5 glass-card px-3 py-2.5 min-w-[60px]"
                        >
                          <span className="text-white/40 text-xs">{new Date(h.dt * 1000).getUTCHours().toString().padStart(2,'0')}:00</span>
                          <WeatherIcon id={h.weather[0].id} size={24} />
                          <span className="text-white text-xs font-semibold">{convertTemp(h.main.temp)}{tempSymbol()}</span>
                          <span className="text-sky-400 text-xs">{Math.round((h.pop || 0) * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCards;
