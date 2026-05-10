import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getOutfitRecommendation } from '../../utils/weatherUtils';

const OutfitCard = ({ data }) => {
  const recommendation = useMemo(() => {
    if (!data) return null;
    return getOutfitRecommendation(
      data.main.temp,
      data.weather[0].id,
      data.main.humidity,
      data.main.uvi || 0
    );
  }, [data]);

  if (!recommendation) return null;

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">What to Wear</h3>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex flex-col items-center justify-center flex-shrink-0 border border-white/10">
          <span className="text-3xl">{recommendation.icon}</span>
        </div>
        <div>
          <h4 className="font-semibold text-white/90 mb-1">{recommendation.title}</h4>
          <ul className="flex flex-wrap gap-2 mt-2">
            {recommendation.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-xs text-white/70 bg-white/10 px-2.5 py-1 rounded-full whitespace-nowrap"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
