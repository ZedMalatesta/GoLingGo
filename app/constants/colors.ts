export const colors = {
  primary: '#2f6fed',
  primaryDark: '#1e54c4',
  primarySoft: '#eaf1fe',
  background: '#fff',
  surface: '#f2f4f9',
  text: '#171a21',
  textMuted: '#7c828d',
  success: '#2fb865',
  danger: '#ff3b30',
  border: '#e8eaf0',
  star: '#f5a623',
};

// Soft elevation used by cards and floating surfaces.
export const cardShadow = {
  shadowColor: '#16295c',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 4,
} as const;

// Sequential single-hue ramp for the attendee-level chart: A1 → C2 → native,
// monotonic light-to-dark. Identity comes from the axis labels, color only
// encodes progression, so adjacent steps may be close.
export const levelRamp = [
  '#a9c4f9',
  '#86adf5',
  '#6b99f3',
  '#4a80ee',
  '#2f6fed',
  '#2258cf',
  '#173f9e',
] as const;
