import { LanguageCode } from './Event';

export type LanguageRole = 'native' | 'learning';

export type ProficiencyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface UserLanguage {
  code: LanguageCode;
  role: LanguageRole;
  level: ProficiencyLevel;
}

export type AttendeeLevelCategory = ProficiencyLevel | 'native';

/** How many attendees of an event hold each level in its language. */
export type AttendeeLevelStats = Record<AttendeeLevelCategory, number>;

export interface UserProfile {
  name: string;
  city: string;
  avatar: string;
  bio: string;
  interests: string[];
  languages: UserLanguage[];
}
