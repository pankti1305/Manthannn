import { motion, useReducedMotion } from 'motion/react';
import { ChapterFooterNav } from '../components/ChapterFooterNav';
import { AwardHonoreeItem, birthdayContent } from '../config/birthdayContent';

function CeremonyMotif({ motif }: { motif: AwardHonoreeItem['motif'] }) {
  switch (motif) {
    case 'megaphone':
      return (
        <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M8 22V28C8 29.6569 9.34315 31 11 31H15L29 37V13L15 19H11C9.34315 19 8 20.3431 8 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M15 31L18 40H22L19.5 32.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M35 19C37.5 21 37.5 27 35 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'spark':
      return (
        <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M24 6L27.8 18.2L40 22L27.8 25.8L24 38L20.2 25.8L8 22L20.2 18.2L24 6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M38 8V14M35 11H41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'fingerprint':
      return (
        <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M14 20C14 14.4772 18.4772 10 24 10C29.5228 10 34 14.4772 34 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 22C18 18.6863 20.6863 16 24 16C27.3137 16 30 18.6863 30 22V29C30 33 27.5 36 24 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 22V31C24 33 22 35 19 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 26V31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'crown':
    default:
      return (
        <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M8 34L6 15L16.5 23L24 11L31.5 23L42 15L40 34H8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M9 39H39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

function getPlaqueTheme(surface: AwardHonoreeItem['surface']) {
  switch (surface) {
    case 'ivory':
      return {
        plaque: 'bg-[#F6F0E5] text-[#3D2738] border-[#D8C3A5]',
        title: 'text-[#67445F]',
        kicker: 'text-[#456B80]',
        seal: 'border-[#67445F]/45 text-[#67445F] bg-[#D8C3A5]/45',
        icon: 'bg-[#456B80] text-[#F6F0E5]',
      };
    case 'sand':
      return {
        plaque: 'bg-[#EFE4D2] text-[#3D2738] border-[#F6F0E5]/50',
        title: 'text-[#67445F]',
        kicker: 'text-[#456B80]',
        seal: 'border-[#456B80]/45 text-[#456B80] bg-[#F6F0E5]/70',
        icon: 'bg-[#67445F] text-[#F6F0E5]',
      };
    case 'sage':
      return {
        plaque: 'bg-[#A8B5A0] text-[#3D2738] border-[#F6F0E5]/40',
        title: 'text-[#3D2738]',
        kicker: 'text-[#3D2738]/80',
        seal: 'border-[#3D2738]/40 text-[#3D2738] bg-[#F6F0E5]/65',
        icon: 'bg-[#F6F0E5] text-[#67445F]',
      };
    case 'plum':
    default:
      return {
        plaque: 'bg-[#67445F] text-[#F6F0E5] border-[#D8C3A5]/45',
        title: 'text-[#F6F0E5]',
        kicker: 'text-[#D8C3A5]',
        seal: 'border-[#D8C3A5]/55 text-[#D8C3A5] bg-[#3D2738]/35',
        icon: 'bg-[#D8C3A5] text-[#3D2738]',
      };
  }
}

export function AwardsPage() {
  const { awards } = birthdayContent;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="flex min-h-[calc(100dvh-4rem)] flex-col justify-between ocean-paper py-10 text-[#F6F0E5] sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Ceremony Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#F6F0E5]/20 pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#D8C3A5] uppercase">
              {awards.kicker}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[0.98] tracking-tight text-[#F6F0E5] sm:text-5xl lg:text-6xl text-balance">
              {awards.heading}
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#F6F0E5]/85 sm:text-base lg:text-right">
            {awards.subtitle}
          </p>
        </div>

        {/* 4 Editorial Ceremony Plaques */}
        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
          {awards.items.map((award, index) => {
            const styles = getPlaqueTheme(award.surface);

            return (
              <motion.article
                key={award.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.48,
                  delay: shouldReduceMotion ? 0 : 0.1 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className={`group relative flex flex-col justify-between border p-7 transition-shadow duration-200 scrapbook-frame hover:scrapbook-frame-hover sm:p-9 ${styles.plaque}`}
              >
                {/* Top Row: Trophy Emblem & Embossed Seal */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105 ${styles.icon}`}
                  >
                    <CeremonyMotif motif={award.motif} />
                  </div>

                  <div
                    className={`flex h-20 w-20 shrink-0 -rotate-6 items-center justify-center rounded-full border border-dashed p-2 text-center transition-transform duration-300 group-hover:rotate-6 ${styles.seal}`}
                  >
                    <span className="text-[9px] font-bold leading-tight tracking-[0.16em] uppercase">
                      {award.sealLabel}
                    </span>
                  </div>
                </div>

                {/* Title & Citation */}
                <div className="mt-7">
                  <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${styles.kicker}`}>
                    {award.number}
                  </p>
                  <h2
                    className={`mt-2 font-display text-3xl leading-[1.04] tracking-tight sm:text-4xl ${styles.title}`}
                  >
                    {award.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed opacity-85">
                    &ldquo;{award.description}&rdquo;
                  </p>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-current/15 pt-4">
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-70">
                    {birthdayContent.brand.year} EDITION
                  </span>
                  <span className="font-script text-2xl opacity-90">
                    awarded to {birthdayContent.brand.nickname}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Chapter Navigation */}
        <ChapterFooterNav
          prevTo="/memories"
          prevLabel={awards.prevLabel}
          nextTo="/letter"
          nextLabel={awards.nextLabel}
          chapterNumber="04 / 05"
          variant="dark"
        />
      </div>
    </section>
  );
}
