/**
 * ============================================================================
 * THE JINGUR EXPERIENCE — CENTRALIZED EDITABLE DATA & PHOTO CONFIGURATION
 * ============================================================================
 * Edit any personal text, captions, report entries, awards, or photo paths
 * in this single file.
 *
 * HOW TO REPLACE PHOTOS WITH YOUR OWN:
 * 1. Place your image files in `/public/photos/` (e.g. `udaipur-01.jpg`).
 * 2. Update the `src` property in `memoryArchive.featuredUdaipur` or
 *    `memoryArchive.photos` below (e.g. `/photos/udaipur-01.jpg`).
 * 3. You can also replace `intro.scrapbookPhoto.src` for Page 1's floating frame.
 * ============================================================================
 */

export interface PageRouteMeta {
  path: string;
  chapterNumber: string;
  navLabel: string;
  shortTitle: string;
}

export interface ReportEntry {
  id: string;
  index: string;
  label: string;
  value: string;
  scriptNote: string;
  tone: 'sage' | 'sand' | 'ocean' | 'plum' | 'ivory';
}

export interface ArchivePhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  scriptTag: string;
  frameStyle: 'polaroid' | 'editorial' | 'evidence';
  aspect: 'landscape' | 'portrait' | 'square' | 'natural';
  tiltDeg: number;
  badgeLabel?: string;
}

export interface AwardHonoreeItem {
  id: string;
  number: string;
  title: string;
  description: string;
  sealLabel: string;
  motif: 'megaphone' | 'spark' | 'fingerprint' | 'crown';
  surface: 'ivory' | 'sand' | 'sage' | 'plum';
}

