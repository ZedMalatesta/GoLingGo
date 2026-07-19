/** Mocked AI-generated post-event report for a finished event. */
export interface EventAIAnalytics {
  /** How many people RSVPed. */
  rsvps: number;
  /** How many actually showed up. */
  attended: number;
  /** Average review rating, 1–5. */
  averageRating: number;
  /** Share of positive sentiment in reviews/chat, 0–100. */
  sentiment: number;
  /** Short AI-written summary of how the event went. */
  summary: string;
  /** Actionable AI insights for the organizer and attendees. */
  insights: string[];
}
