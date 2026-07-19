import React, { FC, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../components/AppHeader';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import { colors } from '../constants/colors';
import { mockEvents } from '../mocks/events';
import { LanguageEvent } from '../models/Event';
import useAppStore from '../store/appStore';
import {
  cancelEventReminder,
  scheduleEventReminder,
} from '../utils/notifications';

const EventsPage: FC = () => {
  const { t } = useTranslation();
  const filters = useAppStore((state) => state.filters);
  const rsvpIds = useAppStore((state) => state.rsvpIds);
  const reminders = useAppStore((state) => state.reminders);
  const myEvents = useAppStore((state) => state.myEvents);
  const rsvp = useAppStore((state) => state.rsvp);
  const cancelRsvp = useAppStore((state) => state.cancelRsvp);

  const events = useMemo(() => {
    const all = [...myEvents, ...mockEvents].sort(
      (a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime(),
    );
    return all.filter(
      (event) =>
        (filters.language === null || event.language === filters.language) &&
        (filters.level === null ||
          event.level === filters.level ||
          event.level === 'any') &&
        (filters.format === null || event.format === filters.format) &&
        (!filters.freeOnly || event.isFree),
    );
  }, [filters, myEvents]);

  const handleToggleRsvp = useCallback(
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader />
      <FilterBar />
      <FlatList
        data={events}
        keyExtractor={(event) => event.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isRsvped={rsvpIds.includes(item.id)}
            onToggleRsvp={handleToggleRsvp}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>{t('events.emptyTitle')}</Text>
            <Text style={styles.emptyText}>{t('events.emptyText')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    alignItems: 'center',
    marginTop: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default EventsPage;
