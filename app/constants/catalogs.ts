import { EventFormat, LanguageCode, Level } from '../models/Event';
import { ProficiencyLevel } from '../models/Profile';

// Display names for languages, formats, levels, and interests live in the
// i18n dictionaries (app/i18n/locales) — the catalogs only hold codes and
// locale-independent data.

export const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
  es: '🇪🇸',
  fr: '🇫🇷',
  it: '🇮🇹',
  pl: '🇵🇱',
  be: '🇧🇾',
  ru: '🇷🇺',
  zh: '🇨🇳',
};

export const LANGUAGE_CODES = Object.keys(LANGUAGE_FLAGS) as LanguageCode[];

export const LEVELS: Level[] = ['A1-A2', 'B1-B2', 'C1-C2', 'any'];

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
];

const LEVEL_BAND_LABELS: Record<Exclude<Level, 'any'>, string> = {
  'A1-A2': 'A1–A2',
  'B1-B2': 'B1–B2',
  'C1-C2': 'C1–C2',
};

export const levelLabel = (
  level: Level,
  t: (key: string) => string,
): string => (level === 'any' ? t('levels.any') : LEVEL_BAND_LABELS[level]);

export const FORMAT_CODES: EventFormat[] = [
  'speaking-club',
  'meetup',
  'tandem',
  'online',
];

export const AVATARS = [
  '🙂',
  '😎',
  '🦉',
  '🐙',
  '🌍',
  '📚',
  '🎧',
  '☕',
  '🚀',
  '🌸',
] as const;

export const INTERESTS = [
  'travel',
  'movies',
  'music',
  'food',
  'sport',
  'it',
  'books',
  'games',
  'art',
  'science',
] as const;
