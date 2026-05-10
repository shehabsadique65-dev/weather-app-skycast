import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Trash2, GripVertical } from 'lucide-react';
import useSavedLocations from '../hooks/useSavedLocations';
import SearchBar from '../components/dashboard/SearchBar';
import WeatherBackground from '../components/shared/WeatherBackground';
import { themeGradients } from '../utils/weatherUtils';

const Saved = () => {
  const { locations, add, remove, reorder } = useSavedLocations();
  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;

    const newLocs = [...locations];
    const dragged = newLocs[draggedIdx];
    newLocs.splice(draggedIdx, 1);
    newLocs.splice(index, 0, dragged);
    
    setDraggedIdx(index);
    reorder(newLocs.map(l => l._id));
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  return (
    <>
      <WeatherBackground theme="default" />
      <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${themeGradients.default} opacity-80 mix-blend-multiply transition-colors duration-1000`} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto px-4 py-6"
      >
        <h1 className="text-3xl font-display font-bold text-white mb-2">Saved Locations</h1>
        <p className="text-white/60 mb-8">Manage and quickly access your favorite cities.</p>

        <div className="mb-8 relative z-50">
          <SearchBar onSelect={add} />
        </div>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {locations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 flex flex-col items-center justify-center text-center gap-4 border-dashed border-white/20"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin size={24} className="text-white/30" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white/80">No saved locations yet</p>
                  <p className="text-sm text-white/50 mt-1">Search for a city above to add it to your list.</p>
                </div>
              </motion.div>
            ) : (
              locations.map((loc, i) => (
                <motion.div
                  key={loc._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDragEnd={handleDragEnd}
                  className={`glass-card p-4 flex items-center justify-between group cursor-grab active:cursor-grabbing ${draggedIdx === i ? 'opacity-50 border-sky-500/50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <GripVertical size={20} className="text-white/20 group-hover:text-white/50 transition-colors" />
                    <div>
                      <h3 className="text-lg font-semibold text-white/90">{loc.name}</h3>
                      <p className="text-xs text-white/50">{loc.country}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(loc._id)}
                    className="p-2 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                    aria-label="Remove location"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default Saved;
