import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export interface LightboxItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  scriptTag: string;
}

interface LightboxModalProps {
  items: LightboxItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function LightboxModal({
  items,
  selectedIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [failedSrcs, setFailedSrcs] = useState<Record<string, boolean>>({});

  const isOpen = selectedIndex !== null && items[selectedIndex] !== undefined;
  const activeItem = isOpen ? items[selectedIndex] : null;

  useEffect(() => {
    if (!isOpen || selectedIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((selectedIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((selectedIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedIndex, items.length, onClose, onNavigate]);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    onNavigate((selectedIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    onNavigate((selectedIndex + 1) % items.length);
  };

  return (
    <AnimatePresence>
      {isOpen && activeItem && selectedIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${selectedIndex + 1} of ${items.length}: ${activeItem.caption}`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2E1E2B]/92 p-4 backdrop-blur-md sm:p-8"
        >
          {/* Top bar */}
          <div className="fixed top-4 left-4 right-4 z-10 flex items-center justify-between sm:top-6 sm:left-8 sm:right-8">
            <span className="text-xs font-semibold tracking-[0.22em] text-[#D8C3A5] tabular-nums uppercase">
              FRAME {String(selectedIndex + 1).padStart(2, '0')} /{' '}
              {String(items.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close photograph viewer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F6F0E5]/25 bg-[#67445F]/75 text-[#F6F0E5] transition-colors hover:bg-[#F6F0E5] hover:text-[#67445F] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D8C3A5]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Photo stage with smooth slide transition */}
          <motion.div
            key={activeItem.id}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-4xl flex-col items-center"
          >
            <div className="w-full rounded-sm bg-[#F6F0E5] p-3 pb-6 shadow-2xl sm:p-5 sm:pb-7">
              <div className="relative flex max-h-[62vh] w-full items-center justify-center overflow-hidden bg-[#456B80]/15">
                {failedSrcs[activeItem.src] ? (
                  <div className="flex h-72 w-full flex-col items-center justify-center gap-3 bg-[#EFE4D2] p-8 text-center text-[#67445F] sm:h-96">
                    <ImageOff className="h-9 w-9 text-[#456B80]" />
                    <p className="font-display text-2xl">{activeItem.caption}</p>
                    <p className="text-xs text-[#67445F]/75">
                      Add your photo file at <code>{activeItem.src}</code>
                    </p>
                  </div>
                ) : (
                  <img
                    src={activeItem.src}
                    alt={activeItem.alt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedSrcs((prev) => ({ ...prev, [activeItem.src]: true }))
                    }
                    className="max-h-[60vh] w-auto max-w-full object-contain"
                  />
                )}
              </div>

              <div className="mt-5 flex flex-col justify-between gap-2 px-1 sm:flex-row sm:items-end">
                <p className="font-display text-xl text-[#67445F] sm:text-2xl">
                  {activeItem.caption}
                </p>
                <span className="font-script text-2xl text-[#456B80]">
                  {activeItem.scriptTag}
                </span>
              </div>
            </div>

            {/* Previous / Next Controls */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photograph"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#D8C3A5]/45 bg-[#67445F]/65 px-5 py-2 text-xs font-semibold tracking-wider text-[#F6F0E5] transition-colors hover:bg-[#D8C3A5] hover:text-[#3D2738] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D8C3A5]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>PREVIOUS</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photograph"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#D8C3A5] px-5 py-2 text-xs font-semibold tracking-wider text-[#3D2738] transition-colors hover:bg-[#A8B5A0] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F6F0E5]"
              >
                <span>NEXT</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
