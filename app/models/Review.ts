import { AttendeeLevelCategory } from './Profile';

export interface EventReview {
  id: string;
  author: string;
  avatar: string;
  /** Reviewer's level in the event's language at the time of attending. */
  level: AttendeeLevelCategory;
  /** 1–5 stars. */
  rating: number;
  text: string;
  dateISO: string;
}
