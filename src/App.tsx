import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChapterHeader } from './components/ChapterHeader';
import { AwardsPage } from './pages/AwardsPage';
import { IntroPage } from './pages/IntroPage';
import { LetterPage } from './pages/LetterPage';
import { MemoriesPage } from './pages/MemoriesPage';
import { ReportPage } from './pages/ReportPage';

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<IntroPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <div className="min-h-screen bg-[#F6F0E5] text-[#3D2738]">
        <ChapterHeader />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
