import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WeatherBackground from '../components/shared/WeatherBackground';
import SearchBar from '../components/dashboard/SearchBar';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSelect = (city) => {
    navigate('/dashboard', { state: { city } });
  };

  return (
    <>
      <WeatherBackground theme="default" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 opacity-80 mix-blend-multiply" />
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center w-full max-w-lg"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-6xl md:text-8xl font-display font-bold gradient-text mb-4"
          >
            SkyCast
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl md:text-2xl text-white/70 font-light mb-12"
          >
            Your world. Your weather.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="relative z-50"
          >
            <SearchBar onSelect={handleSelect} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 text-sm tracking-[0.2em] uppercase"
          >
            <span className="text-white/40 font-light">Crafted by </span>
            <span className="text-white font-bold tracking-widest">Shehab</span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default LandingPage;
