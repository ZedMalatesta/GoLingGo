export type LanguageCode = 'en' | 'de' | 'es' | 'fr' | 'it' | 'ru' | 'zh';

export type Level = 'A1-A2' | 'B1-B2' | 'C1-C2' | 'any';

export type EventFormat = 'speaking-club' | 'meetup' | 'tandem' | 'online';

export interface LanguageEvent {
  id: string;
  title: string;
  description: string;
  language: LanguageCode;
  level: Level;
  format: EventFormat;
  isFree: boolean;
  price?: string;
  city: string;
  venue: string;
  dateISO: string;
  organizer: string;
  capacity: number;
  attendees: number;
}

export interface EventFilters {
  language: LanguageCode | null;
  level: Level | null;
  format: EventFormat | null;
  freeOnly: boolean;
}
