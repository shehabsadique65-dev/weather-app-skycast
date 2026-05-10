import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const AlertBanner = ({ alerts }) => {
  const [dismissed, setDismissed] = useState([]);
  const active = alerts.filter((_, i) => !dismissed.includes(i));

  if (!active.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {active.map((alert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-xl px-4 py-3 flex items-start gap-3"
          >
            <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-amber-300 text-sm">{alert.event}</p>
              <p className="text-white/60 text-xs mt-0.5 line-clamp-2">{alert.description}</p>
            </div>
            <button
              onClick={() => setDismissed((prev) => [...prev, i])}
              className="text-white/40 hover:text-white/70 transition-colors flex-shrink-0"
              aria-label="Dismiss alert"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlertBanner;
