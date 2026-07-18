import { LanguageCode, Level } from './Event';

export type LanguageRole = 'native' | 'learning';

export interface UserLanguage {
  code: LanguageCode;
  role: LanguageRole;
  level: Level;
}

export interface UserProfile {
  name: string;
  city: string;
  avatar: string;
  bio: string;
  interests: string[];
  languages: UserLanguage[];
}
