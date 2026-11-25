import { Link } from 'react-router-dom';

interface ChapterFooterNavProps {
  prevTo?: string;
  prevLabel?: string;
  nextTo: string;
  nextLabel: string;
  chapterNumber: string;
  variant?: 'light' | 'dark';
}

export function ChapterFooterNav({
  prevTo,
  prevLabel,
  nextTo,
  nextLabel,
  chapterNumber,
  variant = 'light',
}: ChapterFooterNavProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`mt-14 flex flex-col items-center justify-between gap-5 border-t pt-8 sm:flex-row ${
        isDark ? 'border-[#F6F0E5]/20' : 'border-[#67445F]/15'
      }`}
    >
      <div className="flex items-center gap-4">
        {prevTo && prevLabel ? (
          <Link
            to={prevTo}
            className={`inline-flex min-h-[44px] items-center text-xs font-semibold tracking-[0.18em] uppercase transition-colors ${
              isDark
                ? 'text-[#F6F0E5]/80 hover:text-[#D8C3A5]'
                : 'text-[#67445F]/75 hover:text-[#456B80]'
            }`}
          >
            {prevLabel}
          </Link>
        ) : (
          <span
            className={`text-xs font-semibold tracking-[0.2em] tabular-nums ${
              isDark ? 'text-[#D8C3A5]' : 'text-[#456B80]'
            }`}
          >
            CHAPTER {chapterNumber}
          </span>
        )}
      </div>

      <span
        className={`hidden text-xs font-semibold tracking-[0.2em] tabular-nums sm:inline ${
          isDark ? 'text-[#D8C3A5]/80' : 'text-[#67445F]/55'
        }`}
      >
        {chapterNumber}
      </span>

      <Link
        to={nextTo}
        className={`group inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 ${
          isDark
            ? 'bg-[#D8C3A5] text-[#3D2738] hover:bg-[#F6F0E5]'
            : 'bg-[#67445F] text-[#F6F0E5] hover:bg-[#456B80]'
        }`}
      >
        <span>{nextLabel}</span>
      </Link>
    </div>
  );
}
