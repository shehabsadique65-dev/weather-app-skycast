export const getWeatherTheme = (weatherId, isNight = false) => {
  if (isNight) return 'night';
  if (weatherId >= 200 && weatherId < 300) return 'storm';
  if (weatherId >= 300 && weatherId < 600) return 'rainy';
  if (weatherId >= 600 && weatherId < 700) return 'snow';
  if (weatherId >= 700 && weatherId < 800) return 'foggy';
  if (weatherId === 800) return 'sunny';
  if (weatherId > 800) return 'cloudy';
  return 'default';
};
export const themeGradients = {
  sunny: 'from-amber-900/80 via-orange-900/60 to-slate-900',
  rainy: 'from-cyan-900/80 via-slate-800/70 to-slate-900',
  storm: 'from-indigo-950/90 via-purple-900/70 to-slate-900',
  snow: 'from-blue-900/60 via-slate-800/60 to-slate-900',
  night: 'from-indigo-950/90 via-slate-900/80 to-slate-950',
  foggy: 'from-slate-700/70 via-slate-800/60 to-slate-900',
  cloudy: 'from-slate-700/60 via-slate-800/60 to-slate-900',
  default: 'from-slate-900 via-slate-900 to-slate-950',
};
export const getAqiLabel = (aqi) => {
  const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  const colors = ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'];
  const idx = Math.min(aqi - 1, 4);
  return { label: labels[idx], color: colors[idx] };
};
export const getWindDirection = (deg) => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
};
export const formatTime = (unix, timezone = 0, format = '24h') => {
  const date = new Date((unix + timezone) * 1000);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes().toString().padStart(2, '0');
  if (format === '12h') {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  }
  return `${h.toString().padStart(2, '0')}:${m}`;
};
export const formatDate = (unix, timezone = 0) => {
  const date = new Date((unix + timezone) * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
};
export const groupByDay = (list) => {
  const groups = {};
  list.forEach((item) => {
    const day = new Date(item.dt * 1000).toISOString().slice(0, 10);
    if (!groups[day]) groups[day] = [];
    groups[day].push(item);
  });
  return Object.values(groups);
};
export const getOutfitRecommendation = (temp, weatherId, humidity, uvIndex) => {
  const isRainy = weatherId >= 300 && weatherId < 600;
  const isSnowy = weatherId >= 600 && weatherId < 700;
  const isStormy = weatherId >= 200 && weatherId < 300;
  if (isStormy) return { icon: '⛈️', title: 'Stay Indoors', items: ['Stay home if possible', 'Waterproof jacket', 'Sturdy boots'] };
  if (isSnowy) return { icon: '🧥', title: 'Winter Ready', items: ['Heavy coat', 'Thermal layers', 'Waterproof boots', 'Gloves & scarf'] };
  if (isRainy && temp < 10) return { icon: '🌧️', title: 'Cold & Rainy', items: ['Heavy coat', 'Umbrella', 'Waterproof boots'] };
  if (isRainy) return { icon: '☂️', title: 'Rainy Day', items: ['Light jacket', 'Umbrella', 'Water-resistant shoes'] };
  if (temp < 0) return { icon: '🥶', title: 'Freezing Cold', items: ['Heavy coat', 'Thermal wear', 'Gloves', 'Hat', 'Scarf'] };
  if (temp < 10) return { icon: '🧣', title: 'Cold', items: ['Warm jacket', 'Scarf', 'Closed-toe shoes'] };
  if (temp < 20) return { icon: '🧥', title: 'Cool', items: ['Light jacket or sweater', 'Jeans or trousers'] };
  if (temp < 28) {
    if (uvIndex >= 7) return { icon: '🕶️', title: 'Warm & Sunny', items: ['Light clothes', 'Sunscreen SPF 50+', 'Sunglasses', 'Hat'] };
    return { icon: '👕', title: 'Comfortable', items: ['T-shirt and light pants', 'Comfortable shoes'] };
  }
  return { icon: '☀️', title: 'Hot Day', items: ['Lightweight & breathable clothes', 'Sunscreen SPF 50+', 'Sunglasses', 'Stay hydrated'] };
};
export const getBestTimeOutside = (hourlyList) => {
  if (!hourlyList || hourlyList.length === 0) return null;
  const scored = hourlyList.slice(0, 12).map((h) => {
    const temp = h.main.temp;
    const pop = h.pop || 0;
    const score = (1 - pop) * 100 - Math.abs(22 - temp);
    return { dt: h.dt, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
};
export const getMoonPhase = (date) => {
  const known = new Date(2000, 0, 6);
  const diff = (date - known) / (1000 * 60 * 60 * 24);
  const cycle = diff % 29.53;
  const phase = Math.floor((cycle / 29.53) * 8);
  const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  const names = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  return { icon: phases[phase], name: names[phase] };
};
