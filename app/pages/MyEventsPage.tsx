import React, { FC, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { Platform, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EventCard from '../components/EventCard';
import { colors } from '../constants/colors';
import { mockEvents } from '../mocks/events';
import { LanguageEvent } from '../models/Event';
import useAppStore from '../store/appStore';
import { cancelEventReminder } from '../utils/notifications';

const byDate = (a: LanguageEvent, b: LanguageEvent) =>
  new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime();

const MyEventsPage: FC = () => {
  const { t } = useTranslation();
  const rsvpIds = useAppStore((state) => state.rsvpIds);
  const reminders = useAppStore((state) => state.reminders);
  const myEvents = useAppStore((state) => state.myEvents);
  const cancelRsvp = useAppStore((state) => state.cancelRsvp);

  const sections = useMemo(() => {
    const going = [...myEvents, ...mockEvents]
      .filter((event) => rsvpIds.includes(event.id))
      .sort(byDate);
    const organizing = [...myEvents].sort(byDate);
    return [
      {
        key: 'going',
        title: t('myEvents.going'),
        data: going,
        emptyText: t('myEvents.goingEmpty'),
      },
      {
        key: 'organizing',
        title: t('myEvents.organizing'),
        data: organizing,
        emptyText: t('myEvents.organizingEmpty'),
      },
    ];
  }, [rsvpIds, myEvents, t]);

  const handleToggleRsvp = useCallback(
    async (event: LanguageEvent) => {
      cancelRsvp(event.id);
      await cancelEventReminder(reminders[event.id]);
    },
    [cancelRsvp, reminders],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionList
        sections={sections}
        keyExtractor={(event, index) => `${event.id}-${index}`}
        contentContainerStyle={styles.list}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.data.length === 0 && (
              <Text style={styles.emptyText}>{section.emptyText}</Text>
            )}
          </View>
        )}
        renderItem={({ item, section }) => (
          <View>
            <EventCard
              event={item}
              isRsvped={rsvpIds.includes(item.id)}
              onToggleRsvp={handleToggleRsvp}
            />
            {section.key === 'going' && (
              <Text style={styles.reminderNote}>
                {reminders[item.id]
                  ? t('myEvents.reminderSet')
                  : Platform.OS === 'web'
                    ? t('myEvents.reminderWeb')
                    : t('myEvents.reminderNone')}
              </Text>
            )}
          </View>
        )}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginHorizontal: 16,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
    marginHorizontal: 16,
  },
  reminderNote: {
    fontSize: 12,
    color: colors.textMuted,
    marginHorizontal: 24,
    marginTop: 6,
  },
});

export default MyEventsPage;
