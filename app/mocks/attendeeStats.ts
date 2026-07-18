import { AttendeeLevelStats } from '../models/Profile';

export const emptyStats: AttendeeLevelStats = {
  A1: 0,
  A2: 0,
  B1: 0,
  B2: 0,
  C1: 0,
  C2: 0,
  native: 0,
};

// Per-event attendee level breakdown; each sums to the event's attendee count.
export const mockAttendeeStats: Record<string, AttendeeLevelStats> = {
  'evt-1': { A1: 0, A2: 1, B1: 3, B2: 2, C1: 1, C2: 0, native: 1 },
  'evt-2': { A1: 2, A2: 3, B1: 4, B2: 2, C1: 1, C2: 0, native: 2 },
  'evt-3': { A1: 2, A2: 1, B1: 1, B2: 0, C1: 0, C2: 0, native: 1 },
  'evt-4': { A1: 0, A2: 2, B1: 6, B2: 7, C1: 3, C2: 1, native: 2 },
  'evt-5': { A1: 0, A2: 0, B1: 1, B2: 2, C1: 4, C2: 3, native: 1 },
  'evt-6': { A1: 4, A2: 3, B1: 1, B2: 0, C1: 0, C2: 0, native: 1 },
  'evt-7': { A1: 1, A2: 1, B1: 1, B2: 1, C1: 0, C2: 0, native: 2 },
  'evt-8': { A1: 0, A2: 1, B1: 2, B2: 1, C1: 0, C2: 0, native: 0 },
};
