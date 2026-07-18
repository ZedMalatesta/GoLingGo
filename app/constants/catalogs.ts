import { EventFormat, LanguageCode, Level } from '../models/Event';

export const LANGUAGES: Record<LanguageCode, { name: string; flag: string }> = {
  en: { name: 'Английский', flag: '🇬🇧' },
  de: { name: 'Немецкий', flag: '🇩🇪' },
  es: { name: 'Испанский', flag: '🇪🇸' },
  fr: { name: 'Французский', flag: '🇫🇷' },
  it: { name: 'Итальянский', flag: '🇮🇹' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  zh: { name: 'Китайский', flag: '🇨🇳' },
};

export const LANGUAGE_CODES = Object.keys(LANGUAGES) as LanguageCode[];

export const LEVELS: Level[] = ['A1-A2', 'B1-B2', 'C1-C2', 'any'];

export const LEVEL_LABELS: Record<Level, string> = {
  'A1-A2': 'A1–A2',
  'B1-B2': 'B1–B2',
  'C1-C2': 'C1–C2',
  any: 'Любой уровень',
};

export const FORMATS: Record<EventFormat, string> = {
  'speaking-club': 'Разговорный клуб',
  meetup: 'Языковая встреча',
  tandem: 'Тандем',
  online: 'Онлайн',
};

export const FORMAT_CODES = Object.keys(FORMATS) as EventFormat[];
