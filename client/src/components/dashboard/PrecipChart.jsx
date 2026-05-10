import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CloudRain } from 'lucide-react';
import { formatTime } from '../../utils/weatherUtils';
import useAppStore from '../../store/useAppStore';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="text-white/60 mb-1">{label}</p>
      <p className="text-sky-400 font-semibold">{payload[0].value.toFixed(2)} mm</p>
    </div>
  );
};

const PrecipChart = ({ list, timezone }) => {
  const { timeFormat } = useAppStore();

  const data = useMemo(() =>
    list.slice(0, 9).map((item) => ({
      time: formatTime(item.dt, timezone, timeFormat),
      rain: item.rain?.['3h'] || item.snow?.['3h'] || 0,
      pop: (item.pop || 0) * 100,
    })),
    [list, timezone, timeFormat]
  );

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <CloudRain size={16} className="text-sky-400" />
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Precipitation</h3>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="time"
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="rain" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.rain > 0 ? '#38bdf8' : 'rgba(56,189,248,0.25)'}
                opacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-between mt-2 text-xs text-white/40">
        <span>Precipitation (mm / 3h)</span>
        <span>{data.filter((d) => d.rain > 0).length} rainy periods</span>
      </div>
    </div>
  );
};

export default PrecipChart;
