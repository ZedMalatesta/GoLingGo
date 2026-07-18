import { Platform } from 'react-native';

import { LanguageEvent } from '../models/Event';

export const REMINDER_OFFSET_MS = 2 * 60 * 60 * 1000;

const isWeb = Platform.OS === 'web';

const loadNotifications = async () => {
  if (isWeb) {
    return null;
  }
  try {
    return await import('expo-notifications');
  } catch {
    return null;
  }
};

/**
 * Schedules a local notification 2 hours before the event starts.
 * Returns the notification id, or null when unavailable (web, no
 * permission, or the event starts in less than 2 hours).
 */
export const scheduleEventReminder = async (
  event: LanguageEvent,
): Promise<string | null> => {
  const Notifications = await loadNotifications();
  if (!Notifications) {
    return null;
  }

  const triggerDate = new Date(
    new Date(event.dateISO).getTime() - REMINDER_OFFSET_MS,
  );
  if (triggerDate.getTime() <= Date.now()) {
    return null;
  }

  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: `Через 2 часа: ${event.title}`,
        body: `${event.venue} · не забудьте прийти!`,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });
  } catch {
    return null;
  }
};

export const cancelEventReminder = async (
  reminderId: string | undefined,
): Promise<void> => {
  if (!reminderId) {
    return;
  }
  const Notifications = await loadNotifications();
  if (!Notifications) {
    return;
  }
  try {
    await Notifications.cancelScheduledNotificationAsync(reminderId);
  } catch {
    // reminder may already have fired or been cleared
  }
};
