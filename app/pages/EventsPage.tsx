import React, { FC, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../components/AppHeader';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import PastEventCard from '../components/PastEventCard';
import { bodyFont, colors, handFont } from '../constants/colors';
import useToggleRsvp from '../hooks/useToggleRsvp';
import { mockEvents } from '../mocks/events';
import { mockPastAnalytics, mockPastEvents } from '../mocks/pastEvents';
import { EventFilters, LanguageEvent } from '../models/Event';
import useAppStore from '../store/appStore';

const matchesFilters = (event: LanguageEvent, filters: EventFilters) =>
  (filters.language === null || event.language === filters.language) &&
  (filters.level === null ||
    event.level === filters.level ||
    event.level === 'any') &&
  (filters.format === null || event.format === filters.format) &&
  (!filters.freeOnly || event.isFree);

const EventsPage: FC = () => {
  const { t } = useTranslation();
  const filters = useAppStore((state) => state.filters);
  const rsvpIds = useAppStore((state) => state.rsvpIds);
  const myEvents = useAppStore((state) => state.myEvents);
  const handleToggleRsvp = useToggleRsvp();

  const events = useMemo(() => {
    const all = [...myEvents, ...mockEvents].sort(
      (a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime(),
    );
    return all.filter((event) => matchesFilters(event, filters));
  }, [filters, myEvents]);

  const pastEvents = useMemo(
    () =>
      [...mockPastEvents]
        .sort(
          (a, b) =>
            new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
        )
        .filter((event) => matchesFilters(event, filters)),
    [filters],
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
        ListFooterComponent={
          pastEvents.length > 0 ? (
            <View>
              <Text style={styles.pastTitle}>🕗 {t('past.title')}</Text>
              {pastEvents.map((event) => (
                <PastEventCard
                  key={event.id}
                  event={event}
                  analytics={mockPastAnalytics[event.id]}
                />
              ))}
            </View>
          ) : null
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
    fontFamily: bodyFont.bold,
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  emptyText: {
    fontFamily: bodyFont.regular,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  pastTitle: {
    fontFamily: handFont,
    fontSize: 27,
    color: colors.primaryDark,
    marginTop: 26,
    marginHorizontal: 16,
  },
});

export default EventsPage;
