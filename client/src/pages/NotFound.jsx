import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CloudOff } from 'lucide-react';
import WeatherBackground from '../components/shared/WeatherBackground';
import { themeGradients } from '../utils/weatherUtils';

const NotFound = () => {
  return (
    <>
      <WeatherBackground theme="cloudy" />
      <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${themeGradients.cloudy} opacity-80 mix-blend-multiply`} />
      
      <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 max-w-md w-full text-center flex flex-col items-center border border-white/10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/80 mb-6"
          >
            <CloudOff size={80} strokeWidth={1} />
          </motion.div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">404</h1>
          <h2 className="text-xl font-semibold text-white/80 mb-4">Lost in the Clouds</h2>
          <p className="text-white/50 mb-8">The weather data or page you are looking for seems to have blown away.</p>
          <Link
            to="/dashboard"
            className="glass-button px-6 py-3 w-full text-white font-medium bg-white/5 hover:bg-white/10 transition-colors inline-block"
          >
            Return to Radar
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
