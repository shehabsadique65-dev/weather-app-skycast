import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { getSettings, updateSettings } from '../services/api';
import WeatherBackground from '../components/shared/WeatherBackground';
import { themeGradients } from '../utils/weatherUtils';

const Settings = () => {
  const store = useAppStore();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSettings(store.sessionId);
        if (data) store.setSettings(data);
      } catch (err) {
        console.error('Failed to load settings', err);
      }
    };
    load();
  }, [store.sessionId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        sessionId: store.sessionId,
        temperatureUnit: store.temperatureUnit,
        windSpeedUnit: store.windSpeedUnit,
        pressureUnit: store.pressureUnit,
        timeFormat: store.timeFormat,
        theme: store.theme,
        mapLayer: store.mapLayer,
      };
      await updateSettings(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save settings', err);
    } finally {
      setLoading(false);
    }
  };

  const OptionGroup = ({ label, value, options, onChange }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/5 gap-4">
      <span className="text-white/80 font-medium">{label}</span>
      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { onChange(opt.value); store.setSettings({ [opt.key]: opt.value }); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              value === opt.value
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <WeatherBackground theme="default" />
      <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${themeGradients.default} opacity-80 mix-blend-multiply transition-colors duration-1000`} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="max-w-3xl mx-auto px-4 py-6"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Preferences</h1>
            <p className="text-white/60">Customize your weather experience.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="glass-button flex items-center gap-2 px-6 py-3 bg-sky-500/20 border-sky-500/30 hover:bg-sky-500/30 text-sky-300"
          >
            {saved ? <Check size={18} /> : <Save size={18} />}
            {loading ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <OptionGroup
            label="Temperature Unit"
            value={store.temperatureUnit}
            onChange={(v) => store.setSettings({ temperatureUnit: v })}
            options={[
              { label: 'Celsius (°C)', value: 'celsius', key: 'temperatureUnit' },
              { label: 'Fahrenheit (°F)', value: 'fahrenheit', key: 'temperatureUnit' },
              { label: 'Kelvin (K)', value: 'kelvin', key: 'temperatureUnit' }
            ]}
          />
          <OptionGroup
            label="Wind Speed Unit"
            value={store.windSpeedUnit}
            onChange={(v) => store.setSettings({ windSpeedUnit: v })}
            options={[
              { label: 'km/h', value: 'kmh', key: 'windSpeedUnit' },
              { label: 'mph', value: 'mph', key: 'windSpeedUnit' },
              { label: 'm/s', value: 'ms', key: 'windSpeedUnit' }
            ]}
          />
          <OptionGroup
            label="Pressure Unit"
            value={store.pressureUnit}
            onChange={(v) => store.setSettings({ pressureUnit: v })}
            options={[
              { label: 'hPa', value: 'hpa', key: 'pressureUnit' },
              { label: 'inHg', value: 'inhg', key: 'pressureUnit' }
            ]}
          />
          <OptionGroup
            label="Time Format"
            value={store.timeFormat}
            onChange={(v) => store.setSettings({ timeFormat: v })}
            options={[
              { label: '24 Hour', value: '24h', key: 'timeFormat' },
              { label: '12 Hour', value: '12h', key: 'timeFormat' }
            ]}
          />
          <OptionGroup
            label="App Theme"
            value={store.theme}
            onChange={store.setTheme}
            options={[
              { label: 'Auto', value: 'auto', key: 'theme' },
              { label: 'Light', value: 'light', key: 'theme' },
              { label: 'Dark', value: 'dark', key: 'theme' }
            ]}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 gap-4">
            <span className="text-white/80 font-medium">Default Map Overlay</span>
            <select
              value={store.mapLayer}
              onChange={(e) => store.setSettings({ mapLayer: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-sky-500/50 cursor-pointer"
            >
              <option value="temp_new">Temperature</option>
              <option value="precipitation_new">Precipitation</option>
              <option value="wind_new">Wind Speed</option>
              <option value="clouds_new">Clouds</option>
            </select>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Settings;
