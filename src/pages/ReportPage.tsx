import { motion, useReducedMotion } from 'motion/react';
import { ChapterFooterNav } from '../components/ChapterFooterNav';
import { birthdayContent, ReportEntry } from '../config/birthdayContent';

function getEntryAccentDot(tone: ReportEntry['tone']) {
  switch (tone) {
    case 'sage':
      return 'bg-[#A8B5A0] text-[#3D2738]';
    case 'ocean':
      return 'bg-[#456B80] text-[#F6F0E5]';
    case 'sand':
      return 'bg-[#D8C3A5] text-[#3D2738]';
    case 'plum':
      return 'bg-[#67445F] text-[#F6F0E5]';
    case 'ivory':
    default:
      return 'bg-[#F6F0E5] text-[#67445F] border border-[#67445F]/25';
  }
}

export function ReportPage() {
  const { report } = birthdayContent;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="min-h-[calc(100dvh-4rem)] sand-paper py-10 text-[#3D2738] sm:py-14">
      <div className="mx-auto flex max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8">
        {/* Two-column Magazine Dossier Composition */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Masthead & Official Stamp */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#456B80] uppercase">
                {report.kicker}
              </p>

              <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-[#67445F] sm:text-6xl lg:text-7xl text-balance">
                {report.heading}
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-[#3D2738]/85">
                {report.editorialDeck}
              </p>
            </div>

            {/* Tilted Official Editorial Stamp */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, rotate: -7, scale: 0.92 }}
              animate={{ opacity: 1, rotate: -3, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 self-start lg:mt-14"
            >
              <div className="relative inline-flex max-w-xs flex-col items-center border-4 border-double border-[#67445F] bg-[#F6F0E5] px-7 py-6 text-center scrapbook-frame">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#456B80] uppercase">
                  OFFICIAL CLEARANCE
                </span>
                <p className="mt-2 font-display text-2xl leading-tight text-[#67445F]">
                  {report.stampText}
                </p>
                <span className="mt-3 font-script text-2xl text-[#456B80]">
                  signed & sealed
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Broadsheet Specimen Entries */}
          <div className="lg:col-span-7">
            <div className="border-t-2 border-[#67445F] bg-[#F6F0E5]/85 p-6 sm:p-10 scrapbook-frame">
              <div className="flex items-center justify-between border-b border-[#67445F]/15 pb-4">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#67445F]/70 uppercase">
                  FIELD OBSERVATION DOSSIER
                </span>
                <span className="font-script text-2xl text-[#456B80]">
                  handle gently
                </span>
              </div>

              <div className="divide-y divide-[#67445F]/15">
                {report.entries.map((entry, idx) => (
                  <motion.article
                    key={entry.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : 0.08 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group py-5 first:pt-6 last:pb-2"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums ${getEntryAccentDot(
                            entry.tone
                          )}`}
                        >
                          {entry.index}
                        </span>
                        <h2 className="text-xs font-bold tracking-[0.2em] text-[#456B80] uppercase">
                          {entry.label}
                        </h2>
                      </div>

                      <span className="font-script text-2xl text-[#67445F]/80 transition-transform duration-200 group-hover:translate-x-1">
                        {entry.scriptNote}
                      </span>
                    </div>

                    <p className="mt-2.5 pl-0 font-display text-2xl leading-snug text-[#67445F] sm:pl-10 sm:text-3xl">
                      {entry.value}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Chapter Navigation */}
        <ChapterFooterNav
          prevTo="/"
          prevLabel={report.prevLabel}
          nextTo="/memories"
          nextLabel={report.nextLabel}
          chapterNumber="02 / 05"
          variant="light"
        />
      </div>
    </section>
  );
}
