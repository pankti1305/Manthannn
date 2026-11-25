import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { birthdayContent } from '../config/birthdayContent';

export function IntroPage() {
  const { intro } = birthdayContent;
  const shouldReduceMotion = useReducedMotion();

  // Gentle mouse parallax for decorative elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 20 });

  const shapeX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const shapeY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden ivory-paper py-10 sm:py-14"
    >
      {/* Softly floating organic shapes & editorial stars */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Sage Green organic pebble */}
        <motion.svg
          style={shouldReduceMotion ? undefined : { x: shapeX, y: shapeY }}
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -12, 0], rotate: [0, 4, 0] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-16 top-10 h-64 w-64 text-[#A8B5A0]/45 sm:h-88 sm:w-88"
          viewBox="0 0 240 240"
          fill="currentColor"
        >
          <path d="M126 18C178 22 222 68 218 124C214 180 162 224 106 218C50 212 18 164 24 108C30 52 74 14 126 18Z" />
        </motion.svg>

        {/* Sand organic arc bottom-left */}
        <motion.svg
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, 10, 0], rotate: [0, -3, 0] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 bottom-6 h-56 w-56 text-[#D8C3A5]/55 sm:h-72 sm:w-72"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M98 16C146 18 186 58 184 108C182 158 136 188 86 182C36 176 12 134 18 88C24 42 50 14 98 16Z" />
        </motion.svg>

        {/* Delicate 4-point editorial stars */}
        <motion.svg
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[10%] top-[16%] h-7 w-7 text-[#456B80]/55"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 0L19.5 12.5L32 16L19.5 19.5L16 32L12.5 19.5L0 16L12.5 12.5L16 0Z" />
        </motion.svg>

        <motion.svg
          animate={shouldReduceMotion ? undefined : { scale: [1, 0.9, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[42%] bottom-[16%] hidden h-5 w-5 text-[#67445F]/45 md:block"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 0L19.5 12.5L32 16L19.5 19.5L16 32L12.5 19.5L0 16L12.5 12.5L16 0Z" />
        </motion.svg>
      </div>

      {/* Main Editorial Spread */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Typography & CTA */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold tracking-[0.22em] text-[#456B80] uppercase"
            >
              {intro.kicker}
            </motion.p>

            {/* Staggered word-by-word Perandory reveal */}
            <h1 className="mt-5 font-display font-semibold tracking-tight text-[#67445F] text-[clamp(2.85rem,6.4vw,5.75rem)] leading-[0.96] text-balance">
              {intro.headlineLines.map((line, lineIdx) => {
                const words = line.split(' ');
                const isLastLine = lineIdx === intro.headlineLines.length - 1;
                return (
                  <span
                    key={lineIdx}
                    className={`block ${isLastLine ? 'text-[#456B80]' : ''}`}
                  >
                    {words.map((word, wordIdx) => {
                      const delay = 0.08 + lineIdx * 0.14 + wordIdx * 0.07;
                      return (
                        <span key={wordIdx} className="inline-block overflow-hidden align-top mr-[0.22em]">
                          <motion.span
                            initial={shouldReduceMotion ? false : { y: '105%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            transition={{
                              duration: 0.55,
                              delay: shouldReduceMotion ? 0 : delay,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </h1>

            {/* Animated Burgues Script handwritten accent */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-script text-3xl text-[#67445F]/90 -rotate-1 sm:text-4xl"
            >
              {intro.scriptPhrase}
            </motion.p>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#3D2738]/85 sm:text-lg"
            >
              {intro.supportingText}
            </motion.p>

            {/* Primary CTA navigating to Page 2 */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-6"
            >
              <Link
                to="/report"
                className="group relative inline-flex min-h-[54px] items-center gap-3 overflow-hidden rounded-full bg-[#67445F] px-8 py-4 text-xs font-semibold tracking-[0.18em] text-[#F6F0E5] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#456B80] active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#67445F]"
              >
                <span>{intro.ctaLabel.replace(' →', '')}</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>

              <span className="text-xs font-semibold tracking-[0.2em] text-[#67445F]/55 uppercase">
                FIVE CHAPTERS · CLICK THROUGH
              </span>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
