import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import useForecast from '../hooks/useForecast';
import WeatherBackground from '../components/shared/WeatherBackground';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import useAppStore from '../store/useAppStore';
import { formatTime, formatDate, themeGradients } from '../utils/weatherUtils';
import { SkeletonChart } from '../components/shared/Skeletons';

const Forecast = () => {
  const { location, convertTemp, timeFormat } = useAppStore();
  const { data, loading } = useForecast(location?.lat, location?.lon);
  const [tab, setTab] = useState('hourly');

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.list.slice(0, 24).map((item) => ({
      time: formatTime(item.dt, data.city.timezone, timeFormat),
      temp: convertTemp(item.main.temp),
      pop: Math.round((item.pop || 0) * 100),
      rain: item.rain?.['3h'] || 0,
      humidity: item.main.humidity,
    }));
  }, [data, convertTemp, timeFormat]);

  return (
    <>
      <WeatherBackground theme="default" />
      <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${themeGradients.default} opacity-80 mix-blend-multiply transition-colors duration-1000`} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4 py-6"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Detailed Forecast</h1>
            {data && <p className="text-white/60">{data.city.name}, {data.city.country}</p>}
          </div>
          <div className="glass-card p-1 flex">
            <button
              className={`tab-button ${tab === 'hourly' ? 'active' : ''}`}
              onClick={() => setTab('hourly')}
            >
              24 Hours
            </button>
            <button
              className={`tab-button ${tab === 'daily' ? 'active' : ''}`}
              onClick={() => setTab('daily')}
            >
              5 Days
            </button>
          </div>
        </div>

        {!location ? (
          <div className="text-center mt-12 animate-fade-in">
            <p className="text-white/40 text-lg">Search a city to get started</p>
          </div>
        ) : (
          <>
            <ErrorBoundary>
              {loading || !data ? (
                <div className="flex flex-col gap-6"><SkeletonChart /><SkeletonChart /></div>
              ) : (
                tab === 'hourly' && (
                  <div className="flex flex-col gap-6">
                    <div className="glass-card p-6 h-80">
                      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6">Temperature Trend</h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                          <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Line type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#38bdf8', stroke: '#0f172a', strokeWidth: 2 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="glass-card p-6 h-64">
                      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6">Precipitation Probability (%)</h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                          <defs>
                            <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Area type="monotone" dataKey="pop" stroke="#818cf8" fillOpacity={1} fill="url(#colorPop)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )
              )}
            </ErrorBoundary>
            
            {tab === 'daily' && data && (
               <div className="glass-card overflow-hidden mt-6">
                 <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse min-w-[600px]">
                     <thead>
                       <tr className="border-b border-white/10 bg-white/5 text-white/50 text-xs uppercase tracking-wider">
                         <th className="p-4 font-medium">Date</th>
                         <th className="p-4 font-medium">Condition</th>
                         <th className="p-4 font-medium">High / Low</th>
                         <th className="p-4 font-medium">Humidity</th>
                         <th className="p-4 font-medium">Wind</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                       {data.list.filter((_, i) => i % 8 === 0).map((day) => (
                         <tr key={day.dt} className="hover:bg-white/5 transition-colors">
                           <td className="p-4 whitespace-nowrap text-white font-medium">{formatDate(day.dt, data.city.timezone)}</td>
                           <td className="p-4 capitalize text-white/80">{day.weather[0].description}</td>
                           <td className="p-4">
                             <span className="text-white font-medium">{convertTemp(day.main.temp_max)}°</span>
                             <span className="text-white/40 ml-2">{convertTemp(day.main.temp_min)}°</span>
                           </td>
                           <td className="p-4 text-sky-300">{day.main.humidity}%</td>
                           <td className="p-4 text-emerald-300">{(day.wind.speed * 3.6).toFixed(1)} km/h</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
            )}
          </>
        )}
      </motion.div>
    </>
  );
};

export default Forecast;