export const birthdayContent = {
  brand: {
    siteName: 'THE JINGUR EXPERIENCE',
    wordmark: 'Manthan · Jingur',
    friendName: 'Manthan',
    nickname: 'Jingur',
    year: '2026',
  },

  pages: [
    { path: '/', chapterNumber: '01 / 05', navLabel: 'Intro', shortTitle: 'Introduction' },
    { path: '/report', chapterNumber: '02 / 05', navLabel: 'Report', shortTitle: 'The Report' },
    { path: '/memories', chapterNumber: '03 / 05', navLabel: 'Memories', shortTitle: 'Memory Archive' },
    { path: '/awards', chapterNumber: '04 / 05', navLabel: 'Awards', shortTitle: 'Jingur Awards' },
    { path: '/letter', chapterNumber: '05 / 05', navLabel: 'Letter', shortTitle: 'Birthday Note' },
  ] as PageRouteMeta[],

  intro: {
    kicker: 'THE MANTHAN EXPERIENCE · BIRTHDAY EDITION',
    headlineLines: ["OH. IT'S YOUR", 'BIRTHDAY.', 'JINGUR.'],
    supportingText:
      "Another year older. Another year of questionable decisions. And somehow, you're still here.",
    scriptPhrase: 'A whole event, apparently.',
    ctaLabel: 'ENTER THE EXPERIENCE →',
  },

  report: {
    kicker: '01 / THE INVESTIGATION',
    heading: 'THE MANTHAN REPORT.',
    editorialDeck:
      'Compiled from years of unsolicited observations, questionable group-chat theories, and first-hand witnesses.',
    entries: [
      {
        id: 'specimen-name',
        index: '01',
        label: 'SPECIMEN NAME:',
        value: 'Manthan aka Jingur.',
        scriptNote: 'answers to both, denies neither',
        tone: 'ivory',
      },
      {
        id: 'age-status',
        index: '02',
        label: 'AGE STATUS:',
        value: '+1 level unlocked. Still no sign of maturity.',
        scriptNote: 'update stalled indefinitely',
        tone: 'sage',
      },
      {
        id: 'known-talent',
        index: '03',
        label: 'KNOWN TALENT:',
        value: 'Professional nonsense. Can turn absolutely nothing into a conversation.',
        scriptNote: 'undefeated champion',
        tone: 'ocean',
      },
      {
        id: 'species-status',
        index: '04',
        label: 'SPECIES STATUS:',
        value: 'Mostly harmless. Occasionally annoying. Handle with care.',
        scriptNote: 'keep snacks nearby',
        tone: 'sand',
      },
      {
        id: 'special-ability',
        index: '05',
        label: 'SPECIAL ABILITY:',
        value: 'Existing dramatically without any particular reason.',
        scriptNote: 'cinematic for zero reason',
        tone: 'plum',
      },
    ] as ReportEntry[],
    stampText: 'OFFICIALLY IRREPLACEABLE. UNFORTUNATELY.',
    prevLabel: '← BACK: INTRO',
    nextLabel: 'NEXT: THE EVIDENCE ARCHIVE →',
  },

  memoryArchive: {
    kicker: '02 / EVIDENCE ARCHIVE',
    heading: 'PROOF THAT WE HAVE A LIFE.',
    supportingText:
      'A collection of moments, questionable decisions, and memories that deserve their own little corner.',
    featuredUdaipur: {
      id: 'udaipur-diaries',
      src: '/assets/aistudio/image_db3048b9.png',
      alt: 'Udaipur Diaries — group selfie inside the car',
      heading: 'UDAIPUR DIARIES',
      caption: 'One trip, countless little moments. Definitely not our last adventure.',
      scriptNote: 'More trips. More chaos. More memories.',
      scriptTag: 'Featured Chapter · Udaipur',
      frameStyle: 'editorial' as const,
      aspect: 'natural' as const,
      tiltDeg: -0.8,
    },
    photos: [
      {
        id: 'mem-01',
        src: '/assets/aistudio/image_f3250a1d.png',
        alt: 'Group standing together outdoors with pink decorations',
        caption: 'Evidence that we actually go outside.',
        scriptTag: 'Exhibit A · Daylight',
        frameStyle: 'polaroid',
        aspect: 'natural',
        tiltDeg: -2.2,
      },
      {
        id: 'mem-02',
        src: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_11.56.56_PM_2da99254.jpeg',
        alt: 'Manthan mirror selfie in sage green shirt',
        caption: 'Jingur in his natural habitat.',
        scriptTag: 'Exhibit B · Unfiltered',
        frameStyle: 'editorial',
        aspect: 'natural',
        tiltDeg: 1.5,
        badgeLabel: 'FIELD SPECIMEN · MIRROR CHECK',
      },
      {
        id: 'mem-03',
        src: '/assets/aistudio/image_7dc8c71e.png',
        alt: 'Archived chat conversation planning the December trip',
        caption: 'Some questionable decisions.',
        scriptTag: 'Exhibit C · Receipts kept',
        frameStyle: 'evidence',
        aspect: 'natural',
        tiltDeg: -1.6,
        badgeLabel: 'ARCHIVED EVIDENCE · CHAT LOG',
      },
      {
        id: 'mem-05',
        src: '/assets/aistudio/image_2216fbc9.png',
        alt: 'Us together by the pool at night',
        caption: 'More memories loading...',
        scriptTag: 'Exhibit D · Next chapter',
        frameStyle: 'polaroid',
        aspect: 'natural',
        tiltDeg: 1.8,
      },
    ] as ArchivePhoto[],
    prevLabel: '← BACK: THE REPORT',
    nextLabel: 'NEXT: THE JINGUR AWARDS →',
  },

  awards: {
    kicker: '03 / INTERNATIONAL RECOGNITION',
    heading: 'THE JINGUR AWARDS.',
    subtitle:
      'Peer-reviewed honors presented with reluctant admiration by the committee of close friends.',
    items: [
      {
        id: 'award-1',
        number: 'HONOR 01',
        title: 'CEO OF NONSENSE',
        description: 'For outstanding contributions to unnecessary conversations.',
        sealLabel: 'UNANIMOUS VOTE',
        motif: 'megaphone',
        surface: 'ivory',
      },
      {
        id: 'award-2',
        number: 'HONOR 02',
        title: 'DRAMA WITHOUT REASON',
        description: 'For creating situations that nobody ordered.',
        sealLabel: 'PLOT TWIST PRO',
        motif: 'spark',
        surface: 'sand',
      },
      {
        id: 'award-3',
        number: 'HONOR 03',
        title: 'ONE OF A KIND',
        description: 'Because honestly, one Jingur is already enough.',
        sealLabel: 'LIMITED EDITION',
        motif: 'fingerprint',
        surface: 'sage',
      },
      {
        id: 'award-4',
        number: 'HONOR 04',
        title: 'LIFETIME ACHIEVEMENT IN RANDOMNESS',
        description: 'For consistently confusing everyone around him.',
        sealLabel: 'HALL OF FAME',
        motif: 'crown',
        surface: 'plum',
      },
    ] as AwardHonoreeItem[],
    prevLabel: '← BACK: MEMORIES',
    nextLabel: 'ONE LAST PAGE →',
  },

  finalLetter: {
    kicker: '04 / ONE LAST THING',
    heading: 'HAPPY BIRTHDAY, YOU ABSOLUTE LEGEND.',
    paragraphs: [
      'Jokes apart, Jingur.',
      "You're genuinely a good person to have around. I'm glad we've made these memories together, from our Udaipur trip to all the random moments in between.",
      "Here's to more trips, more adventures, more laughs, more crazy conversations, and many more memories waiting to happen.",
      "Hope this year brings you ridiculous amounts of happiness, exciting experiences, and everything you've been looking forward to.",
      'Keep being your weird, funny self. The world has enough normal people anyway.',
      "And please, next year, don't call your birthday boring. We've already established that you're a whole event.",
      'Happy Birthday, bro!',
    ],
    signOff: 'Made with effort, creativity and way too much time. From your friend.',
    surpriseButtonLabel: 'ONE LAST SURPRISE 🎁',
    surpriseReplayLabel: 'CELEBRATE ONE MORE TIME 🎉',
    surpriseRevealMessage:
      'CONGRATULATIONS! YOU HAVE UNLOCKED ANOTHER YEAR OF BEING AN ABSOLUTE IDIOT. NO REFUNDS. NO EXCHANGES. HAPPY BIRTHDAY, BRO!',
    prevLabel: '← BACK: AWARDS',
    restartLabel: 'START FROM PAGE 01 ↺',
  },
};
