export const colors = {
  primary: '#2f6fed',
  primaryDark: '#1e54c4',
  background: '#fff',
  surface: '#f7f7f9',
  text: '#1c1c1e',
  textMuted: '#8e8e93',
  success: '#34c759',
  danger: '#ff3b30',
  border: '#e5e5ea',
  star: '#f5a623',
};

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
