import React, { FC, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../components/AppHeader';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import { bodyFont, colors } from '../constants/colors';
import useToggleRsvp from '../hooks/useToggleRsvp';
import { mockEvents } from '../mocks/events';
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
});

export default EventsPage;
