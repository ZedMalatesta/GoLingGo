import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { EventFilters, LanguageEvent } from '../models/Event';
import { UserLanguage, UserProfile } from '../models/Profile';

const defaultFilters: EventFilters = {
  language: null,
  level: null,
  format: null,
  freeOnly: false,
};

const defaultProfile: UserProfile = {
  name: '',
  city: 'Белград',
  languages: [
    { code: 'ru', role: 'native', level: 'any' },
    { code: 'en', role: 'learning', level: 'B1-B2' },
  ],
};

interface AppState {
  hydrated: boolean;
  filters: EventFilters;
  rsvpIds: string[];
  reminders: Record<string, string>;
  myEvents: LanguageEvent[];
  profile: UserProfile;
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
      filters: defaultFilters,
      rsvpIds: [],
      reminders: {},
      myEvents: [],
      profile: defaultProfile,
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
      partialize: ({ rsvpIds, reminders, myEvents, profile }) => ({
        rsvpIds,
        reminders,
        myEvents,
        profile,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export const hydratedSelector = (state: AppState) => state.hydrated;

export default useAppStore;
