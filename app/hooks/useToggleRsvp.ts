import { useCallback } from 'react';

import { LanguageEvent } from '../models/Event';
import useAppStore from '../store/appStore';
import {
  cancelEventReminder,
  scheduleEventReminder,
} from '../utils/notifications';

/** RSVP toggle shared by the feed and calendar: keeps the store and the
 * scheduled 2-hour reminder in sync. */
const useToggleRsvp = () => {
  const rsvpIds = useAppStore((state) => state.rsvpIds);
  const reminders = useAppStore((state) => state.reminders);
  const rsvp = useAppStore((state) => state.rsvp);
  const cancelRsvp = useAppStore((state) => state.cancelRsvp);

  return useCallback(
    async (event: LanguageEvent) => {
      if (rsvpIds.includes(event.id)) {
        cancelRsvp(event.id);
        await cancelEventReminder(reminders[event.id]);
      } else {
        const reminderId = await scheduleEventReminder(event);
        rsvp(event.id, reminderId);
      }
    },
    [rsvpIds, reminders, rsvp, cancelRsvp],
  );
};

export default useToggleRsvp;
