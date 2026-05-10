import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/shared/Navbar';
import useAppStore from './store/useAppStore';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Forecast = lazy(() => import('./pages/Forecast'));
const Saved = lazy(() => import('./pages/Saved'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

const FallbackLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-slate-950 z-50">
    <div className="w-12 h-12 border-4 border-white/10 border-t-sky-400 rounded-full animate-spin"></div>
  </div>
);

const AppContent = () => {
  const { resolvedTheme } = useAppStore();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    if (resolvedTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [resolvedTheme]);

  return (
    <div className="min-h-screen flex flex-col text-slate-900 dark:text-white transition-colors duration-300">
      {!isLanding && <Navbar />}
      <main className="relative w-full flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={<FallbackLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <footer className={`w-full text-center py-6 text-xs text-white/20 tracking-wider font-light z-40 relative ${!isLanding ? 'mb-20 md:mb-0' : ''}`}>
        &copy; 2026 Shehab Sadique. All Rights Reserved.
      </footer>
    </div>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
