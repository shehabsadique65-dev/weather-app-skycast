import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useWeather from '../hooks/useWeather';
import useForecast from '../hooks/useForecast';
import useAirQuality from '../hooks/useAirQuality';
import useAppStore from '../store/useAppStore';
import WeatherBackground from '../components/shared/WeatherBackground';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import SearchBar from '../components/dashboard/SearchBar';
import HeroCard from '../components/dashboard/HeroCard';
import StatGrid from '../components/dashboard/StatGrid';
import HourlyStrip from '../components/dashboard/HourlyStrip';
import ForecastCards from '../components/dashboard/ForecastCards';
import SunriseSunset from '../components/dashboard/SunriseSunset';
import AQICard from '../components/dashboard/AQICard';
import PrecipChart from '../components/dashboard/PrecipChart';
import WindCompass from '../components/dashboard/WindCompass';
import AlertBanner from '../components/dashboard/AlertBanner';
import OutfitCard from '../components/dashboard/OutfitCard';
import BestTimeCard from '../components/dashboard/BestTimeCard';
import { SkeletonHero, SkeletonStatGrid, SkeletonHourly, SkeletonChart } from '../components/shared/Skeletons';
import { getWeatherTheme, themeGradients } from '../utils/weatherUtils';

const Dashboard = () => {
  const { location, setLocation } = useAppStore();
  const routeLocation = useLocation();

  useEffect(() => {
    if (routeLocation.state?.city) {
      setLocation(routeLocation.state.city);
    }
  }, [routeLocation.state, setLocation]);

  const lat = location?.lat;
  const lon = location?.lon;

  const { data: weather, loading: wLoading, error: wError } = useWeather(lat, lon);
  const { data: forecast, loading: fLoading } = useForecast(lat, lon);
  const { data: aqi, loading: aLoading } = useAirQuality(lat, lon);

  const loading = wLoading;
  const isNight = useMemo(() => {
    if (!weather) return false;
    const utcNow = Math.floor(Date.now() / 1000);
    return utcNow < weather.sys.sunrise || utcNow > weather.sys.sunset;
  }, [weather]);

  const theme = weather ? getWeatherTheme(weather.weather[0].id, isNight) : 'default';

  return (
    <>
      <WeatherBackground theme={theme} />
      <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${themeGradients[theme]} opacity-80 mix-blend-multiply transition-colors duration-1000`} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4 py-6"
      >
        <div className="flex flex-col items-center mb-8 relative z-50">
          <SearchBar onSelect={(c) => setLocation(c)} />
        </div>

        {!location ? (
          <div className="text-center mt-12 animate-fade-in">
            <p className="text-white/40 text-lg">Search a city to get started</p>
          </div>
        ) : (
          <>
            {wError && (
              <div className="glass-card p-6 border-red-500/30 text-center mb-8">
                <p className="text-red-400">Failed to load weather data: {wError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
              <div className="lg:col-span-8 flex flex-col gap-6">
                <ErrorBoundary>
                  {loading || !weather ? <SkeletonHero /> : <HeroCard data={weather} />}
                </ErrorBoundary>
                
                <ErrorBoundary>
                  {weather?.alerts && <AlertBanner alerts={weather.alerts} />}
                </ErrorBoundary>

                <ErrorBoundary>
                  {loading || !weather ? <SkeletonStatGrid /> : <StatGrid data={weather} />}
                </ErrorBoundary>

                <ErrorBoundary>
                  {fLoading || !forecast ? <SkeletonHourly /> : <HourlyStrip list={forecast.list} timezone={forecast.city.timezone} />}
                </ErrorBoundary>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ErrorBoundary>
                    {loading || !weather ? <SkeletonChart /> : <SunriseSunset sunrise={weather.sys.sunrise} sunset={weather.sys.sunset} timezone={weather.timezone} />}
                  </ErrorBoundary>
                  <ErrorBoundary>
                    {aLoading || !aqi ? <SkeletonChart /> : <AQICard data={aqi} />}
                  </ErrorBoundary>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-6">
                <ErrorBoundary>
                  {fLoading || !forecast ? <SkeletonChart /> : <ForecastCards list={forecast.list} timezone={forecast.city.timezone} />}
                </ErrorBoundary>
                
                <ErrorBoundary>
                  {fLoading || !forecast ? <SkeletonChart /> : <PrecipChart list={forecast.list} timezone={forecast.city.timezone} />}
                </ErrorBoundary>

                <ErrorBoundary>
                  {loading || !weather ? <SkeletonChart /> : <WindCompass speed={weather.wind.speed} deg={weather.wind.deg} gust={weather.wind.gust} />}
                </ErrorBoundary>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  <ErrorBoundary>
                    {loading || !weather ? <div className="skeleton h-32 rounded-2xl" /> : <OutfitCard data={weather} />}
                  </ErrorBoundary>
                  <ErrorBoundary>
                    {fLoading || !forecast ? <div className="skeleton h-32 rounded-2xl" /> : <BestTimeCard hourly={forecast.list} timezone={forecast.city.timezone} />}
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Dashboard;
