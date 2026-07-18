import React, { FC } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FORMATS, LANGUAGES, LEVEL_LABELS } from '../constants/catalogs';
import { colors } from '../constants/colors';
import { LanguageEvent } from '../models/Event';

interface EventCardProps {
  event: LanguageEvent;
  isRsvped: boolean;
  onToggleRsvp: (event: LanguageEvent) => void;
}

export const formatEventDate = (dateISO: string): string =>
  new Date(dateISO).toLocaleString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

const EventCard: FC<EventCardProps> = ({ event, isRsvped, onToggleRsvp }) => {
  const language = LANGUAGES[event.language];
  const isFull = !isRsvped && event.attendees >= event.capacity;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.flag}>{language.flag}</Text>
        <View style={styles.headerText}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.organizer}>{event.organizer}</Text>
        </View>
      </View>

      <View style={styles.badges}>
        <Text style={styles.badge}>{language.name}</Text>
        <Text style={styles.badge}>{LEVEL_LABELS[event.level]}</Text>
        <Text style={styles.badge}>{FORMATS[event.format]}</Text>
        <Text style={[styles.badge, event.isFree && styles.badgeFree]}>
          {event.isFree ? 'Бесплатно' : event.price ?? 'Платно'}
        </Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {event.description}
      </Text>

      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
        <Text style={styles.meta}>{formatEventDate(event.dateISO)}</Text>
      </View>
      <View style={styles.metaRow}>
        <Ionicons name="location-outline" size={14} color={colors.textMuted} />
        <Text style={styles.meta}>
          {event.city} · {event.venue}
        </Text>
      </View>
      <View style={styles.metaRow}>
        <Ionicons name="people-outline" size={14} color={colors.textMuted} />
        <Text style={styles.meta}>
          {event.attendees + (isRsvped ? 1 : 0)} / {event.capacity} участников
        </Text>
      </View>

      <Pressable
        onPress={() => onToggleRsvp(event)}
        disabled={isFull}
        style={[
          styles.rsvpButton,
          isRsvped && styles.rsvpButtonActive,
          isFull && styles.rsvpButtonDisabled,
        ]}
      >
        <Text style={[styles.rsvpLabel, isRsvped && styles.rsvpLabelActive]}>
          {isFull ? 'Мест нет' : isRsvped ? '✓ Вы записаны' : 'Пойду'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  organizer: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  badge: {
    fontSize: 11,
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  badgeFree: {
    color: colors.background,
    backgroundColor: colors.success,
  },
  description: {
    fontSize: 13,
    color: colors.text,
    marginTop: 10,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
    flexShrink: 1,
  },
  rsvpButton: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  rsvpButtonActive: {
    backgroundColor: colors.surface,
  },
  rsvpButtonDisabled: {
    backgroundColor: colors.border,
  },
  rsvpLabel: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 14,
  },
  rsvpLabelActive: {
    color: colors.success,
  },
});

export default EventCard;
