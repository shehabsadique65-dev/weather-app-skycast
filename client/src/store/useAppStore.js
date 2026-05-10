import { create } from 'zustand';
const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const useAppStore = create((set, get) => ({
  theme: 'auto',
  resolvedTheme: getSystemTheme(),
  temperatureUnit: 'celsius',
  windSpeedUnit: 'kmh',
  pressureUnit: 'hpa',
  timeFormat: '24h',
  mapLayer: 'temperature',
  location: null,
  sessionId: localStorage.getItem('skycast_session') || (() => {
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('skycast_session', id);
    return id;
  })(),
  setTheme: (theme) => {
    const resolved = theme === 'auto' ? getSystemTheme() : theme;
    set({ theme, resolvedTheme: resolved });
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  setSettings: (settings) => set(settings),
    setLocation: (location) => set({ location }),
  convertTemp: (kelvinOrCelsius, fromKelvin = false) => {
    const unit = get().temperatureUnit;
    const celsius = fromKelvin ? kelvinOrCelsius - 273.15 : kelvinOrCelsius;
    if (unit === 'fahrenheit') return Math.round((celsius * 9) / 5 + 32);
    if (unit === 'kelvin') return Math.round(celsius + 273.15);
    return Math.round(celsius);
  },
  tempSymbol: () => {
    const unit = get().temperatureUnit;
    if (unit === 'fahrenheit') return '°F';
    if (unit === 'kelvin') return 'K';
    return '°C';
  },
  convertWind: (ms) => {
    const unit = get().windSpeedUnit;
    if (unit === 'kmh') return (ms * 3.6).toFixed(1);
    if (unit === 'mph') return (ms * 2.237).toFixed(1);
    return ms.toFixed(1);
  },
  windLabel: () => {
    const unit = get().windSpeedUnit;
    if (unit === 'kmh') return 'km/h';
    if (unit === 'mph') return 'mph';
    return 'm/s';
  },
  convertPressure: (hpa) => {
    const unit = get().pressureUnit;
    if (unit === 'inhg') return (hpa * 0.02953).toFixed(2);
    return hpa;
  },
  pressureLabel: () => (get().pressureUnit === 'inhg' ? 'inHg' : 'hPa'),
}));
export default useAppStore;
