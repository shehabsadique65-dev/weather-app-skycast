import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, MapPin } from 'lucide-react';
import useGeocode from '../../hooks/useGeocode';

const RECENT_KEY = 'skycast_recent';
const MAX_RECENT = 5;

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
  });
  const inputRef = useRef(null);
  const { results, loading, search, clear } = useGeocode();

  useEffect(() => { search(query); }, [query, search]);

  const handleSelect = useCallback((item) => {
    const entry = { name: item.name, country: item.country, lat: item.lat, lon: item.lon };
    const updated = [entry, ...recent.filter((r) => !(r.lat === entry.lat && r.lon === entry.lon))].slice(0, MAX_RECENT);
    setRecent(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    setQuery('');
    setOpen(false);
    clear();
    onSelect(entry);
  }, [recent, clear, onSelect]);

  const handleKey = (e) => {
    const list = results.length ? results : recent;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((p) => Math.min(p + 1, list.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((p) => Math.max(p - 1, -1)); }
    if (e.key === 'Enter' && activeIdx >= 0) handleSelect(list[activeIdx]);
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  };

  const showList = open && (results.length > 0 || (query.length === 0 && recent.length > 0));
  const displayList = query.length > 0 ? results : recent;

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        <input
          ref={inputRef}
          id="city-search"
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIdx(-1); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKey}
          placeholder="Search city..."
          className="search-input pl-10 pr-10"
          autoComplete="off"
        />
        {(query || loading) && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
            onMouseDown={(e) => { e.preventDefault(); setQuery(''); clear(); }}
            aria-label="Clear search"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-sky-400 rounded-full animate-spin" />
            ) : (
              <X size={14} />
            )}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full glass-card overflow-hidden z-50 origin-top"
          >
            {query.length === 0 && recent.length > 0 && (
              <div className="px-3 pt-3 pb-1 text-xs font-semibold text-white/30 flex items-center gap-2">
                <Clock size={11} /> Recent Searches
              </div>
            )}
            {displayList.map((item, i) => (
              <button
                key={`${item.lat}_${item.lon}_${i}`}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 ${activeIdx === i ? 'bg-white/10' : 'hover:bg-white/6'}`}
                onMouseDown={() => handleSelect(item)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <MapPin size={13} className="text-sky-400 flex-shrink-0" />
                <span className="font-medium text-white/90 truncate">{item.name}</span>
                {item.state && <span className="text-white/40 text-xs truncate">{item.state},</span>}
                <span className="text-white/40 text-xs ml-auto flex-shrink-0">{item.country}</span>
              </button>
            ))}
            {query.length > 1 && !loading && results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-white/40">No cities found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
