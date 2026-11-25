import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { birthdayContent } from '../config/birthdayContent';

export function ChapterHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const currentPage =
    birthdayContent.pages.find((p) => p.path === location.pathname) ??
    birthdayContent.pages[0];

  const isDarkCanvas = location.pathname === '/awards';

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
        isDarkCanvas
          ? 'bg-[#456B80]/95 border-[#F6F0E5]/15 text-[#F6F0E5]'
          : 'bg-[#F6F0E5]/92 border-[#67445F]/12 text-[#67445F]'
      } backdrop-blur-md`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Editorial Wordmark */}
        <NavLink
          to="/"
          className={`font-display text-xl tracking-tight whitespace-nowrap shrink-0 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 ${
            isDarkCanvas
              ? 'text-[#F6F0E5] focus-visible:outline-[#D8C3A5]'
              : 'text-[#67445F] focus-visible:outline-[#456B80]'
          }`}
        >
          {birthdayContent.brand.wordmark}
        </NavLink>

        {/* Zone 2: 5 Chapter Links */}
        <nav aria-label="Chapter navigation" className="hidden md:flex items-center gap-7">
          {birthdayContent.pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              end={page.path === '/'}
              className={({ isActive }) =>
                `relative py-1 text-xs font-semibold tracking-[0.16em] uppercase whitespace-nowrap shrink-0 transition-colors ${
                  isDarkCanvas
                    ? isActive
                      ? 'text-[#D8C3A5]'
                      : 'text-[#F6F0E5]/75 hover:text-[#F6F0E5]'
                    : isActive
                      ? 'text-[#67445F]'
                      : 'text-[#67445F]/60 hover:text-[#456B80]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{page.navLabel}</span>
                  {isActive && (
                    <motion.span
                      layoutId={shouldReduceMotion ? undefined : 'chapter-underline'}
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isDarkCanvas ? 'bg-[#D8C3A5]' : 'bg-[#456B80]'
                      }`}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Chapter Progress Indicator + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-xs font-semibold tracking-[0.2em] tabular-nums whitespace-nowrap ${
              isDarkCanvas ? 'text-[#D8C3A5]' : 'text-[#456B80]'
            }`}
          >
            {currentPage.chapterNumber}
          </span>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close chapter menu' : 'Open chapter menu'}
            aria-expanded={mobileOpen}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border md:hidden cursor-pointer transition-colors ${
              isDarkCanvas
                ? 'border-[#F6F0E5]/25 text-[#F6F0E5] hover:border-[#D8C3A5]'
                : 'border-[#67445F]/20 text-[#67445F] hover:border-[#456B80]'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Chapter Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`border-t px-4 py-4 md:hidden ${
              isDarkCanvas
                ? 'bg-[#456B80] border-[#F6F0E5]/15 text-[#F6F0E5]'
                : 'bg-[#F6F0E5] border-[#67445F]/12 text-[#67445F]'
            }`}
          >
            <nav aria-label="Mobile chapter navigation" className="flex flex-col gap-1">
              {birthdayContent.pages.map((page, index) => (
                <NavLink
                  key={page.path}
                  to={page.path}
                  end={page.path === '/'}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isDarkCanvas
                        ? isActive
                          ? 'bg-[#F6F0E5]/15 text-[#D8C3A5]'
                          : 'text-[#F6F0E5]/85 hover:bg-[#F6F0E5]/10'
                        : isActive
                          ? 'bg-[#D8C3A5]/45 text-[#67445F]'
                          : 'text-[#67445F]/80 hover:bg-[#D8C3A5]/25'
                    }`
                  }
                >
                  <span className="font-display text-lg">{page.shortTitle}</span>
                  <span className="font-script text-xl opacity-80">0{index + 1}</span>
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
