import { useMemo } from 'react';
import { Clock, ThumbsUp } from 'lucide-react';
import { getBestTimeOutside, formatTime } from '../../utils/weatherUtils';
import useAppStore from '../../store/useAppStore';

const BestTimeCard = ({ hourly, timezone }) => {
  const { timeFormat } = useAppStore();
  const bestTime = useMemo(() => getBestTimeOutside(hourly), [hourly]);

  if (!bestTime) return null;

  return (
    <div className="glass-card p-5 bg-gradient-to-br from-white/5 to-sky-500/10">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3 flex items-center gap-2">
        <ThumbsUp size={14} className="text-emerald-400" />
        Best Time Outside
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{formatTime(bestTime.dt, timezone, timeFormat)}</p>
            <p className="text-white/50 text-xs">Optimal conditions</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-emerald-400 font-bold">{Math.round(bestTime.score)}/100</div>
          <div className="text-white/40 text-[10px] uppercase">Score</div>
        </div>
      </div>
    </div>
  );
};

export default BestTimeCard;
