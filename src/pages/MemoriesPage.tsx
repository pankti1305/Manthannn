import { useMemo, useState } from 'react';
import { Expand, Image as ImageIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ChapterFooterNav } from '../components/ChapterFooterNav';
import { LightboxItem, LightboxModal } from '../components/LightboxModal';
import { ArchivePhoto, birthdayContent } from '../config/birthdayContent';

function getAspectClass(aspect: ArchivePhoto['aspect']) {
  switch (aspect) {
    case 'portrait':
      return 'aspect-[3/4]';
    case 'square':
      return 'aspect-square';
    case 'landscape':
    default:
      return 'aspect-[4/3]';
  }
}

export function MemoriesPage() {
  const { memoryArchive } = birthdayContent;
  const { featuredUdaipur, photos } = memoryArchive;
  const shouldReduceMotion = useReducedMotion();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Combine featured Udaipur + gallery photos into one seamless Lightbox sequence
  const lightboxItems: LightboxItem[] = useMemo(
    () => [
      {
        id: featuredUdaipur.id,
        src: featuredUdaipur.src,
        alt: featuredUdaipur.alt,
        caption: `${featuredUdaipur.heading} — ${featuredUdaipur.caption}`,
        scriptTag: featuredUdaipur.scriptNote,
      },
      ...photos.map((p) => ({
        id: p.id,
        src: p.src,
        alt: p.alt,
        caption: p.caption,
        scriptTag: p.scriptTag,
      })),
    ],
    [featuredUdaipur, photos]
  );

  return (
    <section className="min-h-[calc(100dvh-4rem)] ivory-paper py-10 text-[#3D2738] sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#67445F]/15 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#456B80] uppercase">
              {memoryArchive.kicker}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[0.98] tracking-tight text-[#67445F] sm:text-5xl lg:text-6xl text-balance">
              {memoryArchive.heading}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3D2738]/85">
              {memoryArchive.supportingText}
            </p>
          </div>

          <p className="font-script text-3xl text-[#456B80] lg:text-right">
            Click any photo to enlarge
          </p>
        </div>

        {/* FEATURED EDITORIAL SPREAD: UDAIPUR DIARIES */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid grid-cols-1 items-center gap-8 border border-[#67445F]/15 bg-[#EFE4D2] p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 scrapbook-frame"
        >
          <div className="lg:col-span-7">
            <button
              type="button"
              onClick={() => setSelectedIndex(0)}
              aria-label={`Open ${featuredUdaipur.heading} photograph`}
              className="group relative block w-full overflow-hidden bg-[#456B80] p-2 text-left transition-transform duration-200 hover:-translate-y-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#67445F]"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#456B80]">
                {failedImages[featuredUdaipur.id] ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-[#F6F0E5]">
                    <ImageIcon className="h-9 w-9 text-[#D8C3A5]" />
                    <span className="font-display text-xl">{featuredUdaipur.heading}</span>
                    <span className="text-xs text-[#F6F0E5]/70">{featuredUdaipur.src}</span>
                  </div>
                ) : (
                  <img
                    src={featuredUdaipur.src}
                    alt={featuredUdaipur.alt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [featuredUdaipur.id]: true }))
                    }
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                )}

                <span className="pointer-events-none absolute right-3 bottom-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F0E5]/90 text-[#67445F] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </button>
          </div>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] text-[#456B80] uppercase">
                FEATURED TRIP MEMORY
              </span>
              <h2 className="mt-3 font-display text-4xl leading-none tracking-tight text-[#67445F] sm:text-5xl">
                {featuredUdaipur.heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#3D2738]/85 sm:text-lg">
                {featuredUdaipur.caption}
              </p>
            </div>

            <div className="mt-8 border-t border-[#67445F]/15 pt-5">
              <p className="font-script text-3xl text-[#67445F]">
                {featuredUdaipur.scriptNote}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ASYMMETRIC SCRAPBOOK PHOTO GRID */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          {photos.map((photo, index) => {
            const isPolaroid = photo.frameStyle === 'polaroid';
            const colSpan =
              index === 0
                ? 'md:col-span-6 lg:col-span-5'
                : index === 1
                  ? 'md:col-span-6 lg:col-span-4'
                  : index === 2
                    ? 'md:col-span-6 lg:col-span-3'
                    : index === 3
                      ? 'md:col-span-6 lg:col-span-6'
                      : 'md:col-span-12 lg:col-span-6';

            const lightboxIdx = index + 1;
            const hasFailed = failedImages[photo.id];

            return (
              <motion.div
                key={photo.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : 0.1 + index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={colSpan}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(lightboxIdx)}
                  style={{
                    transform: shouldReduceMotion
                      ? undefined
                      : `rotate(${photo.tiltDeg}deg)`,
                  }}
                  aria-label={`Open photograph: ${photo.caption}`}
                  className={`group relative block w-full text-left transition-all duration-200 hover:rotate-0 hover:-translate-y-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#67445F] ${
                    isPolaroid
                      ? 'rounded-xs border border-[#67445F]/12 bg-[#FAF6EE] p-3.5 pb-6 scrapbook-frame hover:scrapbook-frame-hover'
                      : 'border border-[#456B80]/25 bg-[#456B80] p-3 text-[#F6F0E5] scrapbook-frame hover:scrapbook-frame-hover'
                  }`}
                >
                  {isPolaroid && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-[#A8B5A0]/80"
                    />
                  )}

                  <div
                    className={`relative w-full overflow-hidden ${getAspectClass(
                      photo.aspect
                    )} bg-[#EFE4D2]`}
                  >
                    {hasFailed ? (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#EFE4D2] p-6 text-center text-[#67445F]">
                        <ImageIcon className="h-7 w-7 text-[#456B80]" />
                        <span className="font-display text-base">{photo.caption}</span>
                        <span className="text-[11px] text-[#67445F]/65">{photo.src}</span>
                      </div>
                    ) : (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [photo.id]: true }))
                        }
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}

                    <span className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F0E5]/90 text-[#67445F] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="mt-4 px-1">
                    <span
                      className={`font-script text-2xl ${
                        isPolaroid ? 'text-[#456B80]' : 'text-[#D8C3A5]'
                      }`}
                    >
                      {photo.scriptTag}
                    </span>
                    <p
                      className={`mt-1 font-display text-lg leading-snug sm:text-xl ${
                        isPolaroid ? 'text-[#67445F]' : 'text-[#F6F0E5]'
                      }`}
                    >
                      {photo.caption}
                    </p>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Chapter Navigation */}
        <ChapterFooterNav
          prevTo="/report"
          prevLabel={memoryArchive.prevLabel}
          nextTo="/awards"
          nextLabel={memoryArchive.nextLabel}
          chapterNumber="03 / 05"
          variant="light"
        />
      </div>

      {/* Fullscreen Lightbox */}
      <LightboxModal
        items={lightboxItems}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(idx) => setSelectedIndex(idx)}
      />
    </section>
  );
}
