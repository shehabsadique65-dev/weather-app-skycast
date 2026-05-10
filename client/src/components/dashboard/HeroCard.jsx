import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Thermometer } from 'lucide-react';
import WeatherIcon from '../shared/WeatherIcon';
import useAppStore from '../../store/useAppStore';
import { formatTime } from '../../utils/weatherUtils';

const HeroCard = ({ data }) => {
  const { convertTemp, tempSymbol, timeFormat } = useAppStore();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const localTime = useMemo(() => {
    if (!data) return '';
    const unix = Math.floor(now.getTime() / 1000);
    return formatTime(unix, data.timezone, timeFormat);
  }, [now, data, timeFormat]);

  const isNight = useMemo(() => {
    if (!data) return false;
    const utcNow = Math.floor(Date.now() / 1000);
    return utcNow < data.sys.sunrise || utcNow > data.sys.sunset;
  }, [data]);

  const weatherId = data?.weather?.[0]?.id || 800;
  const description = data?.weather?.[0]?.description || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={14} className="text-sky-400" />
            <span className="text-white/60 text-sm font-medium">
              {data.name}, {data.sys.country}
            </span>
          </div>

          <div className="text-white/40 text-sm mb-6 font-mono tabular-nums">{localTime}</div>

          <div className="flex items-end gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <span className="font-display font-bold text-[5rem] md:text-[7rem] leading-none gradient-text tabular-nums">
                {convertTemp(data.main.temp)}
              </span>
              <span className="text-2xl md:text-3xl text-white/60 font-light">{tempSymbol()}</span>
            </motion.div>
          </div>

          <p className="text-white/70 capitalize text-lg mt-2 font-medium">{description}</p>

          <div className="flex items-center gap-2 mt-3 text-white/50 text-sm">
            <Thermometer size={14} className="text-orange-400" />
            <span>Feels like {convertTemp(data.main.feels_like)}{tempSymbol()}</span>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex-shrink-0 self-center md:self-start"
        >
          <WeatherIcon id={weatherId} isNight={isNight} size={120} />
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/8">
        <div className="flex flex-col items-center gap-1">
          <span className="text-white/40 text-xs">Humidity</span>
          <span className="font-semibold text-sky-300">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-white/40 text-xs">Wind</span>
          <span className="font-semibold text-emerald-300">
            {(data.wind.speed * 3.6).toFixed(0)} km/h
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-white/40 text-xs">Pressure</span>
          <span className="font-semibold text-violet-300">{data.main.pressure} hPa</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCard;
