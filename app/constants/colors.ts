// "Notebook doodle" theme: paper background, ink-navy line work,
// orange-red accents — matching the hand-drawn brand illustration.
export const colors = {
  primary: '#3445a5',
  primaryDark: '#232f7a',
  primarySoft: '#e9ecfa',
  accent: '#f0532d',
  background: '#fffefb',
  surface: '#f2f3fa',
  text: '#20264d',
  textMuted: '#7d84a3',
  success: '#2fb865',
  danger: '#e0442e',
  border: '#c9cfec',
  star: '#f5a623',
};

// Handwritten display font for headings (loaded in App.tsx); supports
// Latin-ext and Cyrillic, so it works in all four UI locales.
export const handFont = 'Caveat_700Bold';

// Soft elevation used by cards and floating surfaces.
export const cardShadow = {
  shadowColor: '#232f7a',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.07,
  shadowRadius: 14,
  elevation: 4,
} as const;

// Sequential single-hue ink-indigo ramp for the attendee-level chart:
// A1 → C2 → native, monotonic light-to-dark. Identity comes from the
// labels, color only encodes progression, so adjacent steps may be close.
export const levelRamp = [
  '#bdc5f0',
  '#9da9e8',
  '#7e8ede',
  '#6274d4',
  '#4a5cc2',
  '#3849a3',
  '#252f7b',
] as const;
