import { useState } from 'react';
import { Gift, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChapterFooterNav } from '../components/ChapterFooterNav';
import { ConfettiCanvas } from '../components/ConfettiCanvas';
import { birthdayContent } from '../config/birthdayContent';

export function LetterPage() {
  const { finalLetter } = birthdayContent;
  const [revealed, setRevealed] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleSurprise = () => {
    setRevealed(true);
    setBurstKey((prev) => prev + 1);
  };

  return (
    <section className="relative min-h-[calc(100dvh-4rem)] bg-[#67445F] py-10 text-[#F6F0E5] sm:py-14">
      <ConfettiCanvas burstKey={burstKey} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Intimate Header */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#D8C3A5] uppercase">
            {finalLetter.kicker}
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl leading-[0.98] tracking-tight text-[#F6F0E5] sm:text-5xl lg:text-6xl text-balance">
            {finalLetter.heading}
          </h1>
        </div>

        {/* Stationery Paper Letter */}
        <motion.article
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-10 border border-[#D8C3A5]/45 bg-[#F6F0E5] p-7 text-[#3D2738] sm:p-12 scrapbook-frame"
        >
          {/* Decorative Sage Tape Strip */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-1 bg-[#A8B5A0]/85"
          />

          <div className="flex items-center justify-between border-b border-[#67445F]/15 pb-4">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#456B80] uppercase">
              PERSONAL NOTE · FOR {birthdayContent.brand.friendName.toUpperCase()}
            </span>
            <span className="font-script text-2xl text-[#67445F]">
              read slowly
            </span>
          </div>

          <div className="mx-auto mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-[#3D2738]/90 sm:text-lg sm:leading-loose">
            {finalLetter.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0 || idx === finalLetter.paragraphs.length - 1
                    ? 'font-display text-2xl text-[#67445F] sm:text-3xl'
                    : ''
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-2xl border-t border-[#67445F]/15 pt-6">
            <p className="font-script text-3xl text-[#456B80] sm:text-4xl">
              {finalLetter.signOff}
            </p>
          </div>
        </motion.article>

        {/* Final Interactive Surprise Reveal */}
        <div className="mt-10 flex flex-col items-center text-center">
          <button
            type="button"
            onClick={handleSurprise}
            className="inline-flex min-h-[54px] items-center gap-3 rounded-full bg-[#D8C3A5] px-8 py-4 text-xs font-bold tracking-[0.18em] text-[#3D2738] uppercase transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#F6F0E5] active:translate-y-0 active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8C3A5]"
          >
            {revealed ? (
              <>
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>{finalLetter.surpriseReplayLabel}</span>
              </>
            ) : (
              <>
                <Gift className="h-4 w-4" aria-hidden="true" />
                <span>{finalLetter.surpriseButtonLabel}</span>
              </>
            )}
          </button>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 w-full max-w-2xl border-2 border-[#D8C3A5] bg-[#456B80] p-8 text-[#F6F0E5] scrapbook-frame sm:p-10"
              >
                <p className="font-display text-2xl leading-snug tracking-tight sm:text-3xl">
                  {finalLetter.surpriseRevealMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Chapter Navigation */}
        <ChapterFooterNav
          prevTo="/awards"
          prevLabel={finalLetter.prevLabel}
          nextTo="/"
          nextLabel={finalLetter.restartLabel}
          chapterNumber="05 / 05"
          variant="dark"
        />
      </div>
    </section>
  );
}
