import { motion } from 'framer-motion';
import { Droplets, Wind, Eye, Gauge, Thermometer, Navigation } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { getWindDirection } from '../../utils/weatherUtils';

const Stat = ({ icon: Icon, label, value, unit, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="weather-stat-card glass-card-hover"
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={16} className="text-white" />
    </div>
    <div>
      <p className="text-white/40 text-xs font-medium">{label}</p>
      <p className="text-white font-semibold text-lg leading-tight">
        {value} <span className="text-white/50 text-sm font-normal">{unit}</span>
      </p>
    </div>
  </motion.div>
);

const StatGrid = ({ data }) => {
  const { convertWind, windLabel, convertPressure, pressureLabel } = useAppStore();

  const stats = [
    {
      icon: Droplets, label: 'Humidity', color: 'bg-sky-500/30',
      value: data.main.humidity, unit: '%',
    },
    {
      icon: Wind, label: 'Wind Speed', color: 'bg-emerald-500/30',
      value: convertWind(data.wind.speed), unit: windLabel(),
    },
    {
      icon: Navigation, label: 'Wind Direction', color: 'bg-teal-500/30',
      value: getWindDirection(data.wind.deg), unit: `${data.wind.deg}°`,
    },
    {
      icon: Eye, label: 'Visibility', color: 'bg-violet-500/30',
      value: ((data.visibility || 0) / 1000).toFixed(1), unit: 'km',
    },
    {
      icon: Gauge, label: 'Pressure', color: 'bg-indigo-500/30',
      value: convertPressure(data.main.pressure), unit: pressureLabel(),
    },
    {
      icon: Thermometer, label: 'Feels Like', color: 'bg-orange-500/30',
      value: Math.round(data.main.feels_like), unit: '°C',
    },
    {
      icon: Droplets, label: 'Dew Point', color: 'bg-cyan-500/30',
      value: Math.round(data.main.temp - (100 - data.main.humidity) / 5), unit: '°C',
    },
    {
      icon: Eye, label: 'Cloud Cover', color: 'bg-slate-500/30',
      value: data.clouds?.all || 0, unit: '%',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <Stat key={s.label} {...s} delay={i * 0.05} />
      ))}
    </div>
  );
};

export default StatGrid;
