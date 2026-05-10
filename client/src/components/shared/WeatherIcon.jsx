const icons = {
  thunderstorm: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="22" rx="18" ry="12" fill="#475569" opacity="0.9"/>
      <ellipse cx="22" cy="26" rx="14" ry="10" fill="#64748b" opacity="0.8"/>
      <ellipse cx="40" cy="26" rx="14" ry="10" fill="#64748b" opacity="0.8"/>
      <polygon points="34,34 28,46 33,46 28,58 40,42 34,42" fill="#fbbf24" opacity="0.95"/>
    </svg>
  ),
  drizzle: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="20" rx="16" ry="10" fill="#94a3b8" opacity="0.85"/>
      <ellipse cx="24" cy="24" rx="12" ry="8" fill="#cbd5e1" opacity="0.7"/>
      <ellipse cx="40" cy="24" rx="12" ry="8" fill="#cbd5e1" opacity="0.7"/>
      <line x1="26" y1="36" x2="24" y2="44" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="32" y1="38" x2="30" y2="46" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="38" y1="36" x2="36" y2="44" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  rain: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="20" rx="17" ry="11" fill="#64748b" opacity="0.9"/>
      <ellipse cx="22" cy="25" rx="13" ry="9" fill="#475569" opacity="0.8"/>
      <ellipse cx="42" cy="25" rx="13" ry="9" fill="#475569" opacity="0.8"/>
      <line x1="24" y1="36" x2="20" y2="48" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="32" y1="38" x2="28" y2="50" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="40" y1="36" x2="36" y2="48" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  snow: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="20" rx="17" ry="11" fill="#cbd5e1" opacity="0.9"/>
      <ellipse cx="22" cy="25" rx="13" ry="9" fill="#e2e8f0" opacity="0.8"/>
      <ellipse cx="42" cy="25" rx="13" ry="9" fill="#e2e8f0" opacity="0.8"/>
      <circle cx="24" cy="42" r="3" fill="#bfdbfe" opacity="0.9"/>
      <circle cx="32" cy="46" r="3" fill="#bfdbfe" opacity="0.9"/>
      <circle cx="40" cy="42" r="3" fill="#bfdbfe" opacity="0.9"/>
    </svg>
  ),
  mist: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="16" y1="24" x2="48" y2="24" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="20" y1="32" x2="44" y2="32" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="16" y1="40" x2="48" y2="40" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
  clear: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="12" fill="#fbbf24"/>
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 32 + Math.cos(rad) * 16;
        const y1 = 32 + Math.sin(rad) * 16;
        const x2 = 32 + Math.cos(rad) * 22;
        const y2 = 32 + Math.sin(rad) * 22;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>;
      })}
    </svg>
  ),
  clearnight: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M38 14 C26 14 18 22 18 34 C18 46 26 54 38 54 C30 54 20 46 20 34 C20 22 30 14 38 14Z" fill="#818cf8"/>
      <circle cx="46" cy="18" r="2" fill="#c7d2fe"/>
      <circle cx="50" cy="28" r="1.5" fill="#c7d2fe"/>
      <circle cx="44" cy="34" r="1" fill="#c7d2fe"/>
    </svg>
  ),
  clouds: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="28" r="8" fill="#94a3b8" opacity="0.7"/>
      <circle cx="36" cy="24" r="11" fill="#94a3b8" opacity="0.85"/>
      <circle cx="46" cy="30" r="8" fill="#94a3b8" opacity="0.7"/>
      <rect x="14" y="30" width="38" height="10" rx="5" fill="#94a3b8" opacity="0.85"/>
    </svg>
  ),
};

const getIcon = (id, isNight) => {
  if (id >= 200 && id < 300) return icons.thunderstorm;
  if (id >= 300 && id < 400) return icons.drizzle;
  if (id >= 500 && id < 600) return icons.rain;
  if (id >= 600 && id < 700) return icons.snow;
  if (id >= 700 && id < 800) return icons.mist;
  if (id === 800) return isNight ? icons.clearnight : icons.clear;
  return icons.clouds;
};

const WeatherIcon = ({ id = 800, isNight = false, size = 64, className = '' }) => (
  <div style={{ width: size, height: size }} className={`flex-shrink-0 ${className}`}>
    {getIcon(id, isNight)}
  </div>
);

export default WeatherIcon;
