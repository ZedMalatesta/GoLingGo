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

// Rounded body font matching the doodle look without being handwritten;
// per-weight families as required by expo-font.
export const bodyFont = {
  regular: 'Nunito_400Regular',
  semibold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extrabold: 'Nunito_800ExtraBold',
} as const;

// Soft elevation used by cards and floating surfaces.
export const cardShadow = {
  shadowColor: '#232f7a',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.07,
  shadowRadius: 14,
  elevation: 4,
} as const;

// Multi-hue palette for the attendee-level chart (A1 → A2 → B1 → B2 → C1 → C2 → native).
// Each step uses a distinct hue so adjacent slices are immediately distinguishable.
export const levelRamp = [
  '#4e8ef7', // A1  — vivid blue
  '#26c6a2', // A2  — teal / mint
  '#43c759', // B1  — fresh green
  '#c9d629', // B2  — yellow-lime
  '#f5a623', // C1  — warm amber
  '#f0532d', // C2  — orange-red (matches app accent)
  '#9b4fe8', // native — purple / violet
] as const;
