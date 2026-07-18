import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { EventFilters, LanguageEvent } from '../models/Event';
import {
  ProficiencyLevel,
  UserLanguage,
  UserProfile,
} from '../models/Profile';
import { PROFICIENCY_LEVELS } from '../constants/catalogs';
import i18n, { AppLocale } from '../i18n';

const defaultFilters: EventFilters = {
  language: null,
  level: null,
  format: null,
  freeOnly: false,
};

const defaultProfile: UserProfile = {
  name: '',
  city: 'Белград',
  avatar: '🙂',
  bio: '',
  interests: [],
  languages: [
    { code: 'ru', role: 'native', level: 'C2' },
    { code: 'en', role: 'learning', level: 'B1' },
  ],
};

// Profiles saved before CEFR proficiency levels stored event-style bands
// ("B1-B2"); map them onto the new scale.
const legacyLevelMap: Record<string, ProficiencyLevel> = {
  'A1-A2': 'A2',
  'B1-B2': 'B1',
  'C1-C2': 'C1',
  any: 'B1',
};

const normalizeLanguage = (item: UserLanguage): UserLanguage => ({
  ...item,
  level: PROFICIENCY_LEVELS.includes(item.level)
    ? item.level
    : (legacyLevelMap[item.level] ?? 'B1'),
});

// Interests saved before i18n stored Russian display names; map them to keys.
const legacyInterestMap: Record<string, string> = {
  Путешествия: 'travel',
  Кино: 'movies',
  Музыка: 'music',
  Еда: 'food',
  Спорт: 'sport',
  IT: 'it',
  Книги: 'books',
  Игры: 'games',
  Искусство: 'art',
  Наука: 'science',
};

interface AppState {
  hydrated: boolean;
  locale: AppLocale;
  filters: EventFilters;
  rsvpIds: string[];
  reminders: Record<string, string>;
  myEvents: LanguageEvent[];
  profile: UserProfile;
  setLocale: (locale: AppLocale) => void;
  setFilters: (patch: Partial<EventFilters>) => void;
  resetFilters: () => void;
  rsvp: (id: string, reminderId?: string | null) => void;
  cancelRsvp: (id: string) => void;
  addEvent: (event: LanguageEvent) => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  setLanguage: (language: UserLanguage) => void;
  removeLanguage: (code: UserLanguage['code']) => void;
  setHydrated: () => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hydrated: false,
      locale: 'ru',
      filters: defaultFilters,
      rsvpIds: [],
      reminders: {},
      myEvents: [],
      profile: defaultProfile,
      setLocale: (locale) => {
        i18n.changeLanguage(locale);
        set({ locale });
      },
      setFilters: (patch) =>
        set((state) => ({ filters: { ...state.filters, ...patch } })),
      resetFilters: () => set({ filters: defaultFilters }),
      rsvp: (id, reminderId) =>
        set((state) => ({
          rsvpIds: [...new Set([...state.rsvpIds, id])],
          reminders: reminderId
            ? { ...state.reminders, [id]: reminderId }
            : state.reminders,
        })),
      cancelRsvp: (id) =>
        set((state) => {
          const { [id]: _removed, ...reminders } = state.reminders;
          return {
            rsvpIds: state.rsvpIds.filter((rsvpId) => rsvpId !== id),
            reminders,
          };
        }),
      addEvent: (event) =>
        set((state) => ({ myEvents: [event, ...state.myEvents] })),
      updateProfile: (patch) =>
        set((state) => ({ profile: { ...state.profile, ...patch } })),
      setLanguage: (language) =>
        set((state) => ({
          profile: {
            ...state.profile,
            languages: [
              ...state.profile.languages.filter(
                (item) => item.code !== language.code,
              ),
              language,
            ],
          },
        })),
      removeLanguage: (code) =>
        set((state) => ({
          profile: {
            ...state.profile,
            languages: state.profile.languages.filter(
              (item) => item.code !== code,
            ),
          },
        })),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'golinggo-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ rsvpIds, reminders, myEvents, profile, locale }) => ({
        rsvpIds,
        reminders,
        myEvents,
        profile,
        locale,
      }),
      merge: (persisted, current) => {
        const state = (persisted ?? {}) as Partial<AppState>;
        const profile = { ...defaultProfile, ...state.profile };
        return {
          ...current,
          ...state,
          profile: {
            ...profile,
            languages: profile.languages.map(normalizeLanguage),
            interests: profile.interests.map(
              (interest) => legacyInterestMap[interest] ?? interest,
            ),
          },
        };
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          i18n.changeLanguage(state.locale);
        }
        state?.setHydrated();
      },
    },
  ),
);

export const hydratedSelector = (state: AppState) => state.hydrated;

export default useAppStore;
